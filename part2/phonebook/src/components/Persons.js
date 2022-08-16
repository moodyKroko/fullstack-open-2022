const Persons = ({ persons, searchPerson }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  )

  return (
    <>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  )
}

export default Persons
