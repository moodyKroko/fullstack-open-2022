import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [name, setName] = useState('')

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
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={name} onNameSearch={handleNameSearch} />

      <h3>add a new</h3>
      <PersonsForm
        submit={addPerson}
        name={newName}
        phoneNumber={phoneNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} searchPerson={name} />
    </div>
  )
}

export default App
