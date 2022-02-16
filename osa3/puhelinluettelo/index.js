require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const Person = require("./models/person")

app.use(cors())
app.use(express.static("build"))
app.use(express.json())

morgan.token('postData', (req) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    } else {
        return " "
    }
})

//app.use(morgan('tiny'))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postData"))

/*const generateId = () => {
    if (persons.length == 0) {
        return 1
    }

    const getRandomInt = () => Math.floor(Math.random() * (persons.length * 3)) + 1

    let id = getRandomInt()
    while (persons.find(person => person.id === id)) {
        id = getRandomInt()
    }

    return id
}*/

app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>")
})

app.get("/api/persons", (req, res) => {
    Person.find({}).then(person => res.json(person))
})

app.get("/info", (req, res) => {
    const date = new Date()

    Person.count({})
        .then(count => {
            res.send(
                `<p>Phonebook has info for ${count} people</p>
                <p>${date.toString()}</p>`)
        })
        .catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    })

    person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: "query" })
        .then(updatedPerson => {
            if (!updatedPerson) {
                return res.status(404).json({ error: "Not found" })
            }

            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

// Send this error if trying to access unknown page
const notFoundError = (req, res) => {
    res.status(404).send({ error: "Unknown page request" })
}

app.use(notFoundError)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === "CastError") {
        return res.status(400).send({ error: "Bad id" })
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
