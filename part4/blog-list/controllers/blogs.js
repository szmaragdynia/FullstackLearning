const Blog = require('../models/blog')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  }catch(exception) {
    next(exception)
  }
  
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter