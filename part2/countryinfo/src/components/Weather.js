import axios from 'axios'
import React, { useEffect, useState } from 'react'

/**
 * weather API respons >
 * get current.temp, current.wind_speed, current.weather[0].id, current.weather[0].icon
 * https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
 */
const API_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({ city }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`${API_URL}/weather?q=${city}&appid=${API_KEY}`)
      .then((response) => {
        setWeather(response.data)
      })
  }, [city])

  return (
    <>
      <h2>Weather in Helsinki</h2>
      <p>{city}</p>
      {weather}
    </>
  )
}

export default Weather
