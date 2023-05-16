//This file (note.js file under the models directory) only defines the Mongoose schema for notes.
//The responsibility of establishing the connection to the database has been given to the app.js module.
const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Notes', noteSchema)