const Phonebook = ({ personList, filter }) => {
  const persons = personList.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  )
}

export default Phonebook
