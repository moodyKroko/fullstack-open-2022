require('dotenv').config()

const PORT = process.env.PORT

const DB_URL = process.env.MONGODB_URI

module.exports = {
  PORT,
  DB_URL,
}
