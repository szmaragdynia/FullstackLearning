const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach( async () => {
  await Blog.deleteMany({})

  //This could be insertMany
  for(let blog of helper.initialBlogs){ //what if const
    let newBlog = new Blog(blog)  //what if const?
    await newBlog.save()
  }
})


describe('get', () => {
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
})

describe.only('delete', () => {
  test('delete /api/blogs/:id, when exists and id is valid', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()
    blogToDelete = blogsBeforeDeletion[0]
        
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAfterDeletion = await helper.blogsInDb()
    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)

    expect(blogsAfterDeletion).not.toContain(blogToDelete)

    //check for invalid id
  })

  test('delete /api/blogs/:id, when invalid id is given', async () => {
    const invalidId = 500 //magic number
        
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAfterDeletion = await helper.blogsInDb()
    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)

    expect(blogsAfterDeletion).not.toContain(blogToDelete)

    //check for invalid id
  })

})


//================================================================================================
describe('POST /api/blogs', () => {
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
  
    const blogsAtEnd = await helper.blogsInDb()
    //console.log(blogsAtEnd.length)
    //console.log(helper.initialBlogs.length)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    newBlog.id = returnedBlog.body.id
    expect(blogsAtEnd).toContainEqual(newBlog)
  
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
})




afterAll(async () => {
  await mongoose.connection.close()
})