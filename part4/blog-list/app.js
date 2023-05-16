const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')

logger.info(`Connecting to mongoDB at URL: ${config.mongoUrl}`)
mongoose.connect(config.mongoUrl)
  .then(() => logger.info(`connected to mongoDB at url: ${config.mongoUrl}`))
  .catch(error => logger.error(`Error connecting to mongoDB: ${error.message}, ${error}`))


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)


module.exports = app

