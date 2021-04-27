import React, {useEffect, useState} from 'react';

function AddPage() {

    const [schoolName, setSchoolName] = useState("")

    const handleSubmit = e => {
        e.preventDefault();
        let data = {'name': schoolName, 'url': schoolName.replaceAll(/\s/g,'')}
        alert(data.name+", "+data.url)
        
        fetch('https://rmdservice.herokuapp.com/api/schools/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data)
        })
        .catch(error => {
            alert(error)
        })
    }

    const updateSchoolName = e => {
        setSchoolName(e.target.value)
        console.log(schoolName)
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={updateSchoolName}/>
                <input type="submit"/>
            </form>
        </div>  
    )
}

export default AddPage