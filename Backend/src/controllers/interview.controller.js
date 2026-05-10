import { generateInterviewReport, generateResumePdf } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse-fork");

/**
 * @name createInterviewReport
 * @description generate an interview report based on the provided resume and job description
 * @access Private
 */
const createInterviewReport = async (req, res) => {
    try {
        const pdfData = await pdfParse(req.file.buffer);
        const resumeContent = pdfData.text.trim();
        const { jobDescription, selfDescription } = req.body;

        if (!(resumeContent || jobDescription || selfDescription)) {
            return res.status(400).json({
                message: "Resume, job and self description are required to generate interview report"
            });
        }

        const interviewReport = await generateInterviewReport({
            jobDescription,
            resume: resumeContent,
            selfDescription
        })

        if (!interviewReport) {
            return res.status(500).json({ message: "Failed to generate interview report" });
        }

        const savedInterviewReportInDB = await interviewReportModel.create({
            jobDescription,
            selfDescription,
            resume: resumeContent,
            title: interviewReport.title,
            matchScore: interviewReport.matchScore,
            technicalQuestions: interviewReport.technicalQuestions,
            behavioralQuestions: interviewReport.behavioralQuestions,
            skillGaps: interviewReport.skillGaps,
            preparationPlan: interviewReport.preparationPlan,
            userId: req.user._id
        })

        if (!savedInterviewReportInDB) {
            return res.status(500).json({
                message: "Failed to save interview report in database"
            });
        }

        return res.status(200).json({
            interviewReport: savedInterviewReportInDB,
            message: "Interview report generated successfully"
        });
    } catch (error) {
        console.log("Error while creating user's report: ", error)
        return res.status(500).json({
            message: "Failed to create interview report"
        });
    }
}

/**
 * @name createResumePdf
 * @description generate a PDF resume based on the provided resume content and job description
 * @access Private
 */
const createResumePdf = async (req, res) => {
    try {
        const { interviewReportId } = req.params;

        if (!interviewReportId) {
            return res.status(400).json({
                message: "Interview ID is required to generate resume PDF"
            })
        }
        const interviewObjId = new mongoose.Types.ObjectId(interviewReportId);

        const { resume, jobDescription, selfDescription } = await interviewReportModel.findById({ _id: interviewObjId });

        if (!(resume || jobDescription || selfDescription)) {
            return res.status(400).json({
                message: "Resume, job description and self description are required to generate resume"
            });
        }

        const pdfBuffer = await generateResumePdf({
            jobDescription,
            resume,
            selfDescription
        });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="resume.pdf"'
        });
        return res.status(200).send(pdfBuffer);

    } catch (error) {
        console.log("Error while creating resume pdf: ", error)
        return res.status(500).json({ message: "Failed to create resume PDF" });
    }
}

/**
 * @name fetchUserInterviewReports
 * @description fetch all interview reports for a specific user
 * @access Private
 */
const fetchUserInterviewReports = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required to fetch interview reports"
            })
        }

        const interviewReports = await interviewReportModel.find({ userId }).sort({ createdAt: -1 }).select("title matchScore createdAt _id");

        if (!interviewReports || interviewReports.length === 0) {
            return res.status(404).json({
                message: "No interview reports found for this user"
            })
        }

        const totalUserReports = await interviewReportModel.countDocuments({ userId })

        if (totalUserReports === 0) {
            return res.status(404).json({
                message: "No interview reports found for this user"
            })
        }

        return res.status(200).json({
            interviewReports,
            totalUserReports,
            message: "All interview Reports of logged in user fetched successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch interview reports"
        });
    }
}

/**
 * @name fetchInterviewReportById
 * @description fetch a specific interview report by its ID
 * @access Private
 */
const fetchInterviewReportById = async (req, res) => {
    try {
        const { interviewReportId } = req.params

        if (!interviewReportId) {
            return res.status(400).json({
                message: "Interview ID is required to fetch interview report"
            })
        }

        const userId = req.user._id

        if (!userId) {
            return res.status(403).json({
                message: "Not Allowed"
            })
        }

        const interviewObjId = new mongoose.Types.ObjectId(interviewReportId);

        const interviewReport = await interviewReportModel.findById(interviewObjId);

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        return res.status(200).json({
            interviewReport,
            message: "Interview Report fetched successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch interview report"
        });
    }
}

const deleteInterviewReportById = async (req, res) => {
    try {
        const { interviewReportId } = req.params

        if (!interviewReportId) {
            return res.status(400).json({
                message: "Interview ID is required to fetch interview report"
            })
        }

        const userId = req.user._id

        if (!userId) {
            return res.status(403).json({
                message: "Not Allowed"
            })
        }

        const interviewReportObjId = new mongoose.Types.ObjectId(interviewReportId)

        const deletedInterviewReport = await interviewReportModel.findByIdAndDelete({ _id: interviewReportObjId })

        if (!deletedInterviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        return res.status(200).json({
            deletedInterviewReportId: deletedInterviewReport._id,
            message: "Interview Report deleted successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete interview report"
        });
    }
}

export {
    createInterviewReport,
    createResumePdf,
    fetchUserInterviewReports,
    fetchInterviewReportById,
    deleteInterviewReportById
}