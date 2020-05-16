import React from 'react'
import './spinner.css'

//Credits to
//https://codepen.io/jhagenbeck/pen/ZLgxGv?__cf_chl_jschl_tk__=4b5bc43d318a9e72d0cb4b1af7d78197658b08ed-1589524112-0-AaMyzB6LtOWqMQCNIMzFpic_GVOe7KT7ViuumxMmMmtV-Vc2vtNYYCPKlGYbBEaDMLh8OiVRhHS3FRQ1WqB5g5dTezsQg2IBn588g6171kH81UeptHq6b0_KxRoUWcRoQEQ-z0Hcsf-LLjinoI9eAmFzE7g2z9CFnKWdzptx86bWS3G6sDiAha_QnKmmaKkxYfffCvgyxu2By_izBjb7V1u9lMe1UbRT045IDHSFa8MqJHgyG0n5ndocmAktMBOvxfofREefOHX1rszRa_9Cw3MehDf6BCSvH5vnbW-b2CQ3alQOlQtD4_QoO19OinzSkR5LFWmZ4qcf0Sy97UmbPzEuUc7gly4UgDuVNciAv46m
//For making this spinner

function Spinner() {
    return (
        <div className='spinner'>

            <div className='pizza'>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
                <div className='slice'></div>
            </div>
        </div>
    )
}

export default Spinner;