import cookieParser from "cookie-parser"
import express from "express"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(cookieParser())

import authRoute from "./routes/auth.route.js"
import interviewRouter from "./routes/interview.route.js"

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/interview", interviewRouter)
export {app}
