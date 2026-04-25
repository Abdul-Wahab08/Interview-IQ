import { generateInterviewReport, generateResumePdf } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";
import { createRequire } from "module";
import mongoose from "mongoose";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/**
 * @name createInterviewReport
 * @description generate an interview report based on the provided resume and job description
 * @access Private
 */
const createInterviewReport = async (req, res) => {
    try {
        const resumeContent = (await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()).text.trim()
        const { jobDescription, selfDescription } = req.body;

        if (!(resumeContent || jobDescription || selfDescription)) {
            return res.status(400).json({
                message: "Resume, job description and self description are required to generate interview report"
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
            skillGap: interviewReport.skillGaps,
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
        console.error("Error creating interview report:", error);
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
        const resumeContent = (await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()).text.trim();
        const { jobDescription, selfDescription } = req.body

        if (!(resumeContent || jobDescription || selfDescription)) {
            return res.status(400).json({
                message: "Resume, job description and self description are required to generate resume"
            });
        }

        const pdfBuffer = await generateResumePdf({
            jobDescription,
            resume: resumeContent,
            selfDescription
        });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="resume.pdf"'
        });
        return res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error("Error creating resume PDF:", error);
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

        if(totalUserReports === 0) {
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
        console.error("Error fetching interview reports:", error);
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
        const interviewId = req.params

        if (!interviewId) {
            return res.status(400).json({
                message: "Interview ID is required to fetch interview report"
            })
        }

        const interviewObjId = new mongoose.Types.ObjectId(interviewId);

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
        console.error("Error fetching interview report:", error);
        return res.status(500).json({
            message: "Failed to fetch interview report"
        });
    }
}

export {
    createInterviewReport,
    createResumePdf,
    fetchUserInterviewReports,
    fetchInterviewReportById
}