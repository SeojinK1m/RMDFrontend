import Chart from 'chart.js/auto';
import React, {useEffect} from 'react'
import style from '../style/school.module.css'

function School(props) {

    useEffect(() => {
        const data = {
            labels: [
              'Good',
              'Bad',
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [50, 100],
              backgroundColor: [
                'rgb(255,0,0)',
                'rgb(0, 200, 0)',
              ],
              hoverOffset: 4
            }]
          };
        const options = {
            plugins: {
                legend: {
                    display: false
                },
            }   
        }
        const config = {
            type: 'doughnut',
            data: data,
            options: options
        };

        const ctx = document.getElementById(props.name)
        const myChart = new Chart(ctx, config)
    })

    return(
        <a className={style.School} onClick={props.onClick}>
            <table className={style.table}>
                <tr className={style.row}><h1>{props.name}</h1></tr>
                <tr><canvas id={props.name} className={style.Chart}></canvas></tr>
            </table>
            
            
        </a>
    )
}

export default School