const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next() 
}

const errorHandler = (error, req, res, next) => {
  //console.log('error message:', error)
  logger.error('error message:', error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return res.status(400).json({ error: error.message })
  }
  next(error) //if error is not CastError
}

module.exports = { requestLogger, errorHandler }