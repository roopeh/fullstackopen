import Country from './Country'

const Countries = ({ countryList, searchFunction }) => {
  if (countryList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countryList.length === 0) {
    return <div>No results!</div>
  }

  return countryList.map(country => <Country key={country.name.common} detailed={countryList.length === 1} searchFunction={searchFunction} country={country} />)
}

export default Countries
