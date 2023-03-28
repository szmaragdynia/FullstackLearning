const arr = [1,2,3]
const arr2 = [...arr]
const arr3 = arr

console.log("arr pre-pushing:",arr)
arr2.push(4)
arr3.push(5)
console.log("after arr2.push(4) and arr3.push(5):")
console.log("arr:", arr)
console.log("arr2:", arr2)
console.log("arr3:", arr3)
