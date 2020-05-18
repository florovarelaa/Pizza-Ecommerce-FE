import React, { Component } from 'react'
import './CurrencySwitch.css'
import { connect } from 'react-redux'
import { switchCurrency } from './actions/cartActions'

class CurrencySwitch extends Component {
    handleChange = () => {
        this.props.switchCurrency();
    }

    render() {
        return (
            <div className="switch">
                <label>
                        US$
                    <input type="checkbox" checked={!this.props.currencyIsDollar} onChange={this.handleChange} />
                    <span className="lever"></span>
                        €
                    </label>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currencyIsDollar: state.currencyIsDollar
    }
}

const mapDispatchToProps = (dispatch)=>{
    
    return{
        switchCurrency: () => {dispatch(switchCurrency())},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrencySwitch)