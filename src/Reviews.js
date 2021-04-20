import React, {useState, useEffect} from 'react' 
import Review from './Review'

const Reviews = (props) => {

    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        getReviews()
    }, [])

    const getReviews = async () => {
        const response = await fetch(`https://rmdservice.herokuapp.com/api/reviews/?search=${props.match.params.eateryUrl}`)
        const data = await response.json()
        setReviews(data.results)
    }

    return (
        <div>
            <h1>Reviews for {props.match.params.eateryUrl}</h1>
            {reviews.map(review=>(
                <Review 
                    numeric_review = {review.numeric_review}
                    commetn = {review.comment}
                />
            ))}
        </div>
    )
}

export default Reviews