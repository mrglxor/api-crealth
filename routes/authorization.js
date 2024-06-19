import express from 'express'
import {login,register} from '../data/controller/auth.controller.js'
import { validateLogin, validateRegister } from '../data/middleware/auth.middleware.js'

const router = express.Router()

router.post('/login',validateLogin,login)
router.post('/register',validateRegister,register)

export default router