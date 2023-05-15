//---------------------------------functions
console.log('-----------------------functions')
//The complete process, without cutting corners, of defining an arrow function is as follows:

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}
//function is called as can be expected:
const result = sum(1,5)
console.log(result)


//----------------------
console.log('---')
//If there is just a single parameter, we can exclude the parentheses from the definition:

const square = p => {
    console.log(p)
    return p * p
}
console.log(square(6))
//----------------------
console.log('---')
//If the function only contains a single expression then the braces are not needed.

const square2 = p => p * p
console.log(square2(7))

console.log('---')
//This form is particularly handy when manipulating arrays - e.g. when using the map method:
const t = [1,2,3]
console.log(t)

const tSquared = t.map(p => p * p)
console.log(tSquared)

const tSquared2 = t.map(square2)
console.log(tSquared2)


//----------------------
//----------------------
console.log('---')
//Before ES6 there were no arrow function feature. Back then the only way to define functions was by using the keyword function
//There are two ways to reference the function; 


//one is giving a name in a function declaration.
function product(a,b) {
    return a * b
}
const resulting = product(2,6)
console.log(resulting)
    

//The other way to define the function is by using a function expression. 
    //In this case, there is no need to give the function a name and the definition may reside among the rest of the code:
const product2 = function(a,b){
    return a * b
}
const resulting2 = product2(2,6)
console.log(resulting2)


//Just for completeness, the same as above using arrow functions
const product3 = (a,b) => a * b
const resulting3 = product3(2,6)
console.log(resulting3)





