import React, {useEffect, useState} from 'react';
import style from './form.module.css'
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';

function AddPage() {

    const [schoolName, setSchoolName] = useState("")
    const [addEatery, setAddEatery] = useState(false)
    const [addDin, setAddDin] = useState(true)
    const [eateryName, setEateryName] = useState('')
    const [addReview, setAddReview] = useState(false)
    const [reviewComment, setReviewComment] = useState('')
    const [numericReview, setNumericReview] = useState(0)

    const handleSubmit = e => {

        e.preventDefault();
        let school = {'name': schoolName, 'url': schoolName.replaceAll(/\s/g,'')}
        let eatery = {'name': eateryName, 'url': eateryName.replaceAll(/\s/g,''), 'eatery_type': addDin ? "din" : "res", 'school' : 0}
        let review = {'comment': reviewComment, 'numeric_review': numericReview, 'eatery': 0}

        fetch('https://rmdservice.herokuapp.com/api/schools/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(school)
        })
        .then(response=>response.json())
        .then(data=>{
            eatery.school = data.id
            if(addEatery) {
                fetch('https://rmdservice.herokuapp.com/api/eateries/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eatery)
                })
                .then(response=>response.json())
                .then(data=>{
                    review.eatery = data.id
                    if(addReview) {
                        fetch('https://rmdservice.herokuapp.com/api/reviews/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(review)
                        })
                    }
                })
            }
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
        console.log(eateryName)
    }

    const updateRadio = e => {
        setAddDin(!addDin)
    }

    const updateAddReview = e => {
        setAddReview(!addReview)
    }

    const updateReviewComment = e => {
        setReviewComment(e.target.value)
    }

    const updateNumericReview = (e, val) => {
        e.target.value = val
        setNumericReview(val)
        console.log(val)
    }

    const value = (value) => {
        return value
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
                            <input type="text" onChange={updateEateryName} class={style.input} defaultValue="Dining hall name"/>
                        }
                        {!addDin &&
                            <input type="text" onChange={updateEateryName} class={style.input} defaultValue="Restaurant name"/>
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
                            id="reviewSlider"
                            valueLabelDisplay="auto"
                            marks={true}
                            min={1}
                            max={5}
                            step={1}
                            defaultValue={3}
                            onChange={updateNumericReview}
                        />
                        <p>Tell Us More About Your Experiences!</p>
                        <textarea onChange={updateReviewComment}/>
                    </div>
                }
                <input type="submit" class={style.input}/>
            </form>
        </div>  
    )
}

export default AddPage