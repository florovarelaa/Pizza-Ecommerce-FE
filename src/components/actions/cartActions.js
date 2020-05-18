import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    LOAD_DATA_REQUEST,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_ERROR,
    SEND_DATA_REQUEST,
    SEND_DATA_SUCCESS,
    SEND_DATA_ERROR,
    HANDLE_ADDRESS_CHANGE,
    HANDLE_EMAIL_CHANGE,
    SWITCH_CURRENCY
    } from './action-types/cart-actions'
import axios from 'axios';

function load() {
    return { type: LOAD_DATA_REQUEST };
}

function loadSuccess(res) {
    return { type: LOAD_DATA_SUCCESS, payload: res };
}

function loadError(ex) {
    return { type: LOAD_DATA_ERROR, payload: ex };
}

function send() {
    return { type: SEND_DATA_REQUEST };
}

function sendSuccess(res) {
    return { type: SEND_DATA_SUCCESS, payload: res };
}

function sendError(ex) {
    return { type: SEND_DATA_ERROR, payload: ex };
}

export const loadData = (url) => {
    const request = axios.get(url)

    return (dispatch) => {
        dispatch(load());
        request.then((res) => {
            dispatch(loadSuccess(res.data));
        }).catch((ex) => {
            dispatch(loadError(ex));
        });
    };
}

export const handleSendOrder = (url, data) => {
    const request = axios.post(url, data)
    return (dispatch) => {
        dispatch(send());
        // We delay api call to show spinner
        setTimeout(() => {
            request.then(
                (res) => {
                    dispatch(sendSuccess(res.data));
                }).catch((ex) => {
                    dispatch(sendError(ex))
                });
        }, 2000)
    }
}

//add cart action
export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}
//subtract qt action
export const subtractQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

export const handleAddressChange = (value) => {
    return {
        type: HANDLE_ADDRESS_CHANGE,
        value
    }
}

export const handleEmailChange = (value) => {
    return {
        type: HANDLE_EMAIL_CHANGE,
        value
    }
}

export const switchCurrency = () => {
    return {
        type: SWITCH_CURRENCY
    }
}