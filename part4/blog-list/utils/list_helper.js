const dummy = (blogsArr) => { 
  return 1
}

const totalLikes = (blogsArr) => { 
  sumAll = (accum, currVal) => accum + currVal.likes
  
  return blogsArr.reduce(sumAll, 0)
}

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

module.exports = { dummy, totalLikes, favoriteBlog }