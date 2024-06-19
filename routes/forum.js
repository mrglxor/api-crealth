import express from 'express'
import {createPost,getPost} from '../data/controller/forum.controller.js'

const router = express.Router()

router.post('/post',createPost)
router.get('/post',getPost)

export default router