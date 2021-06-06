import React, {useEffect, useState} from 'react';
import style from '../style/form.module.css'
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';

function AddRestaurant(props) {

    const [addDin, setAddDin] = useState(true)
    const [eateryName, setEateryName] = useState('')
    const [addReview, setAddReview] = useState(false)
    const [reviewComment, setReviewComment] = useState('')
    const [numericReview, setNumericReview] = useState(0)
    const [schoolID, setSchoolID] = useState(0)


    const handleSubmit = async (e) => {
        e.preventDefault()

        let eatery = {'name': eateryName, 'url': eateryName.replaceAll(/\s/g,''), 'eatery_type': addDin ? "din" : "res", 'school' : schoolID}
        let review = {'comment': reviewComment, 'numeric_review': numericReview, 'eatery': 0}

        const response = await fetch('https://rmdservice.herokuapp.com/api/eateries/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eatery)
        })
        const data = await response.json()
        review.eatery = data.id

        const reviewResponse = await fetch('https://rmdservice.herokuapp.com/api/reviews/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
    }

    useEffect(() => {
        getSchoolID()
    })

    const getSchoolID = async () => {
        const response = await fetch('https://rmdservice.herokuapp.com/api/schools/?search='+props.match.params.schoolUrl)
        const data = await response.json()
        const results = await data.results
        setSchoolID(results[0].id)
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

    return (
        <div className="App">
            {props.match.params.schoolUrl}
            <form onSubmit={handleSubmit} class={style.form}>
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
                {addReview &&
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

export default AddRestaurant