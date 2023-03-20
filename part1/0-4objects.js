//---------------------------------objects
console.log('-----------------------objects')


//defining object using object literals - listing its properties within braces

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
}

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}

const objec3 = {
    name: {
        first: 'Dan',
        last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}

//The values of the properties can be of any type, like integers, strings, arrays, objects...


//----------
console.log(object1.name)

const fieldName = 'age'
console.log(object1[fieldName])

console.log(object1['education'])

//The properties of an object are referenced by using the "dot" notation, or by using brackets


//----------
//You can also add properties to an object on the fly by either using dot notation or brackets:
//OMG THIS IS SO BUG-PRONE XD
object1.address = 'Helsinki'

object1['secret number'] = 12341 //looks buggy bcuz property is a string, but course mentions nothing, so it might be OK actually.

console.log(object1)

//----------
//Naturally, objects in JavaScript can also have methods
//Objects can also be defined using so-called constructor functions
