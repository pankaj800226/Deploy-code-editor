import mongoose from "mongoose";

const saveCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },

    language: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export const SaveCode = mongoose.model('SaveCode', saveCodeSchema)