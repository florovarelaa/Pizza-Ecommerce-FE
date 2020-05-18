import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddressChange, handleEmailChange, handleSendOrder} from './actions/cartActions';
import Spinner from './Spinner';
import Success from './Success';

class Recipe extends Component {

    handleEmailChange = (e) => {
        //A debouncer could be added so as not to call redux action on every change
        this.props.handleEmailChange(e.target.value);
    }
    
    handleAddressChange = (e) => {
        //A debouncer could be added so as not to call redux action on every change
        this.props.handleAddressChange(e.target.value);
    }

    handleClick = (e) => {
        if (this.props.finalPrice > 0 && this.props.validAddress && this.props.validEmail) {
            let data = {
                products: this.props.addedItems,
                ship_address: this.props.address,
                email: this.props.email
            }
            this.props.handleSendOrder(`${this.props.apiUrl}cartorder`, data);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                        <label>
                            <span>Shipping(+{(Math.round(this.props.finalPrice * 100) / 100).toFixed(2)} US$)</span>
                            <span>(+{(Math.round(this.props.finalPrice * 100 * 0.92) / 100).toFixed(2)} Euros)</span>
                        </label>
                    </li>
                    <li className="collection-item"><b>Your Order</b>
                        <ul>
                            {this.props.addedItems.map(e => {
                                return(<li>
                                    <p>{e.title} ({e.price}$) x {e.quantity} = {e.price * e.quantity}$</p>
                                </li>)
                            })}
                            {this.props.finalPrice !== 0 ? <li>Shipping(+{(Math.round(this.props.finalPrice * 100) / 100).toFixed(2)} US$)</li> : ''}
                        </ul>
                    </li>
                    <li className="collection-item"><b>Total: {this.props.total + this.props.finalPrice} US$</b></li>
                    <li className="collection-item"><b>Total: {((this.props.total + this.props.finalPrice * 0.92)).toFixed(2)} Euros</b></li>
                </div>
                <input 
                    // className={this.props.validEmail ? "collection-item" : "collection-item error"} 
                    type="email" placeholder="Email"
                    name="email_input"
                    onChange={this.handleEmailChange}
                    value={this.props.email || ''}
                />
                <input
                    // className={this.props.validAddress ? "collection-item" : "collection-item error"}
                    type="text"
                    placeholder="Address - StreetName 1234"
                    name="address_input"
                    onChange={this.handleAddressChange}
                    value={this.props.address || ''}
                />
                {/* </div> */}
                <div className="checkout">
                    <button className="waves-effect waves-light btn" onClick={this.handleClick}>Send Order</button>
                    {!this.props.error ?
                        (
                        <div>Add items to cart, complete Address and Email fields before sending order</div>
                        ) : ''
                    }
                    
                    <div className="center-spinner">
                        {this.props.loading ? <Spinner /> : ''}
                    </div>
                    {this.props.success ? <Success /> : ''}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total,
        finalPrice: state.finalPrice,
        fields: state.fields,
        address: state.address,
        validAddress: state.validAddress,
        email: state.email,
        validEmail: state.validEmail,
        loading: state.loading,
        apiUrl: state.apiUrl,
        success: state.success,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
        substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) },
        handleEmailChange: (value) => {dispatch(handleEmailChange(value))},
        handleAddressChange: (value) => {dispatch(handleAddressChange(value))},
        handleSendOrder: (url, data) => {dispatch(handleSendOrder(url, data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
