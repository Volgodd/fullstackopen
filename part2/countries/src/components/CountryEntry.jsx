import { useState } from 'react'
import axios from 'axios'
import { clearWeatherData } from '../utils/utils'

const apiToken = import.meta.env.VITE_SOME_KEY

const CountryEntry = ({ country }) => {
  const [visible, setVisible] = useState(false)
  const [weather, setWeather] = useState({})

  const latitude = country?.capitalInfo.latlng[0]
  const longitude = country?.capitalInfo.latlng[1]

  const getWeather = () => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather'

    const queryParams = { lat: latitude, lon: longitude, appId: apiToken }
    const formattedQueryParams = new URLSearchParams(queryParams).toString()

    const request = axios.get(`${baseURL}?${formattedQueryParams}`)
    return request
      .then((response) => response.data)
      .then((weatherData) => {
        const formattedWeather = clearWeatherData(weatherData)
        setWeather(formattedWeather)
      })
  }

  const { name, area, capital, flags, languages } = country

  const languagesKeysArray = Object.keys(languages)

  return (
    <>
      <li>{name.common}</li>
      <button
        onClick={() => {
          setVisible(!visible)
          getWeather()
        }}
      >
        show
      </button>

      {visible && (
        <>
          <p>Capital: {capital[0]}</p>
          <p>area: {area}</p>
          <h3>languages</h3>
          <ul>
            {languagesKeysArray.map((key) => {
              const value = languages[key]
              return <li key={key}>{value}</li>
            })}
          </ul>
          <img src={flags.png} alt={flags.alt}></img>
          <button onClick={() => getWeather()}>show weather</button>
          <h3>Weather in Helsinki</h3>
          <p>temperature {weather?.temperature} Celcius</p>
          {weather.weatherImgId && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weatherImgId}@2x.png`}
            ></img>
          )}
          <p> wind {weather?.wind} m/s</p>
        </>
      )}
    </>
  )
}

export default CountryEntry
