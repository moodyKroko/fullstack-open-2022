import axios from 'axios'
import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'

const URL = 'https://restcountries.com/v2'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect loaded')
    axios.get(`${URL}/all`).then(({ data }) => {
      setCountries(data)
    })
  }, [])

  const handleNameChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      find countries
      <Filter
        filter={filter}
        handleChange={handleNameChange}
      />
      <br />
      <Countries
        countries={filteredCountries}
        setFilter={setFilter}
      />
    </div>
  )
}

export default App
