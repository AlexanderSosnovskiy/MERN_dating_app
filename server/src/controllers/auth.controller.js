import UserModel from '../models/user.model'
import CountryModel from '../models/country.model'
import errorHandler from '../helpers/dbErrorHandler'

const signup = (req, res) => {
  let data = {
    email: req.body.email,
    login: req.body.login,
    name: req.body.name,
    password: req.body.password,
    birthDate: req.body.birthDate,
    timestamp: Math.round(Date.now() / 1000)
  }

  CountryModel.findOne({
    where: { name: req.body.country },
    attributes: ['id']
  })
    .then(country => {
      data.countryId = country.dataValues.id

      UserModel.create(data)
        .then(user => {
          if (user) {
            return res.status(200).json({
              message: 'User signed up successfully!',
              json: user
            })
          }
        })
        .catch(err => {
          return res.status(403).json({
            error: errorHandler.getErrorMessage(err)
          })
        })
    })
    .catch(err => {
      console.log(err)
    })
}

const signin = (req, res) => {
  let id = req.body.id
  let password = req.body.password
  let data = {}

  if (id.includes('@')) {
    data = {
      email: id
    }
  } else {
    data = {
      login: id
    }
  }

  UserModel.findOne({
    where: data
  })
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(401).json({
          error: 'User not found'
        })
      }

      if (!user.matchPassword(password)) {
        return res.status(401).send({
          error: 'Password does not match'
        })
      }

      if (data.email) {
        if (!user.matchEmail(data.email)) {
          return res.status(401).send({
            error: 'Email does not match'
          })
        }
      } else if (data.login) {
        if (!user.matchLogin(data.login)) {
          return res.status(401).send({
            error: 'Login does not match'
          })
        }
      }

      return res.status(200).json({
        message: 'User found',
        json: { email: user.dataValues.email, name: user.dataValues.name }
      })
    })
    .catch(err => {
      console.log(err)
    })
}

const signout = (req, res) => {
  return res.status('200').json({
    message: 'User signed out'
  })
}

export default {
  signup,
  signin,
  signout
}
