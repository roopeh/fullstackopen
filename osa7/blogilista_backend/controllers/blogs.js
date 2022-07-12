const blogsRouter = require("express").Router()
const { userExtractor } = require("../utils/middleware")
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { user } = request
  if (!user) {
    response.status(400).json({ error: "User not found" })
    return
  }

  // eslint-disable-next-line no-underscore-dangle
  const blog = new Blog({ ...request.body, user: user._id })

  const result = await blog.save()
  result.populate("user", { username: 1, name: 1 })
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const { user } = request
  if (!user) {
    response.status(400).json({ error: "User not found" })
    return
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).json({ error: "Blog not found" })
    return
  }

  // eslint-disable-next-line no-underscore-dangle
  if (blog.user.toString() !== user._id.toString()) {
    response.status(401).json({ error: "Only blog creator can remove his/her blogs" })
    return
  }

  blog.remove()
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: "query" },
  )

  if (!updatedBlog) {
    response.status(404).json({ error: "Not found" })
    return
  }

  response.json(updatedBlog)
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate("user", { username: 1, name: 1 })
  if (!blog) {
    response.status(404).json({ error: "Not found" })
  }

  const { comment } = request.body
  blog.comments = blog.comments.concat(comment)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
