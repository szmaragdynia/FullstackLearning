//---------------------------------object methods and 'this'
console.log('-----------------------object methods and \'this\'')


//We can assign methods to an object by defining properties that are functions.
const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function(){
        console.log('hello, my name is ' + this.name)
    },
}

arto.greet()


//Methods can be assigned to objects even after the creation of the object:
console.log('---')
arto.growOlder = function (){
    this.age += 1
}
console.log(arto.age)
arto.growOlder()
console.log(arto.age)

console.log(arto)


superStress = function (){
    this.age += 10
}
arto.growOlder2 = superStress
console.log(arto.age)
arto.growOlder2()
console.log(arto.age)
//arto.superStress()
//console.log(arto.age)

console.log(arto)


function turboStress (){
    this.age += 20
}
arto.growOlder3 = turboStress
console.log(arto.age)
arto.growOlder3()
console.log(arto.age)

console.log(arto)


//---------------------------------------------------------------
console.log('-----------------------------------')
const arto2 = {
    name: 'Arto2 Hellas2',
    age: 352,
    education: 'PhD2',
    greet: function() {
        console.log('hello, my name is2 ' + this.name)
    },
    doAddition: function(a,b) {
        console.log(a + b)
    },
}

arto2.doAddition(1,4)

const referenceToAddition = arto2.doAddition
referenceToAddition(10,15) 
//works: method is called by storing a method reference in a variable and calling the method through the variable: referenceToAddition(10, 15).

//If we try to do the same with the method greet we run into an issue:
arto2.greet() //works
const referenceToGreet = arto2.greet
referenceToGreet()

/*
When calling the method through a reference, the method loses knowledge of what the original this was. 
Contrary to other languages, in JavaScript the value of this is defined based on how the method is called. 
When calling the method through a reference the value of this becomes the so-called global object and 
the end result is often not what the software developer had originally intended.

However, in this course, we avoid these issues by using "this-less" JavaScript.
*/


{/* 
arto.greet()

const referenceToGreet = arto.greet
referenceToGreet()

const someObject = {
    name: 'ashuashuashua'
}

someObject = arto.greet
someObject()

I thought that it would work by 'swapping' the object, so that the 'this.name' has something to reference from [instead of being undefined]. 
Thank heavens I checked that because that was just some mental dead-end I would be stuck in.
*/}



//One situation leading to the "disappearance" of this arises when we set a timeout to call the greet function on the arto object, using the setTimeout function.
console.log('00000')
setTimeout(arto2.greet, 1000)
//When setTimeout is calling the method, it is the JavaScript engine that actually calls the method and, at that point, this refers to the global object.
//There are several mechanisms by which the original this can be preserved. 
//One of these is using a method called bind:
setTimeout(arto2.greet.bind(arto2), 1000)
setTimeout(arto2.greet.bind(arto), 1000)
setTimeout(arto.greet.bind(arto2), 1000)

//Calling arto.greet.bind(arto) creates a new function where this is bound to point to Arto, independent of where and how the method is being called.

//Using arrow functions it is possible to solve some of the problems related to this. 
//They should not, however, be used as methods for objects because then 'this' does not work at all. 