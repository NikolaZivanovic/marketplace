import {
    USER_SHIPPING_INFO,
} from './shipping.actionTypes';

const INITIAL_STATE = {};

export default function ( state = INITIAL_STATE, action ) {
    switch (action.type) {
        case USER_SHIPPING_INFO:
            return  {
                ...state,
                data: action.payload.shippingInfo,
            };

        default:
            return state;

    }
}


