//---------------------------------variables
console.log('-----------------------variables')
const x = 1
let y = 5

console.log(x, y)

y += 10
console.log(x,y)

y = 'sometext'
console.log(x,y,)

//x = 4 //error! (ok)
//if const was an object or array (which is an object) its contents can be changed.


//---------------------------------arrays 
console.log('-----------------------arrays')

const t = [1, -1, 3]

t.push(5)
//contents of the array can be modified even though it is defined as a const - because the array is an object and the variable 
//always points to the same object. However, the content of the array changes as new items are added to it.

console.log(t.length)
console.log(t[1])

t.forEach(value => {
    console.log(value)
})
//forEach receives a function defined using the arrow syntax as a parameter.
//forEach calls the function for each of the items in the array, always passing the individual item as an argument. 


//-----------
console.log('2---------')
//When using React, techniques from functional programming are often used. 
//One characteristic of the functional programming paradigm is the use of immutable data structures
//In React code, it is preferable to use the method concat, which creates a new array with the added item.

const t2 = [1, -1, 3]
const t2concat = t2.concat(5) //creates new array

console.log(t2)
console.log(t2concat)


//-----------
console.log('3---------')
const t3 = [1, 2, 3]
console.log(t3)

const m1 = t3.map(value => value *2)
//map creates a new array, for which the function given as a parameter is used to create the items
//Kind of like forEach, but here new array is created, saving hassle, yay.
console.log(m1)

const m2 = t3.map(value => '<li>' + value + '</li>')
console.log(m2)

//map is used quite frequently in React.


//-----------
console.log('4---------')
const t4 = [1, 2, 3, 4, 5]

const [a,b, ...c] = t4
//Individual items of an array are easy to assign to variables with the help of the destructuring assignment.

console.log(a,b)
console.log(c)


