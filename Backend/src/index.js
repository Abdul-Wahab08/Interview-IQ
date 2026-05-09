import express from "express"
import { dbConnect } from "./db/dbConnect.js"
import app from "./app.js"
// import dotenv from "dotenv"

// dotenv.config({path: './.env'})

const port = process.env.PORT

dbConnect()
    .then(() => {
        console.log(`⚙️  Server running on port ${port}`)
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed ", error)
    })



export default app 