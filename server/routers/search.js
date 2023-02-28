import express from 'express';
import { link, search } from '../controllers/searchController.js'
const router = express.Router()
router.get('/',search)
router.get('/link',link)
export default router