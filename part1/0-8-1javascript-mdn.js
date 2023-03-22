//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview

console.log(parseInt('10', 10))
console.log(parseInt('0xF', 16))

console.log(parseInt('321', 2))
console.log(parseInt('10.5', 10))
console.log(parseInt('0.6', 10))


console.log("---------------------------------------string characters")
console.log("Hello"[1] === "e"); // true


console.log("---------------------------------------string length property")
//To find the length of a string (in CODE UNITS), access its length property.
//beware of UTF encodings, it's messed up! (might be more/less(?) code units than characters etc.)
console.log("Hello".length)


console.log("---------------------------------------template literals")
//Template literals are literals delimited with backtick (`) characters, 
//allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
const age = 25
console.log("I am " + age + " years old.")  //string concatenation
console.log(`I am ${age} years old.`) //template literal


console.log("---------------------------------------temporal dead zone")
//let and const variables are 'visible' in the entire scope of their declarations, 
//BUT HAVE NO VALUE ASSIGNED UNTIL THE PROGRAM REACHES THEIR DECLARATION POINT.
//That is called "temporal dead zone", or TDZ for short.
        //PS 'var' in TDZ returns 'undefined', does not throw an error.
function foo(x, condition) {
    if (condition) {
    //  console.log(x);
      const x = 2;
      console.log(x);
    }
  }
  
  foo(1, true); //In C++ that would be '1' (from argument) and '2' from 'const x =2' declaration.
                //In JS however, that throws an error "Cannot access 'x' before initialization".
  

/*The term "temporal" is used because the zone depends on the order of execution (time) rather than 
the order in which the code is written (position). For example, the code below works because, even 
though the function that uses the let variable appears before the variable is declared, the function is called outside the TDZ. */
{
    // TDZ starts at beginning of scope
    const func = () => console.log(letVar); // OK
  
    // Within the TDZ letVar access throws `ReferenceError`
  
    let letVar = 3; // End of TDZ (for letVar)
    func(); // Called outside TDZ!
  }


console.log("---------------------------------------double/triple-equals operator")
/*For equality, the double-equals operator performs type coercion if you give it different types, 
with sometimes interesting results. On the other hand, the triple-equals operator 
does not attempt type coercion, and is usually preferred.*/

console.log(123 == "123")
console.log(1 == true)

console.log(123 === "123")
console.log(1 === true)


console.log("---------------------------------------logical operators")
//Notably, logical operators don't work with boolean values only — they work by the "truthiness" of the value.
console.log(false || "world") //returns world
console.log(0 && "Hello") // 0 because 0 is "falsy"

//The && and || operators use short-circuit logic, which means whether they will execute their second operand is dependent on the first.

//This is useful for checking for null objects before accessing their attributes:

const obj = {
    name: "a",
    stuff: "b"
}
let obj222
console.log(obj222 && obj222.name)
//console.log(obj222.name) //error: Cannot read properties of undefined (reading 'name')
console.log(obj && obj.name) //second is evaluated, becaouse its 'and' and first operand is true, so second must be checked
console.log(obj)

console.log("---------------------------------------for loops/switch")
//just exotic (for me) ones

//JavaScript also contains two other prominent for loops: 
    //for...of, which iterates over iterables, most notably arrays, 
    //and for...in, which visits all enumerable properties of an object.

    array = []
    for (const value of array){
        //do something with value
    }
    
    let object
    for (const property in object) {
        //do something with object property
    }

//switch
/*any expression can be part of the case clause, not just string or number literals, 
and they would be evaluated one-by-one until one equals the value being matched. 
Comparison takes place between the two using the === operator. */

let action
switch (action) {
    case "draw":
        //do stuff
        break;
    case "eat":
        //do stuff
        break;
    default:
        //do stuff
}


console.log("---------------------------------------error catching")

try {
    //stuff - it can throw some built-in one.
    //throw new Error("erorendumpopierniczendum") // I can throw it myself - commented out because, well, it throws an error you dummy!
} catch (e) {
    console.error("Erorrrrrrrr:", e);
}

/* In general, you can't tell the type of the error you just caught, because anything can be thrown from a throw statement. 
However, you can usually assume it's an Error instance, as is the example above. There are some subclasses of Error built-in, 
like TypeError and RangeError, that you can use to provide extra semantics about the error.

All of these are legit:
throw "Error2"
throw 42
throw true
throw new Error("Required")
*/


/*There's no conditional catch in JavaScript — if you only want to handle one type of error, you need to catch everything, 
identify the type of error using instanceof, and then rethrow the other cases.*/

function erorring (x) {
    try {
        //stuff
        if (x == 1) throw new Error("2")
        if (x == 2 ) throw 42
        if (x == 3) throw true
    } catch (e) {
        if (e instanceof Error) console.log("Droga matko, wystąpił incydent kałowy")
        else if (typeof e === "number") console.log("A imie jego 44")
        else {
            console.log("hmmm")
            //Don't know how to handle other error types; throw them so
            //something else up in the call stack may catch and handle it
            //throw e;
        }
    }

}
erorring(1)
erorring(2)
erorring(3)

//If an error is uncaught by any try...catch in the call stack, the program will exit.


console.log("---------------------------------------objects")
//JavaScript objects can be thought of as collections of KEY-VALUE PAIRS. As such, they are similar to Hash tables in C and C++.
/* Unlike objects in statically typed languages, objects in JavaScript do not have fixed shapes — properties can be added, deleted, re-ordered, mutated,
or dynamically queried at any time. */
//Object keys are always strings or symbols — even array indices, which are canonically integers, are actually strings under the hood.

//Objects are usually created using the literal syntax:
let amount = 52
const obj2 = {
    name: "Carrots",
    for: "Max",
    howMany: amount,
    details: {
        color: "orange",
        size: 12,
    },
}
//---------------------------------------------------randomly now because time and adhd 

/*The rest parameter will store all arguments after where it's declared, but not before. 
In other words, function avg(firstValue, ...args) will store the first value passed into the function 
in the firstValue variable and the remaining arguments in args.

If a function accepts a list of arguments and you already hold an array, you can use the spread syntax in 
the function call to spread the array as a list of elements. For instance: avg(...numbers). */

/*There's another way that anonymous functions can be useful: it can be simultaneously declared and invoked in a single expression, 
called an Immediately invoked function expression (IIFE): */