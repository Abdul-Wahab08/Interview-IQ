import { Router } from "express";
import { createInterviewReport, createResumePdf, fetchInterviewReportById, fetchUserInterviewReports } from "../controllers/interview.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import fileUpload from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/generate-interview-report").post(verifyToken, fileUpload.single("resume"), createInterviewReport)
router.route("/generate-resume-pdf").post(verifyToken, fileUpload.single("resume"), createResumePdf)
router.route("/fetch-user-interview-reports").get(verifyToken, fetchUserInterviewReports)
router.route("/fetch-interview-report/:id").get(verifyToken, fetchInterviewReportById)

export default router