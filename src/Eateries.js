import './App.css';
import React from 'react';
import './App.css'

function Eateries(props) {

  return (
    <div className="App">
        <h1>{props.match.params.schoolUrl} page</h1>
    </div>
  );
}

export default Eateries;
