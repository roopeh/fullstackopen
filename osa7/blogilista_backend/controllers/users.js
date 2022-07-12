const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({})
    .populate("blogs", { url: 1, title: 1, author: 1 })

  response.json(users)
})

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body

  if (!password) {
    res.status(400).json({ error: "Password missing" })
    return
  // eslint-disable-next-line no-else-return
  } else if (password.length < 3) {
    res.status(400).json({ error: "Password is too short" })
    return
  }

  const duplicateUsername = await User.findOne({ username })
  if (duplicateUsername) {
    res.status(400).json({ error: "Username must be unique" })
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter
