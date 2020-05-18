import React from 'react'
import './CurrencySwitch.css'
import { connect } from 'react-redux'

const YourOrder = props => {
    return (
        props.currencyIsDollar === true ? (
            <div>
                <li className="collection-item"><b>Your Order</b>
                        <ul>
                            {props.addedItems.map(e => {
                                return(<li key={e.id}>
                                    <p>{e.title} ({e.price} U$D) x {e.quantity} = {e.price * e.quantity} U$D</p>
                                </li>)
                            })}
                            {props.finalPrice !== 0 ? <li>Shipping(+{(Math.round(props.finalPrice * 100) / 100).toFixed(2)} U$D)</li> : ''}
                        </ul>
                    </li>
                    <li className="collection-item"><b>Total: {props.total + props.finalPrice} U$D</b></li>
            </div>
        ) : (
            <div>
                <li className="collection-item"><b>Your Order</b>
                        <ul>
                            {props.addedItems.map(e => {
                                return(<li key={e.id}>
                                    <p>{e.title} ({(e.price * 0.92).toFixed(2)} €) x {e.quantity} = {(e.price * e.quantity * 0.92).toFixed(2)} €</p>
                                </li>)
                            })}
                            {props.finalPrice !== 0 ? <li>Shipping(+{(Math.round(props.finalPrice * 100) / 100 * 0.92).toFixed(2)} €)</li> : ''}
                        </ul>
                    </li>
                    <li className="collection-item"><b>Total: {((props.total + props.finalPrice * 0.92)).toFixed(2)} €</b></li>
            </div>
        )
    )
}

const mapStateToProps = state => {
    return {
        currencyIsDollar: state.currencyIsDollar,
        addedItems: state.addedItems,
        finalPrice: state.finalPrice,
        total: state.total
    }
}

export default connect(mapStateToProps)(YourOrder)