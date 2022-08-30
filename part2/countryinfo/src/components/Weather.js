const Weather = ({ city, weather }) => {
  if (weather === null) return null

  const {
    weather: [{ icon: iconCode, description: iconDescription }],
    main: { temp: cityTemp },
    wind: { speed: windSpeed },
  } = weather

  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>temperature {cityTemp} Celcius</div>
      <img
        src={weatherIcon}
        alt={`icon for ${iconDescription}`}
      />
      <div>wind {windSpeed} m/s</div>
    </div>
  )
}

export default Weather
