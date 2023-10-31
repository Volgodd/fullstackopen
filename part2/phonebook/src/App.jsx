import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [color, setColor] = useState()

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const errorTimeOut = () => {
    setTimeout(() => {
      setErrorMessage(null)
      setColor()
    }, 5000)
  }

  const handleAddName = (e) => {
    e.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find((element) => element.name === newName)

    if (!existingPerson) {
      return personService.create(newPersonObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${returnedPerson.name}`)
        errorTimeOut()
      })
    }

    if (
      window.confirm(
        `${newName} is already added to phone book, replace the old number with a new one?`
      )
    ) {
      const changedPersonObject = { ...existingPerson, number: newNumber }

      personService
        .updatePerson(existingPerson.id, changedPersonObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          )
          setNewName('')
          setNewNumber('')
          setErrorMessage(`${returnedPerson.name} was updated`)
          errorTimeOut()
        })
        .catch((error) => {
          setColor('red')
          setErrorMessage(
            `Information of ${existingPerson.name} has already been removed from the server`
          )
          errorTimeOut()
        })
    }
  }

  const handleDeleteName = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((item) => item.id !== id)))
      setErrorMessage(`${name} was deleted`)
      errorTimeOut()
    }
  }

  return (
    <div>
      <h1>Phone book</h1>
      <Notification message={errorMessage} color={color} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <hr />
      <PersonForm
        handleAddName={handleAddName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        onClickF={handleDeleteName}
      />
    </div>
  )
}

export default App
