import '../style/App.css';
import School from '../Components/School'
import React, { useState, useEffect } from 'react'
import AddButton from '../Components/AddButton'

function Home(props) {

  const { history } = props

  const [schools, setSchools] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  useEffect(()=>{
     getSchools()
  },[query]);

  const getSchools = async () => {
    const response = await fetch(`https://rmdservice.herokuapp.com/api/schools/?search=${query}`)
    const data = await response.json()
    setSchools(data.results)
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
            history={history} 
            name={school.name} 
            url={school.url}
            onClick={()=>history.push(school.url)}
          />
        ))}
        <AddButton onClick={()=>history.push('add')}/>
      </div>
  );
}

export default Home;
