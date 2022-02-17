const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("missing password from arguments")
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.g8cgg.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: Number(process.argv[4]),
    })

    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
