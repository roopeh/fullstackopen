import Weather from './Weather'

const Country = ({ detailed, country, searchFunction }) => {
  if (!detailed) {
    return <div>{country.name.common}<button onClick={() => searchFunction(country.name.common)}>show</button></div>
  }

  const [capitalLati, capitalLong] = country.capitalInfo.latlng

  // Show detailed info of the country
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital[0]} <br />
        area {country.area}
      </p>
      <h4><b>languages:</b></h4>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt='icon for country flag' width='150' /><br />
      <Weather capitalName={country.capital[0]} capitalLati={capitalLati} capitalLong={capitalLong} />
    </div>
  )
}

export default Country
