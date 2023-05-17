//The handling of environment variables is extracted into a separate utils/config.js file.
require('dotenv').config() //taking .env into use


const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { PORT, MONGODB_URI }
