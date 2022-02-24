const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const {
  initialBlogs,
  newBlogWithoutLikes,
  getEmptyId,
} = require("./test_helper")

const api = supertest(app)

const loginAndReturnToken = async () => {
  const result = await api
    .post("/api/login")
    .send({ username: "testi", password: "testi" })
    .expect(200)

  return result.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)

  // Create test user for each test
  await User.deleteMany({})
  const user = new User({ username: "testi", name: "Test User", passwordHash: await bcrypt.hash("testi", 10) })
  await user.save()
})

describe("Do tests on initial blogs", () => {
  test("Blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("Returns correct amount of blogs?", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test("Returns blog with specific title?", async () => {
    const response = await api.get("/api/blogs")

    const titles = response.body.map((res) => res.title)
    expect(titles).toContain("Awesome title2")
  })

  test("Check if blogs have id field", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
  })
})

describe("Getting a blog", () => {
  test("Return 404 if blog id does not exist", async () => {
    const invalidId = await getEmptyId()
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(404)
  })
})

describe("Adding new blog", () => {
  test("POST should not work without token", async () => {
    await api.post("/api/blogs")
      .send(newBlogWithoutLikes)
      .expect(401)
  })

  test("Test if POST works with token", async () => {
    const token = await loginAndReturnToken()

    await api.post("/api/blogs")
      .set("authorization", `bearer ${token}`)
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const titles = response.body.map((res) => res.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(newBlogWithoutLikes.title)
  })

  test("Test if likes field is initialized to 0 if not specified", async () => {
    const token = await loginAndReturnToken()

    await api.post("/api/blogs")
      .set("authorization", `bearer ${token}`)
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")
    const blog = response.body.find((itr) => itr.title === newBlogWithoutLikes.title)
    expect(blog).toBeDefined()
    expect(blog.likes).toBe(0)
  })

  test("Test if blog title must be specified", async () => {
    const token = await loginAndReturnToken()

    const newBlogWithoutTitle = { ...newBlogWithoutLikes }
    delete newBlogWithoutTitle.title
    await api.post("/api/blogs")
      .set("authorization", `bearer ${token}`)
      .send(newBlogWithoutTitle)
      .expect(400)
  })

  test("Test if blog url must be specified", async () => {
    const token = await loginAndReturnToken()

    const newBlogWithoutUrl = { ...newBlogWithoutLikes }
    delete newBlogWithoutUrl.url
    await api.post("/api/blogs")
      .set("authorization", `bearer ${token}`)
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})

describe("Removing a blog", () => {
  test("Return 204 if a blog is deleted successfully", async () => {
    const token = await loginAndReturnToken()

    // Insert temporary blog
    let response = await api.post("/api/blogs")
      .set("authorization", `bearer ${token}`)
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogToRemove = { ...response.body }

    response = await api.get("/api/blogs")
    const beforeDeleteCount = response.body.length

    await api.delete(`/api/blogs/${blogToRemove.id}`)
      .set("authorization", `bearer ${token}`)
      .expect(204)

    response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(beforeDeleteCount - 1)
  })
})

describe("Updating a blog", () => {
  test("Return 404 if blog does not exist", async () => {
    const invalidId = await getEmptyId()
    await api.put(`/api/blogs/${invalidId}`)
      .send({ likes: 50 })
      .expect(404)
  })

  test("Test if blog can be updated", async () => {
    let response = await api.get("/api/blogs")
    const blogToUpdate = { ...response.body[0] }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 1337 })
      .expect(200)

    response = await api.get(`/api/blogs/${blogToUpdate.id}`)
    expect(response.body.likes).toBe(1337)
  })
})

afterAll(() => mongoose.connection.close())
