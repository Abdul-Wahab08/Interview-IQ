import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const dbConnect = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Reusing existing MongoDB connection");
        return;
    }

    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log("MongoDb Connect SuccessFully!! DB Host: ", dbConnection.connection.host)
    } catch (error) {
        console.log("Error occurs while connecting database ", error)
        throw error
    }
}