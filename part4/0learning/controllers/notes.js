//The event handlers of routes are commonly referred to as controllers
const notesRouter = require('express').Router()
const Note = require('../models/note')


//we are defining routes relatively, because we take (more or less good wording here) Route into use in app.js, where we use it only if /api/notes is called. Thus all here is relative to /api/notes
//"The router we defined earlier is used if the URL of the request starts with /api/notes. For this reason, the notesRouter object must only define the relative parts of the routes, i.e. the empty path / or just the parameter /:id."
//All of the routes related to notes are now in the notes.js module under the controllers directory.
//All routes are now defined for the router object, similar to what did before with the object representing the entire application.

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})


/*notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {  //case for properly formed id's, but with no note with such id
      response.status(404).end()
    }
  }).catch(error => next(error)) //If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.)
}) */

notesRouter.get('/:id', async (request, response, next) => {
  try {  
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {  //case for properly formed id's, but with no note with such id
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

/*notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
}) */

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

/*notesRouter.post('/', (request, response, next) => {
  const note = new Note ({
    content: request.body.content,
    important: request.body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))
}) */

notesRouter.post('/', async (request, response, next) => {
  const note = new Note ({
    content: request.body.content,
    important: request.body.important || false,
  })

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})


notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => response.json(updatedNote))
    .catch(error => next(error))
})


module.exports = notesRouter