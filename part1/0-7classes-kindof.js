//---------------------------------classes (kind of, impostors!)
console.log('-----------------------classes (kind of, impostors!)')

//there are no real classes in JS. However ES6 added a way to "simulate" it.

class Person {
    constructor(name, age) {
        this. name = name
        this.age = age
    }
    greet() {
        console.log('hello, my name is ' + this.name)
    }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja Garnbret', 23)
janja.greet()

//At the core, they are still objects based on JavaScript's prototypal inheritance.
//The type of both objects is actually Object
//The introduction of the class syntax was a controversial addition.

/*The ES6 class syntax is used a lot in "old" React and also in Node.js, 
hence an understanding of it is beneficial even in this course. 
However, since we are using the new Hooks feature of React throughout this course, 
we have no concrete use for JavaScript's class syntax.*/