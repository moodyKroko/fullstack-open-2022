const Phonebook = ({ list, onDelete }) => {
  return (
    <>
      {list.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => onDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Phonebook
