import express from 'express'
import authCtrl from '../controllers/auth.controller'
import countryCtrl from '../controllers/country.controller'

const router = express.Router()

router
  .route('/signup')
  .get(countryCtrl.list)
  .post(authCtrl.signup)

router.route('/signin').post(authCtrl.signin)

router.route('/signout').get(authCtrl.signout)

export default router
