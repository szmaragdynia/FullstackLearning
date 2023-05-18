const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  }
]

const nonExistingId = async () => {
  const note = new Note({content: 'willRemoveThisSoon'})
  await note.save()
  await note.deleteOne() //The note.deleteOne() method is a document method, meaning that it is called on an instance of a document. When you call it without any arguments, it uses the document’s _id as the query

  return note._id.toString() //id is given by mongoose, not returned from mongoDB
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON()) 
  //toJSON by default:
    //removes any empty objects from the output.
    //applies any getters defined on the schema.
    //removes any properties that start with an underscore (_), except for _id.
    //converts any _id properties that are ObjectIds into strings.
  //but we have changed toJSON.
  //but the default behaviors are not discarded. The transform method is applied after the default behaviors, so you can modify the output further
}

module.exports = { initialNotes, nonExistingId, notesInDb }