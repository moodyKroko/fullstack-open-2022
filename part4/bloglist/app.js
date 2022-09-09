const config = require('./utils/config')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to database')
mongoose
  .connect(config.DB_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB', error.message)
  })

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
