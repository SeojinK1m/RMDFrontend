const Review = (props) => {

    return (
        <div>
            <h2>{props.numeric_review}</h2>
            <p>{props.comment}</p>
        </div>
    )
}

export default Review