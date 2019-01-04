import {
    ADD_PRODUCT_IN_CART,
    REMOVE_PRODUCTS_FROM_CART,
} from './cart.actionTypes';
import _cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE = {};

export default function ( state = INITIAL_STATE, action ) {
    switch (action.type) {
        case ADD_PRODUCT_IN_CART:
            return addProductQuantity(state, action.payload.productId, action.payload.quantity);

        case REMOVE_PRODUCTS_FROM_CART:
            return removedProducts(state, action.payload.productId);

        default:
            return state;

    }
}


const addProductQuantity = (state, productId, quantity) => {
    const newState = _cloneDeep(state);

    if (newState[productId]) {
        newState[productId] += quantity;
    } else {
        newState[productId] = quantity;
    }

    return newState;
};

const removedProducts = (state, productId) => {
    const newState = _cloneDeep(state);

    if (newState[productId]) {
        delete newState[productId];
    }

    return newState;
};
