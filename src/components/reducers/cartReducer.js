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
    HANDLE_EMAIL_CHANGE 
    } from '../actions/action-types/cart-actions'


const initState = {
    addedItems:[],
    total: 0,
    finalPrice: 0,
    loading: false,
    sending: false,
    items: [],
    apiUrl: 'https://calm-eyrie-20363.herokuapp.com'
}

const SHIPPING = 0.1;


const cartReducer= (state = initState, action) => {
    
    switch (action.type) {

        //Loading products from the api
        case LOAD_DATA_REQUEST: {
                return {
                    ...state,
                    loading: true,
                    success: false
                }
            }
        case LOAD_DATA_SUCCESS: {
                let items = action.payload.map( element => {
                    return {
                        id: element.id_product,
                        title: element.product_name,
                        desc: element.description,
                        price:element.unit_price,
                        img: element.product_imgUrl
                    }
                })

                return {
                    ...state,
                    loading: false,
                    items: items,
                };
            }
        case LOAD_DATA_ERROR:{
            return{
                ...state,
                error: 'Error when loading products'
            } 
        }

        //Loading products from the api
        case SEND_DATA_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case SEND_DATA_SUCCESS: {
            return {
                ...state,
                addedItems:[],
                total: 0,
                finalPrice: 0,
                loading: false,
                success: true,
            };
        }
        case SEND_DATA_ERROR:{
            return{
                ...state,
                loading: false,
                error: 'Error when sending order'
            } 
        }

        //INSIDE HOME COMPONENT
        case ADD_TO_CART: {
            let addedItem = state.items.find(item=> item.id === action.id)
            //check if the action id exists in the addedItems
            let existed_item= state.addedItems.find(item=> action.id === item.id)
            if(existed_item)
            {
                addedItem.quantity += 1
                let newTotal = state.total + addedItem.price 

                return{
                    ...state,
                    total: newTotal,
                    finalPrice: newTotal * SHIPPING
                    }
            }
            else{
                addedItem.quantity = 1;
                //calculating the total
                let newTotal = state.total + addedItem.price 
                
                return{
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total : newTotal,
                    finalPrice: newTotal * SHIPPING,
                }
                
            }
        }
        case REMOVE_ITEM: {
            let itemToRemove= state.addedItems.find(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)
            
            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            let newFinalPrice = newTotal * SHIPPING; 
            return{
                ...state,
                addedItems: new_items,
                total: newTotal,
                finalPrice: newFinalPrice,
            }
        }
        //INSIDE CART COMPONENT
        case ADD_QUANTITY: {
            let addedItem = state.items.find(item=> item.id === action.id)
            addedItem.quantity += 1 
            let newTotal = state.total + addedItem.price
            return{
                ...state,
                total: newTotal,
                finalPrice: newTotal * SHIPPING
            }
        }
        case SUB_QUANTITY: {  
            let addedItem = state.items.find(item=> item.id === action.id) 
            //if the qt == 0 then no changes should be made
            if(addedItem.quantity === 0){
                return{
                    ...state,
                }
            }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return{
                    ...state,
                    total: newTotal,
                    finalPrice: newTotal * SHIPPING
                }
            }
            
        }

        case HANDLE_EMAIL_CHANGE: {
            let regex = /\S+@\S+\.\S+/;
            let validEmail = regex.test(action.value);
            return {
                ...state,
                email: action.value,
                validEmail: validEmail,
                error: validEmail && state.validAddress && state.addedItems.length > 0
            }
        }
        
        case HANDLE_ADDRESS_CHANGE: {
            let regex = /([a-zA-Z]){2,40}\s{1}\d{1,5}/;
            let validAddress = regex.test(action.value);
            return {
                ...state,
                address: action.value,
                validAddress: validAddress,
                error: validAddress && state.validEmail && state.addedItems.length > 0
            }
        }

        default: {
            return state
        }
    }
}

export default cartReducer;
