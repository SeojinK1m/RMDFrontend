import React, {useCallback} from 'react'
import style from '../style/school.module.css'

function School(props) {

    return(
        <a className={style.School} onClick={props.onClick}>
            <h1>{props.name}</h1>
        </a>
    )
}

export default School