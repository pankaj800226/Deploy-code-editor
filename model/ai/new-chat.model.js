import mongoose from 'mongoose'

const newChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    folderName: {
        type: String,
        required: true
    },

}, { timestamps: true })



export const NewChat = mongoose.model('AINewChat', newChatSchema)