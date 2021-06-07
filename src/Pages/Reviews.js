import React, {useState, useEffect} from 'react' 
import Review from '../Components/Review'

const Reviews = (props) => {

    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        getReviews()
    }, [])
    const getReviews = async () => {
        const response = await fetch(`https://rmdservice.herokuapp.com/api/reviews/?search=${props.match.params.eateryName}`)
        const data = await response.json()
        setReviews(data.results)
    }

    return (
        <div className="App">
            <h1>Reviews for {props.match.params.eateryName}</h1>
            {reviews.map(review=>(
                <Review 
                    numeric_review = {review.numeric_review}
                    comment = {review.comment}
                    eatery = {review.eatery}
                />
            ))}
        </div>
    )
}

export default Reviews