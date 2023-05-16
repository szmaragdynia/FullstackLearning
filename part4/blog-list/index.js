const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next() 
}
app.use(requestLogger)




const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number
})


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
console.log(`Connecting to mongoDB at URL: ${mongoUrl}`)
mongoose.connect(mongoUrl)
  .then(() => console.log(`connected to mongoDB at url: ${mongoUrl}`))
  .catch(error => console.log(`Error connecting to mongoDB: ${error.message}, ${error}`))






app.get('/api/blogs', (request, response, next) => {
  Blog.find({})
    .then(blogs => response.json(blogs))
    .catch(error => next(error))
})

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(result => response.status(201).json(result))
    .catch(error => next(error))
})


//====================================================================================================
const errorHandler = (error, req, res, next) => {
  //console.log('error message:', error)
  console.log('error message:', error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error) //if error is not CastError
}

app.use(errorHandler)

//====================================================================================================
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})