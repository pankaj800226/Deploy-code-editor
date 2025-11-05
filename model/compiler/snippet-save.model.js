import mongoose from 'mongoose'

const snippetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    code: {
        type: String,
        required: true
    },

    language: {
        type: Object,
        required: true
    },
}, { timestamps: true })

snippetSchema.index({ userId: 1, language: 1 });


export const Snippet = mongoose.model('Snippet', snippetSchema)