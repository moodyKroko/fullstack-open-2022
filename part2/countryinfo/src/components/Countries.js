import Country from './Country'

const Countries = ({ countries, setFilter }) => {
  if (countries.length > 10) {
    return <div>Too many countries, specify another filter</div>
  }

  if (countries.length === 0) {
    return <div>No matches, specify some other fliter</div>
  }

  if (countries.length >= 1) {
    return countries.map(({ name }) => (
      <div key={name}>
        {name}
        <button onClick={() => setFilter(name)}>show</button>
      </div>
    ))
  }

  return <Country country={countries[0]} />
}

export default Countries
