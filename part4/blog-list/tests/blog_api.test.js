const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach( async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs){ //what if const
    let newBlog = new Blog(blog)  //what if const?
    await newBlog.save()
  }
})



test('GET /api/blogs - if returned  AND in correct format', async () => {
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})


test('GET /api/blogs - if correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('GET /api/blogs - if unique identifier is named \'id\' ', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach( blog => {
    expect(blog.id).toBeDefined()
    //console.log("I am in for!")
  })
})




afterAll(async () => {
  await mongoose.connection.close()
})