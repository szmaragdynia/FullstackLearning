import axios from 'axios'
import { useState, useEffect } from 'react'


const Notification = ({ message }) => {
  if (message === null) return null;
  return (
    <p> {message} !!! </p>
  )
}

const ShowCountryInfo = ({ countries }) => {
  if (!countries) {return}

  console.log("countries[0]",countries[0])
  console.log("countries[0].languages[0]",Object.values(countries[0].languages))

  if (countries.length > 10 ) {
    return <p>Too many matches, change filter</p>
  }
  else if (countries.length !== 1) {
    return countries.map(country => <p key={country.name.common}>{country.name.common}</p>)
  }
  else if (countries.length === 1) {  
    return (
    <div>
      <h2>{countries[0].name.common}</h2>
      <p>Capital: {countries[0].capital}</p>
      <p>Land area: {countries[0].area}</p>

      <h3>languages:</h3>
      <ul>
        {/*countries[0].languages.map(language => <li key={language}>{language}</li>)*/}
      </ul>
    </div>
    )
  }

  
}


//w App() input value={value}(state)?


function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    setNotification(null) //on re-render with new search query
    if(searchQuery === '') {
      setCountries([])
      return
    }
    axios
      .get(`https://restcountries.com/v3.1/name/${searchQuery}`) //I cant somehow get only name.common.
      .then(response => {
        setCountries(response.data)
        //console.log(response.data)
        //console.log(`https://restcountries.com/v3.1/name/${searchQuery}?fields=name`)
      }).catch(() => setNotification("No countries with such name/letters")) 
  }, [searchQuery])

  const handleSearchQuery = event => {
    setSearchQuery(event.target.value)
  }


  return (
    <div>
      <Notification message={notification} />
      <p>
        find countries:
        <input onChange={handleSearchQuery} /> 
      </p>
      <ShowCountryInfo countries={countries} />
    </div>
  );
}

export default App;
