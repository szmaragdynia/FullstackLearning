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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = {
    title: request.body.title,
    author:request.body.author,
    url:request.body.url,
    likes:request.body.likes,
  }

  try {
    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true, runValidators: true, context: 'query'})
    response.json(returnedBlog)
  } catch(exception) {
    next(exception)
  }

})

module.exports = blogsRouter