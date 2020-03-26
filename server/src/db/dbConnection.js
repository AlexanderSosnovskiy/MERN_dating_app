import { Sequelize } from 'sequelize'

import config from '../config/config'

const { database, username, password, host, port } = config.db

const sequelize = new Sequelize(database, username, password, {
  dialect: 'mariadb',
  host: host,
  port: port,
  define: {
    charset: 'utf8',
    timestamps: false,
    dialectOptions: {
      collate: 'utf8_general_ci',
      useUTC: false,
      timezone: 'Etc/GMT+2'
    },
    freezeTableName: false
  }
})

export default sequelize
