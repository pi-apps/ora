import express from 'express';
import {
    createPostNotifications,
    getPostNotifications,
    readPostNotifications,
    readAllNoti
} from '../controllers/notificationsController.js'
import {
    verifyToken,
} from '../middlewares/verifyToken.js';
const router = express.Router()
router.post('/', verifyToken,createPostNotifications)
router.get('/', verifyToken,getPostNotifications)
router.put('/read', verifyToken,readPostNotifications )
router.get('/readall', verifyToken,readAllNoti)

export default router