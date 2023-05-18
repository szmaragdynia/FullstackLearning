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

//================================================================================================
test('POST /api/blogs - if succesfully creates new blog post', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
  
  const returnedBlog = await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  //console.log(notesAtEnd.length)
  //console.log(helper.initialBlogs.length)
  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  newBlog.id = returnedBlog.body.id
  expect(notesAtEnd).toContainEqual(newBlog)

})


test('POST /api/blogs - if \'likes\' property is missing, it should be 0', async () => {
  const newBlogWithoutLikesProp = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  }
  
  const returnedBlog = await api.post('/api/blogs').send(newBlogWithoutLikesProp)
  expect(returnedBlog.body.likes).toEqual(0)

})

test('POST /api/blogs - if \'title\' property is missing, backend responds with 400 Bad Request ', async () => {
  const newBlogWithoutTitleProp = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
  
  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitleProp)
    .expect(400)
})

test('POST /api/blogs - if \'url\' property is missing, backend responds with 400 Bad Request ', async () => {
  const newBlogWithoutUrlProp = {
    title: "Type wars",
    author: "Robert C. Martin",
    likes: 2
  }
  
  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrlProp)
    .expect(400)
})



afterAll(async () => {
  await mongoose.connection.close()
})