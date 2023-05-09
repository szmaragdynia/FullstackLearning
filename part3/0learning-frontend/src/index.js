import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

import App from './App';

//const promise = axios.get('http://localhost:3001/notes')
//console.log(promise) //logs "pending" despite in its body logging "fulfilled" and logging data. When using "then", then first line isn't pending but fulfilled
/*promise.then(response => {
  console.log(promise)
})*/

/*axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
  })
*/

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

