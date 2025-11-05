import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
dotenv.config()
import userRouter from './router/user.router.js'
import codeEditorRouter from './router/code-editor/codeEditor-router.js'
import aiRouter from './router/ai/AI-router.js'
import newChatRouter from './router/ai/new-chat-router.js'
import snippetRouter from './router/compiler/snippet-save-router.js'
import codepenRouter from './router/codepen/codepen-router.js'
import projectRouter from './router/codepen/project-router.js'


const PORT = process.env.PORT || 8000
const app = express()
app.use(express.json())
app.use(cors())

try {
    mongoose.connect(process.env.MONGOOSE_URL)
    console.log("database connected");

} catch (error) {
    console.log(error);

}

//api
app.use('/api/user', userRouter)
app.use('/api/codeEditor', codeEditorRouter)
app.use('/api/ai', aiRouter)
app.use('/api/newChat', newChatRouter)
app.use('/api/snippet', snippetRouter)
app.use('/api/codepen', codepenRouter)
app.use('/api/codepenproject', projectRouter)



app.listen(PORT, () => console.log("Server is running")
)