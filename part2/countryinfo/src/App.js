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
    axios.get(`${URL}/all`).then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setFilter(event.target.value)
  }

  const handleButtonClick = (event) => {
    setFilter(event.target.attributes.country.value)
  }

  return (
    <div>
      find countries
      <Filter filter={filter} handleChange={handleNameChange} />
      <br />
      <Countries
        countries={countries}
        filterName={filter}
        onButtonClick={handleButtonClick}
      />
    </div>
  )
}

export default App
