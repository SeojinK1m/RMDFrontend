import './App.css';
import School from './School'
import React, { useState, useEffect } from 'react'

function Home() {

  const [schools, setSchools] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  useEffect(()=>{
     getSchools()
  },[query]);

  const getSchools = async () => {
    const response = await (await fetch(`https://rmdservice.herokuapp.com/api/schools/?search=${query}`))
    const data = await response.json()
    setSchools(data.results)
    console.log(schools)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
  }

  return (
      <div className="App">
        <form className="search-form" onSubmit={getSearch}>
          <input type="text" className="search-bar" onChange={updateSearch}/>
          <button type="submit" className="search-button">submit</button>
        </form>
        {schools.map(school => (
          <School 
            name={school.name} 
            url={school.url}
          />
        ))}
      </div>
  );
}

export default Home;
