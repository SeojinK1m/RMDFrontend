import React, {useEffect, useState} from 'react';
import style from '../style/form.module.css'
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                <table>
                    <tr>
                        <td></td>
                    </tr>
                </table>
                <div class={style.input}>
                    <TextField variant="standard" label="School Name" onChange={updateSchoolName} fullWidth={true}/>
                    <p>
                        Add dining-hall or restaurant?
                        <Switch onChange={updateAddEatery}/>
                    </p>
                </div>
                
                
                {addEatery && 
                    <div class={style.input}>
                        <div>
                            Type: 
                            <input type="radio" value="din" class={style.radio} id="din" onChange={updateRadio} checked={addDin}/> Dining Hall
                            <input type="radio" value="res" class={style.radio} id="res" onChange={updateRadio} checked={!addDin}/> Restaurant
                        </div>
                        
                        {addDin &&
                            <TextField variant="standard" label="Dining Hall Name" onChange={updateEateryName} fullWidth={true}/>
                        }
                        {!addDin &&
                            <TextField variant="standard" label="Restaurant Name" onChange={updateEateryName} fullWidth={true}/>
                        }
                        <p>
                            Add review for {addDin ? "Dining Hall" : "Restaurant"}?
                            <Switch
                                onChange={updateAddReview}
                            />
                        </p>
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
                        <textarea onChange={updateReviewComment} cols="40" rows="10" class={style.textarea}/>
                    </div>
                }
                <div class={style.submitButton}>
                    <Button variant="outlined" color="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>  
    )
}

export default AddPage