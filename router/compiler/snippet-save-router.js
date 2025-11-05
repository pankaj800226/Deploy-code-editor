import express from 'express'
import { createSnippet, getUserSnippets } from '../../controllers/compiler/snippet-save-controllers.js'
import { isAuthentication } from '../../authorize/authorizeUser.js'

const router = express.Router()

router.post('/upload/snippet', isAuthentication, createSnippet)
router.get('/get/snippet', isAuthentication, getUserSnippets)


export default router