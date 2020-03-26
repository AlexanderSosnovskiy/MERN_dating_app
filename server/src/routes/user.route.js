import express from 'express'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/users/self').get(userCtrl.list)

export default router
