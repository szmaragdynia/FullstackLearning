const lodash = require('lodash');

const dummy = (blogsArr) => { 
  return 1
}

//========================================================================================================================================================
const totalLikes = (blogsArr) => { 
  sumAll = (accum, currVal) => accum + currVal.likes
  
  return blogsArr.reduce(sumAll, 0)
}

//========================================================================================================================================================
const favoriteBlog = (blogsArr) => {
  findMostLiked = (accum, currVal) => currVal.likes > accum.likes ? currVal : accum //if many, first is returned!

  if (blogsArr.length === 0){
    return {}
  } else {
    const mostLiked = blogsArr.reduce(findMostLiked)
    return {
      title: mostLiked.title,
      author: mostLiked.author,
      likes: mostLiked.likes
    }
  }
}

//========================================================================================================================================================
const mostBlogs = (blogsArr) => {
  if (blogsArr.length === 0) return {}

  getAuthorsBlogsAmount = (authorsBlogsAmount, currBlog) => { //the functional programming way would be to probably first copy the accumulator, work on that, and return that chagned copy. But this way is allowed as well as far as I understand (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce, ctrl+f ". If you decided to mutate the accumulator instead)
    if (authorsBlogsAmount[currBlog.author]) {  // if in accum there is field with currBlog author name - e.g. (currblog = { author: 'pawel'}) - we check if accum = { pawel: <number. not interesting to us now> } exists
      authorsBlogsAmount[currBlog.author] += 1  //if it does, then increment its value by one
    } else authorsBlogsAmount[currBlog.author] = 1 //if does not, it's this authors first entry

    return authorsBlogsAmount
  }
  /*  What accum will be, is basically:
  accum = {
    'pawel': 1,
    'magda': 2
  }
  */
  
  /*We must use bracket notation (accum[currBlog.author]) instead of dot notation (accum.currBlog.author) because 
  "bracket notation allows you to use a variable or an expression as the property name, while dot notation requires a literal property name"

  let obj = {}; // An empty object
  let key = "foo"; // A variable
  obj[key] = "bar"; // obj is now {foo: "bar"}
  obj.key = "baz"; // obj is now {foo: "bar", key: "baz"}
  console.log(obj[key]); // This prints "bar"
  console.log(obj.key); // This prints "baz"

  */

  const authorsBlogsAmount = blogsArr.reduce(getAuthorsBlogsAmount, {})
  const maxValue = Math.max(...Object.values(authorsBlogsAmount)) //get the biggest blog number (value) among the authors(keys)
  const maxAuthor = Object.keys(authorsBlogsAmount).find(value => authorsBlogsAmount[value] === maxValue) //among the keys, find who was the author(key) with the maxValue

  return {author: maxAuthor, blogs: maxValue}

  /* Bing proposed this:
  // Assuming your array of objects is called books
  function getMostFrequentAuthor(books) {
  // Create a hashmap that counts the occurrences of each author
  let counts = books.reduce((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1;
    // (acc[book.author] || 0) + 1. This expression means that if acc[book.author] already exists, it adds one to its value. If it does not exist, it assigns it a value of zero and then adds one to it. 
    return acc;
  }, {});

  // Convert the hashmap to an array of [author, count] pairs
  let entries = Object.entries(counts);

  // Sort the array by count in descending order
  entries.sort((a, b) => b[1] - a[1]);
    //The minus sign here is not a minus sign, but a subtraction operator. It is used to compare the values of the second elements of the [key, value] pairs in the entries array. The sort method takes a comparison function that returns a positive number, zero, or a negative number depending on whether the first argument is greater than, equal to, or less than the second argument. By subtracting a[1] from b[1], we are sorting the array in descending order of the values. For example:
    //If b[1] is 5 and a[1] is 3, then b[1] - a[1] is 2, which is positive. This means that b should come before a in the sorted array.
    //If b[1] is 3 and a[1] is 3, then b[1] - a[1] is 0, which means that b and a are equal and their order does not matter.
    //If b[1] is 3 and a[1] is 5, then b[1] - a[1] is -2, which is negative. This means that a should come before b in the sorted array.


  // Return the first element of the sorted array, which is the most frequent author
  return entries[0][0];
  }
  */

}

//========================================================================================================================================================
const mostBlogsWithLodash = (blogsArr) => {
  if (blogsArr.length === 0) return {}
  
  const authorsBlogsAmount =  lodash.countBy(blogsArr, blog => blog.author) //cout occurences of author in blogs
  /*RESULTING IN:
  Object {
    "Edsger W. Dijkstra": 2,
    "Michael Chan": 1,
    "Robert C. Martin": 3,
    } */

  
  const maxValue = Math.max(...Object.values(authorsBlogsAmount)) //get the biggest blog number (value) among the authors(keys)
  const maxAuthor = Object.keys(authorsBlogsAmount).find(value => authorsBlogsAmount[value] === maxValue) //among the keys, find who was the author(key) with the maxValue

  return {author: maxAuthor, blogs: maxValue} 
}


//========================================================================================================================================================
const mostLikes = (blogsArr) => {
  if (blogsArr.length === 0) return {}

  getAuthorsLikesOverall = (authorsLikesOverall, currBlog) => { 
    if (authorsLikesOverall[currBlog.author]) { //if exists
      authorsLikesOverall[currBlog.author] += currBlog.likes  
    } else authorsLikesOverall[currBlog.author] = currBlog.likes      //????????????????????is this line necessary? 

    return authorsLikesOverall
  }
  const authorsLikesOverall = blogsArr.reduce(getAuthorsLikesOverall, {})

  const maxValue = Math.max(...Object.values(authorsLikesOverall)) 
  const maxAuthor = Object.keys(authorsLikesOverall).find(value => authorsLikesOverall[value] === maxValue) 

  return {author: maxAuthor, likes: maxValue}  
}

//========================================================================================================================================================
const mostLikesWithLodash = (blogsArr) => {
  if (blogsArr.length === 0) return {}
  
  const groupedObjectsByAuthor = lodash.groupBy(blogsArr, "author")
  /*RESULTING IN:  
  {
    "author1_name" : [obj1, obj2], //author:group
    "author2_name": [obj1...]
  }*/
  /* Object {
    "Edsger W. Dijkstra": Array [
      Object {
        "__v": 0,
        "_id": "5a422aa71b54a676234d17f8",
        "author": "Edsger W. Dijkstra",
        "likes": 5,
        "title": "Go To Statement Considered Harmful",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      },
      Object {
        "__v": 0,
        "_id": "5a422b3a1b54a676234d17f9",
        "author": "Edsger W. Dijkstra",
        "likes": 12,
        "title": "Canonical string reduction",
        "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      },
    ],
    "Michael Chan": Array [
      Object {
        "__v": 0,
        "_id": "5a422a851b54a676234d17f7",
        "author": "Michael Chan",
        "likes": 7,
        "title": "React patterns",
        "url": "https://reactpatterns.com/",
      },
    ], 
    .... and so on
    */
  
  const authorsLikesOverall = lodash.map(groupedObjectsByAuthor, (group, author) => {  //group is value of key author because " The iteratee is invoked with three arguments: (value, index|key, collection)."
    return {
      author: author,
      likes: lodash.sumBy(group, "likes")
    }
  })
  //map: for every ...item?...that is group, you return author(which is groups key, because group is that key value), and sum of likes throughout the group items - because the group is an array of objects
  //RESULTING IN: [{"author": "Michael Chan", "likes": 7}, {"author": "Edsger W. Dijkstra", "likes": 17}, {"author": "Robert C. Martin", "likes": 12}]
  
  let blogWithMaxLikes = authorsLikesOverall[0]
  authorsLikesOverall.forEach(blog => {
    if (blog.likes > blogWithMaxLikes.likes) blogWithMaxLikes = blog
  })
  
  return blogWithMaxLikes
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostBlogsWithLodash, mostLikes, mostLikesWithLodash }