//Our custom middleware has been moved here
//beware, this is CUSTOM middleware, not ALL middleware ever, here.
const logger = require('./logger')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next() 
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  logger.error("error message:", error.message)

  if (error.name === 'CastError') { //this error is returned if malformed id is used
    return response.status(400).send({error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error) //In all other error situations (note there is return above), the middleware passes the error forward to the default Express error handler.
}


module.exports = { requestLogger, unknownEndpoint, errorHandler }