import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import productsReducer from '../components/DATA/productsData/products.reducer';
import cartReducer from '../components/DATA/cartData/cart.reducer';
import productReducer from '../components/DATA/productData/product.reducer';
import shippingReducer from '../components/DATA/shippingData/shipping.reducer';


export default combineReducers({
    productsReducer,
    cartReducer,
    productReducer,
    shippingReducer,
    routing: routerReducer
});
