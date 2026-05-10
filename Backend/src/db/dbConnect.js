import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let isConnected = false
export const dbConnect = async () => {
    if (isConnected) {
        console.log("Reusing existing MongoDB connection");
        return;
    }
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        isConnected = dbConnection.connections[0].readyState === 1
        console.log("MongoDb Connect SuccessFully!! DB Host: ", dbConnection.connection.host)
    } catch (error) {
        console.log("Error occurs while connecting database ", error)
        process.exit(1)
    }
}