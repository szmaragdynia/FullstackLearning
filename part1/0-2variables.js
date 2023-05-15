//---------------------------------variables
console.log('-----------------------variables')
const x = 1
let y = 5

console.log(x, y)

y += 10
console.log(x,y)

y = 'sometext'
console.log(x,y,);

//x = 4 //error! (ok)
//if const was an object or array (which is an object) its contents can be changed.

//---------------------------------var, let and const - What, why and how - ES6 JavaScript Features
//https://www.youtube.com/watch?v=sjyJBL5fkp8
console.log('-----------------------');
//ALL (OR MOST?) BELOW REGARDS 'VAR', NOT 'LET' OR 'CONST'
//LET (AND CONST?) IS BLOCK-SCOPED
//There is probably no real need to use var anymore, so this is just for understanding some legacy mess


(function (){
    for (var i = 0; i < 10; i++){
        console.log(i)
    }
})();
//console.log(i) 
//now it throws undefined error - good, because var is function scoped. 
//Without IIFE (immediately invoked function expression) var would be known and equaled 10

//BEWARE!!!! IF YOU DO NOT DECLARE THE VARIABLE, JS WILL GO UP AND UP THE CHAIN AND....DECLARE IT GLOBALLY XDDD - you can accidently declare global variables!!!
console.log("-----lol what");
(function (){
    for (j = 0; j < 10; j++){
        console.log(j)
    }
})();
console.log(j)
//"use strict" prevents that, throws an error that 'j' is not defined

//ALSO BEWARE - if you dont declare the variable, and it was declared somewhere up in the chain, it will be re-assigned the value in your loop argument.
console.log("-----lol what2");
var k = 999999999; 
(function (){
    for (k = 0; k < 10; k++){
        console.log(k)
    }
})();
console.log(k)

//if you, on the other hand, put it after loop, its OK, because variables are hoisted (moved to the top [of the scope I guess])
console.log("-----lol what2");
var l = 999999999; 
(function (){
    for (l = 0; l < 10; l++){
        console.log(l)
    }
    var l;
})();
console.log(l)

//Basically workflow is: Use const, unless you need to change the variable, then use let.
//why? Because MINIMIZE MUTABLE STATE - dishwasher example