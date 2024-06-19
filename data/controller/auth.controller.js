import User from "../model/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const login = async(req,res,next) => {
    const {email,password} = req.body

    try {
        const valid = await User.findOne({email})
        if(!valid) return next(errorHandler(404,'User Not Found'))
        const validPassword = bcryptjs.compareSync(password,valid.password)
        if(!validPassword) return next(errorHandler(401,'Wrong credentials'))
        const token = jwt.sign({id: valid._id},process.env.JWT_SECRET)
        const {password: hashedPassword, ...rest} = valid._doc
        const expiryDate = new Date(Date.now() + 3600000) // 1 hour
        res.cookie('access_token',token,{httpOnly: true, expires: expiryDate}).status(200).json({data: {id: rest._id,name: rest.name,email: rest.email,emailVerifyAt: rest.createdAt,rememberToken: token,tokenExpiry: expiryDate,createdAt: rest.createdAt,updatedAt: rest.updatedAt},message: 'Login Successfuly'})
    
    }catch(e){
        next(e)
    }
}
export const register = async(req,res,next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(409, 'Email already exists'));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (e) {
        next(e);
    }
}