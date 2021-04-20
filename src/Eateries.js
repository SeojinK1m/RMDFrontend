import './App.css';
import React, {useEffect, useState} from 'react';
import Eatery from './Eatery'

function Eateries(props) {

    const { history } = props
    console.log(props)

    const [eateries, setEateries] = useState([])
    const [schoolName, setSchoolName] = useState('')
    const [schoolUrl, setSchoolUrl] = useState('')

    useEffect(()=>{
        getEateries()
    }, [])

    const getEateries = async () => {
        const response = await fetch(`https://rmdservice.herokuapp.com/api/schools/?search=${props.match.params.schoolUrl}`)
        const data = await response.json()
        const results = await data.results

        let id = 0;

        for(let i=0; i<results.length; i++) {
            if(results[i].url === props.match.params.schoolUrl) {
                setSchoolName(data.results[i].name)
                setSchoolUrl(data.results[i].url)
                id = await data.results[i].id
                break;
            }
        }
        
        const eResponse = await fetch(`https://rmdservice.herokuapp.com/api/eateries/?search=${id}`)
        const eData = await eResponse.json()
        setEateries(eData.results)
    }

  return (
    <div className="App">
        <h1>{schoolName}</h1>

        {eateries.map(eatery=>(
            <Eatery 
                name={eatery.name}
                url={eatery.url}
                schoolUrl={schoolUrl}
                onClick={()=>history.push(schoolUrl+"/"+eatery.url)}
            />
        ))}
    </div>
  );
}

export default Eateries;
