import {
    ADD_PRODUCT_IN_CART,
    REMOVE_PRODUCTS_FROM_CART,
} from './cart.actionTypes';


export const addProductToCart = (productId, quantity) => dispatch => {
    dispatch({ type: ADD_PRODUCT_IN_CART, payload: { productId, quantity } });
};

export const removeProductsFromCart = productId => dispatch => {
    dispatch({ type: REMOVE_PRODUCTS_FROM_CART, payload: { productId } });
};

