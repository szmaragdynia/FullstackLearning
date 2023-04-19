import axios from 'axios'
import { useState, useEffect } from 'react'

const openweathermap_api_key = process.env.REACT_APP_API_KEY
//BEWARE, API IS STILL EMBEDED INTO FILES. SHOULD I EVER HOST THIS WEBSITE, THE API WILL BE EXPOSED


//todo in future?
//mądrzejsze przekazywanie stanów niz setSetCountries?
//notification component - moge zrobic notification ktore bedzie zeminiac stan, tlyko ono musi wywolywac funkcje ktora jest w App()
//more proper handling changing views, instead of passing the setSetCountries through everything 
//alfabetycznie
//cos zlego w inicjianowaniu stanu za pomoca pustej tablicy?
//alt dpdac 



const HandleDisplay = ({ countries, setSetCountries }) => {
  if (countries.length===0) { return } 
  else if (countries.length === 1) { return <ShowCountryInfo country={countries[0]} /> }
  else if (countries.length > 10 ) { return <p>{`Too many matches (${countries.length}), change filter`}</p> }
  else if (countries.length > 1 && countries.length <= 10 ) { return <ShowListOfCountries countries={countries} setSetCountries={setSetCountries} /> }
  else console.log("something is wrong")
}

const ShowEntryInList = ({ setSetCountries, thisCountry }) => {
  console.log("ShowEntryInList")
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

const ShowListOfCountries = ({ countries, setSetCountries }) => {
  console.log("ShowListOfCountries, n of countries:",countries.length)
  return (
    countries.map( (country, i) => <ShowEntryInList key={i} thisCountry={country} setSetCountries={setSetCountries}/>)
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
      
      <h3>Weather in {country.capital}</h3>
        <RenderWeather where={country.capital} />
    </div>
    )
  }

const RenderWeather = ({ where }) => {
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);


  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${where}&units=metric&limit=1&appid=${openweathermap_api_key}`)
      .then(response => {
        setTemperature(response.data.main.temp)
        setWind(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
        console.log(response.data.weather[0].icon)
      })
    }, [])

  return (
    <div>
      <p> Temperature: {temperature} {'\u00B0'}C </p> 
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p> Wind: {wind} m/s</p> 
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
      <HandleDisplay countries={countries} setSetCountries={setSetCountries}/>
    </div>
  );
}

export default App;
