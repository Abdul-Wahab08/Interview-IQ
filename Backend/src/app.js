import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        ""
    ],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(cookieParser())

import { dbConnect } from "./db/dbConnect.js"
import mongoose from "mongoose"

const port = process.env.PORT

app.use(async (req, res, next) => {
    await dbConnect()
        .then(() => {
            console.log(`⚙️ Server running on port ${port}`)
            next()
        })
        .catch((error) => {
            console.log("MongoDB Connection Failed ", error)
        })
})

import authRoute from "./routes/auth.route.js"
import interviewRouter from "./routes/interview.route.js"

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/interview", interviewRouter)
export default app
