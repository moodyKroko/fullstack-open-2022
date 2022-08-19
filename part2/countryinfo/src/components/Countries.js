import CountryViews from './CountryViews'

const Countries = ({ countries, filterName, onButtonClick }) => {
  const filterCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filterName.toLowerCase())
  )

  if (filterCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filterCountries.length === 1) {
    return <CountryViews country={filterCountries[0]} />
  }

  const displayCountries = () => {
    return filterCountries.map((country) => (
      <div key={country.name}>
        {country.name}
        <button onClick={onButtonClick} country={country.name}>
          show
        </button>
      </div>
    ))
  }

  return <>{displayCountries()}</>
}

export default Countries
