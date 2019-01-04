import {
	FETCHING_PRODUCT_IN_PROGRESS,
	FETCHING_PRODUCT_SUCCESS,
	FETCHING_PRODUCT_ERROR,
} from './product.actionTypes';

const INITIAL_STATE = {
	isError: false,
	isLoading: false,
	data: null,
};

export default function ( state = INITIAL_STATE, action ) {
	switch (action.type) {
		case FETCHING_PRODUCT_IN_PROGRESS:
			return {
				...state,
				isLoading: true,
			};

		case FETCHING_PRODUCT_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
			};

		case FETCHING_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.product,
			};

		default:
			return state;

	}
}
