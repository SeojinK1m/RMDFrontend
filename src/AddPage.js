import React, {useEffect, useState} from 'react';
import style from './form.module.css'
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import { StylesProvider } from '@material-ui/styles';

function AddPage() {

    const [schoolName, setSchoolName] = useState("")
    const [addEatery, setAddEatery] = useState(false)
    const [addDin, setAddDin] = useState(true)
    const [eateryName, setEateryName] = useState('')
    const [addReview, setAddReview] = useState(false)

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

    const updateAddEatery = () =>  {
        setAddEatery(!addEatery)
        if(!addEatery) {
            setAddReview(false)
        }
        console.log(addEatery)
    }

    const updateSchoolName = e => {
        setSchoolName(e.target.value)
        console.log(schoolName)
    }

    const updateEateryName= e => {
        setEateryName(e.target.value)
    }

    const updateRadio = e => {
        setAddDin(!addDin)
    }

    const updateAddReview = () => {
        setAddReview(!addReview)
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit} class={style.form}>
                School Name <input type="text" onChange={updateSchoolName} class={style.input} />
                Add dining-hall or restaurant?
                <Switch
                    onChange={updateAddEatery}
                />
                {addEatery && 
                    <div class={style.input}>
                        <input type="radio" value="din" class={style.radio} id="din" onChange={updateRadio} checked={addDin}/> Dining Hall
                        <input type="radio" value="res" class={style.radio} id="res" onChange={updateRadio} checked={!addDin}/> Restaurant
                        {addDin &&
                            <input type="text" onChange={updateSchoolName} class={style.input} defaultValue="Dining hall name"/>
                        }
                        {!addDin &&
                            <input type="text" onChange={updateSchoolName} class={style.input} defaultValue="Restaurant name"/>
                        }
                        Add review for {addDin ? "Dining Hall" : "Restaurant"}?
                        <Switch
                            onChange={updateAddReview}
                        />
                    </div>
                }
                {addReview && addEatery &&
                    <div class={style.slider}>
                        <Slider
                            valueLabelDisplay="auto"
                            marks={true}
                            min={1}
                            max={5}
                            step={1}
                            defaultValue={3}
                        />
                        <textarea/>
                    </div>
                }
                <input type="submit" class={style.input}/>
            </form>
        </div>  
    )
}

export default AddPage