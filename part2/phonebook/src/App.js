import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Phonebook from './components/Phonebook'
import phoneService from './services/phoneService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService.getAll().then((initialData) => {
      setPersons(initialData)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersonObject = {
        name: newName,
        number: phoneNumber,
        id: persons.length + 1,
      }

      phoneService.addPerson(newPersonObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setPhoneNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.filter((person) => person.id === id)

    if (window.confirm(`delete ${person[0].name} ?`)) {
      phoneService
        .deletePerson(id)
        .then((returnedStatus) => {
          console.log(returnedStatus)
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          alert(`cannot find person with id ${id}`)
        })
    }
  }

  const filteredList = filter.includes()
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        onSearch={handleNameSearch}
      />

      <h3>add a new</h3>
      <PersonsForm
        submit={addPerson}
        name={newName}
        phoneNumber={phoneNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Phonebook
        list={filteredList}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
