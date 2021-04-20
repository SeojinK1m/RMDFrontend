import './App.css';
import React from 'react';
import style from './eatery.module.css'

function Eatery(props) {

  return (
    <a className={style.Eatery} onClick={props.onClick}>
        <h1>{props.name}</h1>
    </a>
  );
}

export default Eatery;