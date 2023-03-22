console.log("---------------------------------------")
//To find the length of a string (in CODE UNITS), access its length property.
console.log("Hello".length)

//--------I DONT GET THE BELOW THINGS, THIS IS HERE JUST TO REMIND ME THAT THERE IS STUFF TO BE UNDERSTOOD ABOUT IT [research]
//below thingshttps://developer.mozilla.org/en-US/docs/Glossary/Code_unit
//A CODE UNIT is the basic component used by a character encoding system (such as UTF-8 or UTF-16).
//A character encoding system uses one or more CODE UNITS to encode a Unicode CODE POINT("some number").
//CODE UNITS do not always map 1-1 onto what we might consider characters.
//For example, characters with diacritics such as accents can sometimes be represented using two Unicode code points:
console.log("\u006E\u0303") //ñ
console.log("\u006E\u0303".length) //2

console.log("ñ") //ñ
console.log("ñ".length) //1 

//Also, since not all of the code points defined by Unicode fit into 16 bits, many Unicode
//code points are encoded as a pair of UTF-16 code units, which is called a surrogate pair:

const face = "🥵";
console.log(face.length); // 2

//The codePointAt() method of the JavaScript String object enables you to retrieve the Unicode code point from its encoded form:
const face = "🥵";
console.log(face.codePointAt(0)); // 129397

//maybe more here: https://pro.arcgis.com/en/pro-app/2.9/help/data/geodatabases/overview/a-quick-tour-of-unicode.htm
