import style from '../style/review.module.css'

const Review = (props) => {

    return (
        <div class={style.review}>
            <div class={style.contents}>
                <h2>{props.numeric_review}</h2>
                <p>{props.comment}</p>
            </div>
        </div>
    )
}

export default Review