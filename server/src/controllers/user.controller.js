import User from '../models/user.model'
import errorHandler from './../helpers/dbErrorHandler'

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }

    console.log(res.json(users))
  }).select('name email')
}

export default list
