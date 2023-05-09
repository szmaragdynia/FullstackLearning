const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
    console.log('usage:')
    console.log('>node <filename>.js <password>')
    console.log('>node <filename>.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const databaseName = "phonebookApp"
const url = `mongodb+srv://fullstack:${password}@cluster0.p4fqzx6.mongodb.net/${databaseName}?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema) 


if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => { 
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close() 
    })
} else {console.log("unexpected error")}

