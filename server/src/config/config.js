const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    database: process.env.DB_NAME || 'testtask',
    username: process.env.DB_USER_NAME || 'root',
    password: process.env.DB_USER_PASSWORD || ''
  },
  server: {
    protocol: process.env.SERVER_PROTOCOL || 'http',
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || '8080',
    getURL: function() {
      return `${this.protocol}://${this.host}:${this.port}`
    }
  }
}

export default config
