import style from '../style/addbutton.module.css'

const AddButton = (props) => {

    return (
        <button className={style.button} onClick={props.onClick}>
            +
        </button>
    )
}

export default AddButton