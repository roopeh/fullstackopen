const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

morgan.token('postData', (req) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    } else {
        return " "
    }
})

//app.use(morgan('tiny'))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :postData"))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "0401234568"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-532352312"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "asd",
        "number": "134423"
    },
    {
        "id": 6,
        "name": "Foo Bar",
        "number": "123456780"
    }
]

const generateId = () => {
    if (persons.length == 0) {
        return 1
    }

    const getRandomInt = () => Math.floor(Math.random() * (persons.length * 3)) + 1

    let id = getRandomInt()
    while (persons.find(person => person.id === id)) {
        id = getRandomInt()
    }

    return id
}

app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>")
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/info", (req, res) => {
    const count = persons.length
    const date = new Date()
    res.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${date.toString()}</p>`)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(itr => itr.id === id)

    if (person) {
        res.send(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(itr => itr.id === id)

    if (person) {
        persons = persons.filter(itr => itr.id !== id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})

app.post("/api/persons", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: "Missing name" })
    } else if (!req.body.number) {
        return res.status(400).json({ error: "Missing number" })
    } else if (persons.find(person => person.name === req.body.name)) {
        return res.status(400).json({ error: "Duplicate name" })
    }

    const person = {
        id: generateId(),
        name: req.body.name,
        number: req.body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
