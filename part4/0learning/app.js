//The app.js file creates the actual (express?) application

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()
const cors = require('cors')

const notesRouter = require('./controllers/notes')
const mongoose = require('mongoose')


//The responsibility of establishing the connection to the database has been given to the app.js module
mongoose.set('strictQuery',false)

logger.info("connecting to url:", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info(`connected to MongoDB`)
    })
    .catch(error => {
        logger.info('error connecting to MongoDB:',error.message)
    })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)``

//the app.js takes the router into use as shown below
//The router we defined in controllers directory is used if the URL of the request starts with /api/notes. 
app.use('/api/notes', notesRouter)  //??????????????????????????????is this working as "if"?

app.use(middleware.unknownEndpoint)
//error-handling middleware (PROBABLY STILL) has to be the last loaded middleware!
  //???????????????????????????/probably? because otherwise the "next(error)" will use some other middleware??
    //????????????????????????????BUT WHY ACTUALLY, SINCE NEXT(ERROR) SPECIFICALLY AIMS FOR ERROR-HANDLER (SEE COMMENT IN CONTROLLERS/NOTES.JS)
app.use(middleware.errorHandler)
//be wary that in 'middleware' we have custom middlewares, because e.g. notesRouter is middleware as well, and we take it into use here too.

module.exports = app //????????????????????????????How does he konw to export the file, not the app=express()?







