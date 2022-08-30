import { useState, useEffect } from 'react'
import { Notification, PersonsForm, Phonebook } from './components'
import PhoneService from './services/phoneService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    PhoneService.getAll().then((initialData) => {
      setPersons(initialData)
    })
  }, [])

  const notify = (message, type) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: phoneNumber,
    }

    setNewName('')
    setPhoneNumber('')

    const existingPerson = persons.find((person) => person.name === newPerson.name)

    if (existingPerson) {
      const message = `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`

      if (window.confirm(message)) {
        // update existing person
        const changedPerson = { ...existingPerson, number: phoneNumber }

        PhoneService.updateNumber(existingPerson.id, changedPerson)
          .then((savedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : savedPerson
              )
            )
            notify(
              `Information of ${newName} has been updated successfully`,
              'success'
            )
          })
          .catch((error) => {
            // returns an array & stops showing the removed person in the list
            setPersons(persons.filter((person) => person.id !== existingPerson.id))
            notify(
              `Information of ${newName} has already been removed from server`,
              'error'
            )
          })
        return
      }
    }

    PhoneService.addPerson(newPerson).then((savedPerson) => {
      setPersons(persons.concat(savedPerson))
      notify(`Added ${newName}`, 'success')
    })
  }

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id)

    if (window.confirm(`delete ${person.name} ?`)) {
      PhoneService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          notify(
            `${person.name} has been successfully deleted from server`,
            'success'
          )
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id))
          notify(
            `Information of ${person.name} has already been removed from server`,
            'error'
          )
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

  const filteredList = filter.includes()
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notifications={notification} />
      filter shown with
      <input
        value={filter}
        onChange={handleNameSearch}
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
