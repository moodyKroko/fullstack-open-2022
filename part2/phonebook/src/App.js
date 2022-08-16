import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'

// TODO: 2.10 phonebook step5

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [findName, setFindName] = useState('')

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

      setPersons(persons.concat(newPersonObject))
      setNewName('')
      setPhoneNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setPhoneNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    console.log(event.target.value)

    setFindName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <div>
        filter shown with
        <input type='search' value={findName} onChange={handleNameSearch} />
      </div>

      <h2>add a new</h2>
      <PersonsForm />
      <form onSubmit={addPerson}>
        <div>
          name:
          <input type='text' value={newName} onChange={handleNameChange} />
        </div>

        <div>
          number:
          <input
            type='tel'
            name='phone'
            placeholder='39-44-5323523'
            value={phoneNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <br />
      <div>debug: {newName} </div>
      <div>debug: {phoneNumber} </div>

      <h2>Numbers</h2>
      <Persons persons={persons} searchPerson={findName} />
    </div>
  )
}

export default App
