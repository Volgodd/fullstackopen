import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchOutput from './components/SearchOutput'

const getAll = () => {
  const request = axios.get(
    'https://studies.cs.helsinki.fi/restcountries//api/all'
  )
  return request.then((response) => response.data)
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    getAll().then((countryLIst) => {
      setAllCountries(countryLIst)
    })
  }, [])

  return (
    <>
      <p>find countries</p>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <SearchOutput data={allCountries} searchQuery={searchQuery} />
    </>
  )
}

export default App
