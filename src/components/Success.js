import React from 'react'
import './success.css'

//Credits to
//https://codepen.io/solomonkitumba/pen/rNNYWxE
//For making this spinner

function Spinner() {
    return (
        <div className="success-checkmark">
            <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
            </div>
        </div>
    )
}

export default Spinner;