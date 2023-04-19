import axios from 'axios'
import { useState, useEffect } from 'react'

const ShowCountries = ({ countries }) => {
  if (!countries || countries.length===0) { return } 
  
  else if (countries.length === 1) { return <ShowCountryInfo country={countries[0]} /> }

  else if (countries.length > 10 ) { return <p>Too many matches, change filter</p> }
  
  else { //less than 10 but more than 1
    const paragraphStyle = {
      marginTop: 5,
      marginBottom: 5
    }
    return countries.map(country => <p key={country.name.common} style ={paragraphStyle}> {country.name.common}</p>)
  }
}

const ShowCountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Land area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}> {lang} </li>)}
      </ul>

      <h3>Flag:</h3>
        {/*<img src={Object.values(country.flags)[0]} alt={country.flags.alt}/> */}
        <img src={country.flags.png} alt={country.flags.alt}/> {/*error prone because I am not sure that there is always 'png' and 'alt' field. */}
    </div>
    )
  }



function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if(searchQuery === '') {
      setCountries([])
      return
    }
    axios
      .get(`https://restcountries.com/v3.1/name/${searchQuery}`) //I cant somehow get only name.common.
      .then(response => {
        setCountries(response.data)
        //console.log(response.data)
      }).catch(() => setCountries([])) //if error, e.g. no country with such name on the server
  }, [searchQuery])

  const handleSearchQuery = event => {
    setSearchQuery(event.target.value)
  }



  return (
    <div>
      <p>find countries: <input onChange={handleSearchQuery} /></p>
      <ShowCountries countries={countries} />
    </div>
  );
}

export default App;
