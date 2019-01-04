import {
	FETCHING_PRODUCTS_IN_PROGRESS,
	FETCHING_PRODUCTS_SUCCESS,
	FETCHING_PRODUCTS_ERROR,
} from './products.actionTypes';
import axios from 'axios';


export const fetchProducts = () => dispatch => {
	dispatch({ type: FETCHING_PRODUCTS_IN_PROGRESS });

	return axios.get('/product/active')
		.then( response => {
			dispatch({
				type: FETCHING_PRODUCTS_SUCCESS,
				payload: {
					products: response.data.items,
				} });
		})
		.catch( () => {
			dispatch({ type: FETCHING_PRODUCTS_ERROR });
		});
};
