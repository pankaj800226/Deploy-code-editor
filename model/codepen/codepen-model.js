import mongoose from 'mongoose'

const codepenSchema = new mongoose.Schema({
    html: {
        type: String,
        required: true
    },

    css: {
        type: String,
        required: true
    },

    js: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    codepenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'codepenProject',
        required: true
    }

}, { timestamps: true })

export const Codepen = mongoose.model('Codepen', codepenSchema)