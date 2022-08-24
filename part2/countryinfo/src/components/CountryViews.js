const CountryViews = ({ country }) => {
  return (
    <div>
      <h1>{country.name} </h1>
      capital {country.capital}
      <br />
      area {country.area}
      <h3>languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt='flag'
        style={{ width: '150px', height: '100px' }}
      />
    </div>
  )
}

export default CountryViews
