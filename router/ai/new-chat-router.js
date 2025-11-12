import express from 'express'
import { isAuthentication } from '../../authorize/authorizeUser.js'
import { createNewChat, deleteChat, findNewChat } from '../../controllers/ai/new-chat.controllers.js'
const router = express.Router()

router.post('/create/folder', isAuthentication, createNewChat)
router.get('/getNewChat', isAuthentication, findNewChat)
router.delete('/delete/chat/:id',deleteChat)

export default router