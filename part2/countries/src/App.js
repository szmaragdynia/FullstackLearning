import axios from 'axios'
import { useState, useEffect } from 'react'

//todo in future?
//notification component
//more proper handling changing views, instead of passing the setSetCountries through everything 


const HandleCountriesDisplay = ({ countries, setSetCountries }) => {
  if (countries.length===0) { return } 
  
  else if (countries.length === 1) { return <ShowCountryInfo country={countries[0]} /> }

  else if (countries.length > 10 ) { return <p>{`Too many matches (${countries.length}), change filter`}</p> }
  
  else if (countries.length > 1 && countries.length <= 10 ) { return <ShowCountryList countries={countries} setSetCountries={setSetCountries} /> }
  
  else console.log("something is wrong")
}

const ShowCountryEntry = ({ setSetCountries, thisCountry }) => {
  console.log("ShowCountryEntry")
  const paragraphStyle = {
    marginTop: 5,
    marginBottom: 5
  }
  return (
    <div>
    <p style ={paragraphStyle}>
      {thisCountry.name.common}
      <button onClick={()=> setSetCountries([thisCountry])}>show</button>
    </p>
  </div>
  )
}

const ShowCountryList = ({ countries, setSetCountries }) => {
  console.log("ShowCountryList, n of countries:",countries.length)
  return (
    countries.map( (country, i) => <ShowCountryEntry key={i} thisCountry={country} setSetCountries={setSetCountries}/>)
  )
}

const ShowCountryInfo = ({ country }) => {
  console.log("ShowCountryInfo")
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

  const setSetCountries = (param) => {
    setCountries(param)
  }



  return (
    <div>
      <p>find countries: <input onChange={handleSearchQuery} /></p>
      <HandleCountriesDisplay countries={countries} setSetCountries={setSetCountries}/>
    </div>
  );
}

export default App;
