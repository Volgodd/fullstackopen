import CountryEntry from './CountryEntry'

const SearchOutput = ({ data, searchQuery }) => {
  const filteredCountriesArray = data.filter((item) => {
    return item.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (searchQuery.length === 0) {
    return null
  }

  if (filteredCountriesArray.length > 10) {
    return <div> Too many matches, specify another filter</div>
  }

  return (
    <ul>
      {filteredCountriesArray.map((item) => {
        return <CountryEntry key={item.cca2} country={item} />
      })}
    </ul>
  )
}

export default SearchOutput
