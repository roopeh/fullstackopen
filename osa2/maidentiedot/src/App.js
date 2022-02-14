import { useState, useEffect } from 'react'
import axios from 'axios'
import CountrySearch from './components/CountrySearch'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [findValue, setFindValue] = useState('')

  const handleFindChange = (event) => setFindValue(event.target.value)

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data))
  }, [])

  const countryList = findValue.length > 0 ? countries.filter(country => country.name.common.toUpperCase().includes(findValue.toUpperCase())) : countries

  return (
    <div>
      <CountrySearch value={findValue} changeFunction={handleFindChange} />
      <Countries countryList={countryList} searchFunction={setFindValue} />
    </div>
  )
}

export default App;
