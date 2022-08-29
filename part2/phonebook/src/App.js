import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonsForm from './components/PersonsForm'
import Phonebook from './components/Phonebook'
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

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons
      .map((person) => person.name)
      .includes(newName)
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`

    if (existingPerson) {
      if (window.confirm(message)) {
        // update existing person
        const found = persons.find((person) => person.name === newName)
        const changedPerson = { ...found, number: phoneNumber }

        PhoneService.updateNumber(found.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== found.id ? person : returnedPerson
              )
            )
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${newName} has already been removed from server`,
              type: 'error',
            })

            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter((person) => person.id !== found.id))
            // returns an array & stops showing the removed person in the list
          })
      }
    } else {
      // create new person
      const newPersonObject = {
        name: newName,
        number: phoneNumber,
        id: persons.length + 1,
      }

      PhoneService.addPerson(newPersonObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))

        setNotification({
          message: `Added ${newName}`,
          type: 'success',
        })

        setTimeout(() => {
          setNotification(null)
        }, 5000)

        setNewName('')
        setPhoneNumber('')
      })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id)

    if (window.confirm(`delete ${person.name} ?`)) {
      PhoneService.deletePerson(id)
        .then((returnedStatus) => {
          setNotification({
            message: `${person.name} has been successfully deleted from server`,
            type: 'success',
          })

          setTimeout(() => {
            setNotification(null)
          }, 5000)

          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          setNotification({
            message: `Information of ${person.name} has already been removed from server`,
            type: 'error',
          })

          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter((person) => person.id !== id))
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
