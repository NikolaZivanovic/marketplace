import {
	FETCHING_PRODUCT_IN_PROGRESS,
	FETCHING_PRODUCT_SUCCESS,
	FETCHING_PRODUCT_ERROR,
} from './product.actionTypes';
import axios from 'axios';


export const fetchProduct = (id) => dispatch => {
	dispatch({ type: FETCHING_PRODUCT_IN_PROGRESS });

	return axios.get("/product/"+id)
		.then( response => {
			dispatch({
				type: FETCHING_PRODUCT_SUCCESS,
				payload: {
					product: response.data,
				} });
		})
		.catch( () => {
			dispatch({ type: FETCHING_PRODUCT_ERROR });
		});
};
