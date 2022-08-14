import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const newPersonObject = persons.concat([{ name: newName }])

    setPersons(newPersonObject)
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input type='text' value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <br />
      <div>debug: {newName} </div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  )
}

export default App
