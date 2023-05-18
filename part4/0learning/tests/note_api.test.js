const mongoose = require ('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
//supertest takes care that the application being tested is started at the port that it uses internally.
//it has to, because we launch the app at specified port in index.js, but tests only use express app defined in the app.js
const Note = require('../models/note')
//const logger = require('../utils/logger')
const helper = require('./test_helper')



//Let's initialize the database before every test with the beforeEach function:
// beforeEach is run before each test in a describe block, while beforeAll is run once before all the tests, or if put in a in a describe block, then before these tests (I could have 2 in 2 desc blocks)
//so if I have few describe blocks in a file, it will run that many times as many times I have describe block. (at least according to bing)

/*beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})  */
/* beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared') //using console even tough we tried to implement logger - I would just implement tester-logger, but meh, let's go with the course

  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')
  /*
  "cleared
  done
  entered test
  saved
  saved""
  The problem is that every iteration of the forEach loop generates an asynchronous operation, and beforeEach won't wait for them to finish executing. 
  In other words, the await commands defined inside of the forEach loop are not in the beforeEach function, but in separate functions that beforeEach will not wait for.
})
*/
/*beforeEach(async () => {
  await Note.deleteMany({})
  
  const noteObjects = helper.initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
  //The Promise.all method can be used for transforming an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as a parameter is resolved. 
  //but with that approach we have a problem, because this "const promiseArray = noteObjects.map(note => note.save())" makes promises run in paralell (on the fullstackopen the wording is wrong, as it states that )
    //the pararellism has something to do with Promise.all, while it does not.
  //this may cause issues if I needed first promise to resolve before the second one.
})*/

beforeEach(async () => {
  await Note.deleteMany({})
  //console.log('cleared') //using console even tough we tried to implement logger - I would just implement tester-logger, but meh, let's go with the course

  //we basically need to change our 2nd approach from forEach into for loop. More info below.
  for(let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
    //console.log('saved')
  }
  //console.log('done')
  /*The behavior of await is specific to the for loop and the for...of loop. Other loops, such as forEach, map, filter, etc., 
  do not work well with await, because they are not designed to handle asynchronous operations. They will not wait for the promises to finish,
  and they will return an array of promises instead of an array of values. If you want to use await with other loops,
  you need to use Promise.all or another method to wait for the promises to finish. 
  (but even when using Promise.all I would still then have the promises run in parallel)
  */
})


test('get /api/notes - notes are returned as json', async () => {
  //console.log('entered test')
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/) //methods provided by supertest for verifying the status code and headers
  //if we were to use ".expect('Content-Type', 'application/json')", the value would have to be EXACTLY like that, while that regex above allows the header CONTAIN the value
  //The actual value of the header is application/json; charset=utf-8, 
})


test('get /api/notes - all notes are returned', async () => {
  const response = await api.get('/api/notes')
  // execution gets below only after the HTTP request is complete
  expect(response.body).toHaveLength(helper.initialNotes.length)
})


test('get /api/notes - a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(n => n.content) //return array
  expect(contents).toContain('Browser can execute only JavaScript')
  //Use .toContain when you want to check that an item is in an array
})


//==============================================================================================================================
test('post /api/notes - a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  //const response = await api.get('/api/notes')
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1) //testing if the number of notes returned increases
  
  const contents = notesAtEnd.map(n => n.content)
  expect(contents).toContain('async/await simplifies making async calls')
})


test('post /api/notes - note without content is not added', async () => {
  const newNote = {
    important: true
  }
  
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)
  
  //const response = await api.get('/api/notes')
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  
})


//==============================================================================================================================
test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    expect(resultNote.body).toEqual(noteToView)
})


test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

  const contents = notesAtEnd.map(r => r.content)
  expect(contents).not.toContain(noteToDelete.content)
})



//the below is jets's function. "Runs a function after all the tests in this file have completed. If the function returns a promise or is a generator, Jest waits for that promise to resolve before continuing."
afterAll(async () => {
  await mongoose.connection.close()
})
//!!
//When running a single test, the mongoose connection might stay open if no tests using the connection are run. 
//The problem might be because supertest primes the connection (via app.js ofc [I guess]), but Jest does not run the afterAll portion of the code.