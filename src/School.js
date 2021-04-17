import React from 'react'
import style from './school.module.css'

function School(props) {

    return(
        <a className={style.School} href={props.url}>
            <h1>{props.name}</h1>
        </a>
    )
}

export default School