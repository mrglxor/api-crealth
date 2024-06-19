import {errorHandler} from "../utils/error.js"
import dotenv from 'dotenv'

dotenv.config()

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(errorHandler(400, 'Email and password are required'))
    }
    next()
};

export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return next(errorHandler(400, 'Name, email, and password are required'))
    }
    next()
}