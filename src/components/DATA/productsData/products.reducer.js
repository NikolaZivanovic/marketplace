import {
    FETCHING_PRODUCTS_IN_PROGRESS,
    FETCHING_PRODUCTS_SUCCESS,
    FETCHING_PRODUCTS_ERROR,
} from './products.actionTypes';

const INITIAL_STATE = {
    isError: false,
    isLoading: false,
    data: null,
};

export default function ( state = INITIAL_STATE, action ) {
    switch (action.type) {
        case FETCHING_PRODUCTS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case FETCHING_PRODUCTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        case FETCHING_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.products,
            };

        default:
            return state;

    }
}
