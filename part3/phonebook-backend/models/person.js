const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => {
    console.log('Successfully connted to MongoDB - phonebook')
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB-phonebook: ${error.message}`)
  })


const validator = (val) => /^\d{2,3}-\d+$/.test(val)
const customValidator = [validator, 'The number must be in format: 00-000..(infinite numbers) or 000-000..(infinite numbers)']

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8, //assuming its the entire string length. This does not make sense, but the information to use custom validator for the second part of the task (2/3 numbers, pause, numbers), causes me to think this is what is required (otherwise I would have to use custom validator here too probably)
    validate: customValidator
  }
})

personSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)