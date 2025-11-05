import express from 'express'
import { AIWork, getChatMessage } from '../../controllers/ai/ai-controllers.js'
import { isAuthentication } from '../../authorize/authorizeUser.js'
const router = express.Router()
  
router.post('/ai/response/:chatId', isAuthentication, AIWork)
router.get('/chatMessage/:chatId', isAuthentication, getChatMessage)

export default router