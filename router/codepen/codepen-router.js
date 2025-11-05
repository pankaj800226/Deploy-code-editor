import express from 'express'
import { isAuthentication } from '../../authorize/authorizeUser.js'
import { createCode, getCodePenCode } from '../../controllers/codepen/codepen-controllers.js'
const router = express.Router()

router.post('/uploadCode/:codepenId', isAuthentication, createCode)
router.get('/get/codepen/:codepenId', isAuthentication, getCodePenCode)


export default router