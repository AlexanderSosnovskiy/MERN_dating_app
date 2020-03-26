import { DataTypes } from 'sequelize'

import sequelize from '../db/dbConnection'

const CountryModel = sequelize.define(
  'Country',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.SMALLINT(3)
    },
    name: {
      allowNull: false,
      type: DataTypes.CHAR(50)
    },
    code: {
      allowNull: true,
      type: DataTypes.CHAR(3)
    }
  },
  {
    tableName: 'countries'
  }
)

export default CountryModel
