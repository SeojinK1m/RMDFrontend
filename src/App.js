import './App.css';
import School from './School'
import { useState, useEffect } from 'react';

function App() {

  const [schools, setSchools] = useState([])
  const [windowWidth, setWindowWidth] = useState(0)

  const getWindowWidth = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }

  const getSchools = async () => {
    const response = await (await fetch(`https://rmdservice.herokuapp.com/api/schools`)).json()
    const data = await response.results
    setSchools(data)

  }

  useEffect(()=>{
    getWindowWidth()
    window.addEventListener("resize", getWindowWidth)
    return () => {
      window.removeEventListener("resize", getWindowWidth)
    }
  },[])

  useEffect(()=>{
    getSchools()
  },[])

  return (
    
    <div className="App">
      <form className="search-form">
        <input type="text" className="search-bar"/>
        <button type="submit" className="search-button">submit</button>
      </form>
      {schools.map(school => (
        <School 
          name={school.name} 
          url={school.url}
          windowSize={windowWidth}
        />
      ))}
    </div>
  );
}

export default App;
