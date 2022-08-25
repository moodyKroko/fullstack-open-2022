import axios from 'axios'
import React, { useEffect, useState } from 'react'

/**
 * weather API respons >
 * get current.temp, current.wind_speed, current.weather[0].id, current.weather[0].icon
 * https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
 */
const baseUrl = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseUrl}/weather?q=${city}&appid=${API_KEY}`)
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.status)
          console.log(error.response.data.message)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
      })
  }, [city])

  return (
    <>
      <h2>Weather in Helsinki</h2>
      <p>{city}</p>
      temperature
    </>
  )
}

export default Weather
