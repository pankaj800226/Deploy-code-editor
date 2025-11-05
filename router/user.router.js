import express from 'express'
import { editProfile, login, profile, register } from '../controllers/user.controllers.js'
import { isAuthentication } from '../authorize/authorizeUser.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', isAuthentication, profile)
router.put('/updateProfile', isAuthentication, editProfile)


export default router