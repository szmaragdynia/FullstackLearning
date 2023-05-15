/*We could use the database directly from our JavaScript code with the official MongoDB Node.js driver library, but it is quite cumbersome to use.
 We will instead use the Mongoose library that offers a higher-level API.

Mongoose could be described as an object document mapper (ODM), and saving JavaScript objects as Mongo documents is straightforward with this library.

We need to npm instal mongoose
*/

const mongoose = require('mongoose')



if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}



const password = process.argv[2]
//const url = `mongodb+srv://fullstack:${password}@cluster0.p4fqzx6.mongodb.net/?retryWrites=true&w=majority`
    //changed the name of database (it was test, but empty in url, now is noteApp)
const url = `mongodb+srv://fullstack:${password}@cluster0.p4fqzx6.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


//The idea behind Mongoose is that the data stored in the database is given a schema at the level of the application that defines the shape of the documents stored in any given collection.
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})
const Note = mongoose.model('Notes', noteSchema) //const Note - is used as "type"(=model) (new Note). The second one is name of >collection< in database.
//Since the objects are created with the model's constructor function, they have all the properties of the model, which include methods for saving the object to the database.
const note = new Note({
    content: 'stuff3',
    important: false,
})

/*Document databases like Mongo are schemaless, meaning that the database itself does not care about the structure of the data that is stored in the database. 
It is possible to store documents with completely different fields in the same collection 

I understand it like that I could have
    const Note2 = mongoose.model('Notes', noteSchema2)
    that would store different schema note in Notes collection

    BUT if I wanted to find stored object like we do below, I still need to search for them via model, like Note or Note2
        why? I dont know yet
*/


//(...) save method, which can be provided with an event handler with the then method:
/*note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close() //If the connection is not closed, the program will never finish its execution.
}) */
/*The result of the save operation is in the result parameter of the event handler. The result is not that interesting when we're storing one object in the database.
You can print the object to the console if you want to take a closer look at it while implementing your application or during debugging. */


//The parameter of the method is an object expressing search conditions. Since the parameter is an empty object{}, we get all of the notes stored in the notes collection.
const searchQuery = {}
//const searchQuery = { important: true }
Note.find(searchQuery).then(result => { //!!!!!!!!!!!!!! "Note" not "note". find is working on model
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})


