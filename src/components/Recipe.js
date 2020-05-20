import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddressChange, handleEmailChange, handlePhoneChange, handleSendOrder} from './actions/cartActions';
import Spinner from './Spinner';
import Success from './Success';
import YourOrder from './YourOrder';

class Recipe extends Component {

    handleEmailChange = (e) => {
        //A debouncer could be added so as not to call redux action on every change
        this.props.handleEmailChange(e.target.value);
    }
    
    handleAddressChange = (e) => {
        //A debouncer could be added so as not to call redux action on every change
        this.props.handleAddressChange(e.target.value);
    }
   
    handlePhoneChange = (e) => {
        //A debouncer could be added so as not to call redux action on every change
        this.props.handlePhoneChange(e.target.value);
    }

    handleClick = (e) => {
        if (this.props.validAddress && this.props.validPhone && this.props.validEmail) {
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
                            {
                                this.props.currencyIsDollar ? (
                                    <span>Shipping (+US$ {(Math.round(this.props.finalPrice * 100) / 100).toFixed(2)})</span>
                                ) : (
                                    <span>Shipping (+€ {(Math.round(this.props.finalPrice * 100 * 0.92) / 100).toFixed(2)})</span>
                                )
                            }
                        </label>
                    </li>
                    <YourOrder />
                </div>
                <input 
                    type="email" placeholder="Email"
                    name="email_input"
                    onChange={this.handleEmailChange}
                    value={this.props.email || ''}
                />
                <input 
                    type="tel" placeholder="Phone - (123) 456-7890"
                    name="phone_input"
                    onChange={this.handlePhoneChange}
                    value={this.props.phone || ''}
                />
                <input
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
        error: state.error,
        currencyIsDollar: state.currencyIsDollar,
        phone: state.phone,
        validPhone: state.validPhone
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
        substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) },
        handleEmailChange: (value) => {dispatch(handleEmailChange(value))},
        handleAddressChange: (value) => {dispatch(handleAddressChange(value))},
        handlePhoneChange: (value) => {dispatch(handlePhoneChange(value))},
        handleSendOrder: (url, data) => {dispatch(handleSendOrder(url, data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
