const Weather = ({ city, weather }) => {
  if (weather === null) return null

  const cityTemp = weather.main.temp
  const iconCode = weather.weather[0].icon
  const windSpeed = weather.wind.speed
  const weatherDescription = weather.weather[0].description

  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>temperature {cityTemp} Celcius</div>
      <img
        src={weatherIcon}
        alt={`icon for ${weatherDescription}`}
      />
      <div>wind {windSpeed} m/s</div>
    </div>
  )
}

export default Weather
