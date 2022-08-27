import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseUrl}/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        console.log('weather data loaded')
        setWeather(response.data)
      })
  }, [city])

  if (!weather) return

  const cityTemp = weather.main.temp
  const iconCode = weather.weather[0].icon

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>temperature {cityTemp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt='Weather icons'
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather
