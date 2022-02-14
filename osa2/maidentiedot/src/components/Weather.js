import { useState, useEffect } from 'react'
import axios from "axios"

const Weather = ({ capitalName, capitalLati, capitalLong }) => {
  const [weatherData, setWeatherData] = useState([])
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    //console.log("loading weather")
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${capitalLati}&lon=${capitalLong}&units=metric&appid=${apiKey}`)
      .then (response => {
        //console.log("downloaded weather")
        setWeatherData(response.data)
      })
  }, [])

  if (weatherData.length === 0) {
    return null
  }

  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

  return (
    <div>
      <h3>Weather in {capitalName}</h3>
      <p>temperature {weatherData.main.temp} Celcius</p>
      <img src={weatherIconUrl} alt='icon for weather' width='120' height='120' />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
