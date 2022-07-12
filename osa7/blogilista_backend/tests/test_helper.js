const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Awesome title",
    author: "Foo Bar",
    url: "localhost",
    likes: 12,
  },
  {
    title: "Awesome title2",
    author: "Foo Bar",
    url: "localhost",
    likes: 53,
  },
]

const newBlogWithoutLikes = {
  title: "Test title 123",
  author: "superuser",
  url: "localhost",
}

const newUser = {
  username: "FooBarFooBar",
  name: "Foo Bar",
  password: "123",
}

const getEmptyId = async () => {
  const blog = new Blog({ title: "Temp", url: "localhost" })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

module.exports = {
  initialBlogs,
  newBlogWithoutLikes,
  newUser,
  getEmptyId,
}
