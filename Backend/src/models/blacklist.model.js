import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const blacklistModel = mongoose.model("blacklistModel", blacklistSchema);
export default blacklistModel;