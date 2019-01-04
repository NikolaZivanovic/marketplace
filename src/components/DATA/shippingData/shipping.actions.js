import {
    USER_SHIPPING_INFO,
} from './shipping.actionTypes';


export const shippingInfo = (shippingInfo) => dispatch => {
    dispatch({ type: USER_SHIPPING_INFO, payload: { shippingInfo } });
};
