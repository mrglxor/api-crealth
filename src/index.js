import express from 'express'
import authRoutes from '../routes/authorization.js'
import articleRoutes from '../routes/article.js'
import forumRoutes from '../routes/forum.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieparser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

mongoose.connect(process.env.URL_MONGO).then(()=>{
    console.log('\n> Connected to MongoDB server')
}).catch((e)=>{
    console.log(e)
})

const web = express()

web.use(cors());
web.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
web.use(express.json())
web.use(cookieparser())
web.listen(3000,() => {
    console.log(`\n> Server mobile Crealth\n> Server running on port http://localhost:3000`)
})
web.use('/api',authRoutes)
web.use('/api',articleRoutes)
web.use('/api',forumRoutes)

web.use((req,res,next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
web.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error!'
    return res.status(status).json({
        status,
        success: false,
        message
    })
})