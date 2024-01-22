import { useEffect, useState } from "react";
import axios from 'axios';

const Display = ({ text }) => {

  if (text === null) {
    return null
  }

  return (<p>{text}</p>)
}

const Info = ({ props }) => {
  if (props === null) {
    return null
  }

  return (
    <>
      <h2>{props.name.common}</h2>
      <p>capital {props.capital}</p>
      <p>area {props.area}</p>
      <h3>languages</h3>
      <ul>

        {Object.keys(props.languages).map(
          i => {
            return <li>{props.languages[i]}</li>
          }
        )}

      </ul>
      <img src={props.flags.png} alt={`flag of ${props.name.common}`} width={150} height={150}/>
    </>
  )
}


const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [newList, setNewList] = useState([])
  const [text, setText] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (newList) {
      console.log('fetching countries...');
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          console.log(response.data);
          setNewList(response.data)

        })
    }
  }, [])

  const handleSearch = (event) => {

    console.log(`Searching with value ${event.target.value}`);
    setNewSearch(event.target.value)
    const hlp = newList.filter(c => {
      return c.name.common.toLowerCase().includes(event.target.value.toLowerCase()) === true
    })

    console.log("Hlp length: ", hlp.length);

    if (hlp.length > 10 && event.target.value != '') {
      setText('Too many matches, specify another filter')
    } else {
      setText(null)
    }

    if (hlp.length === 1) {
      const hlp2 = hlp[0]
      console.log(hlp2);
      setCountry(hlp2)
    } else {
      setCountry(null)
    }

  }

  let listToShow = newSearch === '' ? [] : newList.filter(c => {
    return c.name.common.toLowerCase().includes(newSearch.toLowerCase()) === true
  })


  listToShow = (listToShow.length > 10 || listToShow.length === 1) ? [] : listToShow

  return (
    <div>

      <p>find countries <input value={newSearch} onChange={handleSearch} /> </p>

      <Display text={text} />

      <Info props={country} />

      {

        listToShow.map(
          (c, i) => {
            return <p key={i}>{c.name.common}</p>
          }
        )

      }

    </div>
  )
}

export default App