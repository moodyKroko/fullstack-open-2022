import axios from 'axios'
import { useEffect, useState } from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const { languages, capital, name, area, flag } = country

  useEffect(() => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5'
    const API_KEY = process.env.REACT_APP_API_KEY

    axios
      .get(`${baseUrl}/weather?q=${capital}&appid=${API_KEY}&units=metric`)
      .then(({ data }) => {
        console.log('weather data loaded')
        setWeather(data)
      })
  }, [capital])
  return (
    <div>
      <h2>{name} </h2>
      <div>capital {capital}</div>
      <div>area {area}</div>

      <h4>languages:</h4>
      <ul>
        {languages.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <img
        src={flag}
        alt={`Flag of ${name}`}
        width={150}
      />
      <Weather
        city={capital}
        weather={weather}
      />
    </div>
  )
}

export default Country
