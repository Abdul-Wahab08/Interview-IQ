import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: [true, "Username must be unique"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            unique: [true, "Email must be unique"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        }
    },
    {
        timestamps: true
    }
)

const userModel = mongoose.model('userModel', userSchema)
export default userModel