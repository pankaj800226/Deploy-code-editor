import mongoose from 'mongoose'

const codepenProject = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    projectFolder: {
        type: String,
        required: true
    },

}, { timestamps: true })



export const CodepenProject = mongoose.model('codepenProject', codepenProject)