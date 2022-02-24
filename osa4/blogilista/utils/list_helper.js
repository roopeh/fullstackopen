// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((prevValue, curValue) => prevValue + curValue.likes, 0)

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxValue = Math.max(...blogs.map((blog) => blog.likes))
  const favourite = blogs.find((blog) => blog.likes === maxValue)
  // eslint-disable-next-line no-underscore-dangle
  delete favourite._id
  delete favourite.url
  // eslint-disable-next-line no-underscore-dangle
  delete favourite.__v
  return favourite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const mostBlogsArr = []
  blogs.forEach((blog) => {
    const existingObj = mostBlogsArr.find((obj) => obj.author === blog.author)
    if (!existingObj) {
      mostBlogsArr.push({
        author: blog.author,
        blogs: 1,
      })
    } else {
      existingObj.blogs += 1
    }
  })

  mostBlogsArr.sort((a, b) => b.blogs - a.blogs)
  return mostBlogsArr[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const mostLikesArr = []
  blogs.forEach((blog) => {
    const existingObj = mostLikesArr.find((obj) => obj.author === blog.author)
    if (!existingObj) {
      mostLikesArr.push({
        author: blog.author,
        likes: blog.likes,
      })
    } else {
      existingObj.likes += blog.likes
    }
  })

  mostLikesArr.sort((a, b) => b.likes - a.likes)
  return mostLikesArr[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
