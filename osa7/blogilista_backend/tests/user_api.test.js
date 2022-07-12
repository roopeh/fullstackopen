const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const { newUser } = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passHash = await bcrypt.hash("123", 10)
  const user = new User({ username: "FooBar", name: "Test User", passwordHash: passHash })
  await user.save()
})

describe("Do tests on initial user", () => {
  test("Expect db have initial user", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)

    expect(response.body).toHaveLength(1)
  })
})

describe("Inserting new user", () => {
  test("Test if user creation works", async () => {
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/users")
    expect(response.body).toHaveLength(2)

    const usernames = response.body.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test("Username must exist and be at least 3 characters", async () => {
    const userWithoutUsername = { ...newUser }
    delete userWithoutUsername.username

    await api
      .post("/api/users")
      .send(userWithoutUsername)
      .expect(400)

    const userBadUsername = { ...newUser, username: "AA" }
    await api
      .post("/api/users")
      .send(userBadUsername)
      .expect(400)
  })

  test("Password must exist and be at least 3 characters", async () => {
    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password

    await api
      .post("/api/users")
      .send(userWithoutPassword)
      .expect(400)

    const userBadPassword = { ...newUser, password: "AA" }
    await api
      .post("/api/users")
      .send(userBadPassword)
      .expect(400)
  })

  test("Username must be unique", async () => {
    const response = await api.get("/api/users")
    const userDuplicateUsername = { ...newUser, username: response.body[0].username }

    await api
      .post("/api/users")
      .send(userDuplicateUsername)
      .expect(400)
  })
})

afterAll(async () => mongoose.connection.close())
