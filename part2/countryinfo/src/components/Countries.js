import CountryViews from './CountryViews'

const Countries = ({ countries, filterName }) => {
  const filterQuery = countries.filter((country) =>
    country.name.toLowerCase().includes(filterName.toLowerCase())
  )

  if (filterQuery.length >= 10) {
    return <>'Too many matches, specify another filter'</>
  } else if (filterQuery.length === 1) {
    return <CountryViews country={filterQuery[0]} />
  }

  return (
    <>
      {filterQuery.map((country) => (
        <div key={country.name}>{country.name}</div>
      ))}
    </>
  )
}

export default Countries
