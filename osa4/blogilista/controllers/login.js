const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const isPasswordCorrect = !user ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !isPasswordCorrect) {
    res.status(401).json({ error: "Invalid username or password" })
    return
  }

  // eslint-disable-next-line no-underscore-dangle
  const userForToken = { username: user.username, id: user._id }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
