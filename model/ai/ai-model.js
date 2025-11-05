import mongoose from 'mongoose'

const aiScheam = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AINewChat',
        required: true
    },

    sender: {
        type: String,
        enum: ['user', 'ai'],
        required: true
    },

    text: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const ChatMessage = mongoose.model('AIChatMessage', aiScheam)