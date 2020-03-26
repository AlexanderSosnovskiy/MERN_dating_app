import crypto from 'crypto'
import { DataTypes } from 'sequelize'

import sequelize from '../db/dbConnection'
import CountryModel from './country.model'

const encryptPassword = (password, salt) => {
  if (!password) return ''

  try {
    return crypto
      .createHmac('sha1', salt)
      .update(password)
      .digest('hex')
  } catch (err) {
    return ''
  }
}

const makeSalt = () => {
  return Math.round(new Date().valueOf() * Math.random()) + ''
}

const UserModel = sequelize.define(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    email: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(50)
    },
    login: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(50)
    },
    name: {
      allowNull: false,
      type: DataTypes.CHAR(50)
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function(password) {
        this.salt = makeSalt()
        this.hashedPassword = encryptPassword(password, this.salt)
      }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.CHAR(250)
    },
    salt: {
      allowNull: false,
      type: DataTypes.CHAR(50)
    },
    countryId: {
      allowNull: false,
      type: DataTypes.SMALLINT(3),
      references: {
        model: CountryModel,
        key: 'id'
      }
    },
    birthDate: {
      type: DataTypes.CHAR(10)
    },
    timestamp: {
      type: DataTypes.INTEGER(20)
    }
  },
  {
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['email', 'login']
      }
    ]
  }
)

UserModel.prototype.matchEmail = function(plainText) {
  return plainText.trim() === this.email
}

UserModel.prototype.matchLogin = function(plainText) {
  return plainText.trim() === this.login
}

UserModel.prototype.matchPassword = function(plainText) {
  return encryptPassword(plainText, this.salt) === this.hashedPassword
}

export default UserModel
