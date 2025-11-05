import express from 'express'
import { isAuthentication } from '../../authorize/authorizeUser.js'
import { createProject, getProject, projectDelete } from '../../controllers/codepen/create-project-controllers.js'
const router = express.Router()

router.post('/create/project', isAuthentication, createProject)
router.get('/find/project', isAuthentication, getProject)
router.delete('/delete/folder/:id', projectDelete)


export default router