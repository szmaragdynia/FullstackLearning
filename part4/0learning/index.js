//The index.js file is used for starting the application.
//The index.js file only imports the actual application from the app.js file and then starts the application.
const app = require('./app') //the actual Express application
const config = require('./utils/config')
const logger = require('./utils/l ogger')


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
