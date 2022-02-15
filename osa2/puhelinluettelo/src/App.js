import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const Header = ({name}) => <h2 className="header">{name}</h2>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [notification, setNotification] = useState({ message: '', type: 0 })

  useEffect(() => {
    personService
      .getAll()
      .then(savedPersons => setPersons(savedPersons))
  }, [])

  const createNotification = (message, isError) => {
    setNotification({ message: message, type: isError ? 1 : 0 })
    setTimeout(() => setNotification(''), 3000)
  }

  const getPersonWithName = (name) => {
    return persons.find((itr) => itr.name.toUpperCase() === name.toUpperCase())
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if (newName.length === 0) {
      createNotification("Name field is empty", true)
      return
    }
    else if (newNumber.length === 0) {
      createNotification("Number field is empty", true)
      return
    }

    const existingPerson = getPersonWithName(newName)
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        createNotification(`${newName} is already added to phonebook`, true)
        return
      }

      // Person exists but numbers do not match => update number for person
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then(response => {
            createNotification(`Updated ${existingPerson.name}`, false)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
          })
          .catch(() => {
            createNotification(`Information of ${existingPerson.name} has already been removed from server`, true)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })

        setNewName("")
        setNewNumber("")
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPersons => {
        createNotification(`Added ${newPerson.name}`, false)
        setPersons(persons.concat(returnedPersons))
        setNewName("")
        setNewNumber("")
      })
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          createNotification(`Removed ${name}`, false)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          createNotification(`Information of ${name} has already been removed from server`, true)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilterVal(event.target.value)

  const personList = filterVal.length > 0 ? persons.filter(person => person.name.toUpperCase().includes(filterVal.toUpperCase())) : persons

  return (
    <div>
      <Header name="Phonebook" />
      <Notification message={notification.message} type={notification.type} />
      <Filter value={filterVal} filterFunction={handleFilter} />
      <Header name="add a new" />
      <PersonForm name={newName} number={newNumber} nameChangeFunction={handleNameChange} numberChangeFunction={handleNumberChange} submitFunction={addNewPerson} />
      <Header name="numbers" />
      <Persons personList={personList} removeFunction={removePerson} />
    </div>
  )
}

export default App
