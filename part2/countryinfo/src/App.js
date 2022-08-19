import axios from 'axios'
import { useEffect, useState } from 'react'

const URL = 'https://restcountries.com/v2'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect loaded')
    axios.get(`${URL}/all`).then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleOnNameChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filterQuery = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  const specificResults =
    filterQuery.length >= 10
      ? 'Too many matches, specify another filter'
      : filterQuery.map((country) => (
          <div key={country.name}>{country.name}</div>
        ))

  const countryInfo = (country) => {
    return (
      <div>
        <h1>{country.name} </h1>
        capital {country.capital}
        <br />
        area {country.area}
        <h3>languages:</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          src={country.flag}
          alt='flag'
          style={{ width: '200px', height: '200px' }}
        />
      </div>
    )
  }

  const searchResult =
    specificResults.length === 1 ? countryInfo(filterQuery[0]) : specificResults

  return (
    <div>
      find countries
      <input type='search' value={filter} onChange={handleOnNameChange} />
      <br />
      {searchResult}
    </div>
  )
}

export default App
