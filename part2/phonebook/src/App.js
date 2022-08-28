import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Phonebook from './components/Phonebook'
import PhoneService from './services/phoneService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    PhoneService.getAll().then((initialData) => {
      setPersons(initialData)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons
      .map((person) => person.name)
      .includes(newName)
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`

    if (existingPerson) {
      if (window.confirm(message)) {
        const found = persons.find((person) => person.name === newName)
        const changedPerson = { ...found, number: phoneNumber }

        PhoneService.updateNumber(found.id, changedPerson).then(
          (returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== found.id ? person : returnedPerson
              )
            )
          }
        )
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: phoneNumber,
        id: persons.length + 1,
      }

      PhoneService.addPerson(newPersonObject).then((returnedPerson) => {
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
    const person = persons.find((person) => person.id === id)

    if (window.confirm(`delete ${person.name} ?`)) {
      PhoneService.deletePerson(id)
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
