const jwt = require("jsonwebtoken")
const User = require("../models/user")
const logger = require("./logger")

const requestLogger = (req, res, next) => {
  if (req.method === "POST") {
    logger.info(`${req.method} ${req.path} ${res.statusCode} - ${JSON.stringify(req.body)}`)
  } else {
    logger.info(`${req.method} ${req.path} ${res.statusCode}`)
  }

  next()
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    req.token = auth.substring(7)
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken) {
    res.status(401).json({ error: "Token missing or is invalid" })
    return
  }

  req.user = await User.findById(decodedToken.id)
  next()
}

const notFoundError = (req, res) => {
  res.status(404).send({ error: "Unknown page request" })
}

const errorHandler = (error, req, res, next) => {
  logger.info(error.message)

  if (error.name === "CastError") {
    res.status(400).send({ error: "Bad id" })
    return
  }

  if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message })
    return
  }

  if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "Invalid token" })
    return
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  notFoundError,
  errorHandler,
}
