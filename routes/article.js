import express from 'express'
import {getArticle} from '../data/controller/article.controller.js'

const router = express.Router()

router.get('/article',getArticle)

export default router