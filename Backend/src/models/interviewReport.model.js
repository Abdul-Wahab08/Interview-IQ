import mongoose from "mongoose";

const technicalQuestionsSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Technical Question is required"]
        },
        intention: {
            type: String,
            required: [true, "Intention is required"]
        },
        answer: {
            type: String,
            required: [true, "Answer is required"]
        }
    },
    {
        _id: false
    }
)

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
},
    {
        _id: false
    })

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: [true, "Severity is required"]
    }
},
    {
        _id: false
    })

const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, "Day is required"]
        },
        focus: {
            type: String,
            required: [true, "Focus is required"]
        },
        tasks: [{
            type: String,
            required: [true, "Task is required"]
        }]
    },
    {
        _id: false
    }
)

const interviewReportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        jobDescription: {
            type: String,
            requred: [true, "Job Decsiption is required"]
        },
        resume: {
            type: String
        },
        selfDescription: {
            type: String,
        },
        matchScore: {
            type: Number,
            min: [0, "Match Score cannot be less than 0"],
            max: [100, "Match Score cannot be greater than 100"]
        },
        technicalQuestions: [technicalQuestionsSchema],
        behavioralQuestions: [behavioralQuestionsSchema],
        skillGap: [skillGapSchema],
        preparationPlan: [preparationPlanSchema],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel',
            required: [true, "User ID is required"]
        }
    },
    {
        timestamps: true
    }
)

const interviewReportModel = mongoose.model('interviewReportModel', interviewReportSchema)
export default interviewReportModel