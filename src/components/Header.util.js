import _find from 'lodash/find';


export const getCartItemsSelector = (products, cartData) => {
    const cartItems = [];
    Object.keys(cartData).forEach( key => {
        const foundProduct = _find( products, {SKU: +key});
        if (foundProduct) {
            const item = {
                ...foundProduct,
                quantity: cartData[key],
            };
            cartItems.push(item);
        }
    });

    return cartItems;
};

export const getCartItemsCountSelector = ( cartItemsReducer ) => {
    return Object.keys(cartItemsReducer).length;
};