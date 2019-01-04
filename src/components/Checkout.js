import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {getCartItemsCountSelector, getCartItemsSelector} from "./Header.util";
import {bindActionCreators} from "redux";
import {addProductToCart, removeProductsFromCart} from "./DATA/cartData/cart.actions";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ShopProgress from "./ShopProgress/ShopProgress";


class Checkout extends Component{
	state= {
        referral: '',
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
        let modal = document.getElementById('checkoutModal');
        if(modal && !modal.contains(event.target)) {
            this.handleClose()
        }
    }

	handleClose(){
        this.props.push('/');
	}

	quickView(e){
		e.preventDefault();
		this.props.push('/shipping');
	}

	updateInputValue(e){
		this.setState({
			referral: e.currentTarget.value
		})
	}

	render(){
		let cartItems;
		cartItems = this.props.cartItems.map(product =>{
			return(
				<li className="product-item-checkout" key={product.SKU}>
					<div className="products-checkout-left">
						<div className="product-image-checkout"
                             style={{ backgroundImage: "url("+product.imageLink+")"}} />
						<div className="product-info-checkout">
							<p className="product-name-checkout">{product.title}</p>
							<p className="product-price-checkout">Unit price: { (product.price).toFixed(2) } €</p>
						</div>
					</div>
					<div className="product-total-checkout">
						<p className="quantity-checkout">Quantity: {product.quantity}</p>
						<p className="amount-checkout">Total: { (product.quantity * product.price).toFixed(2) } €</p>
					</div>
                    <a className="product-remove" href="#"
                       onClick={ () => this.props.removeProductsFromCart(product.SKU) }>×</a>
				</li>
			)
		});

		let view;
		view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items-checkout">{cartItems}</CSSTransitionGroup>;

		return(
			<div className="modal-wrapper active">
				<div id='checkoutModal' className="modal-checkout">

                    <ShopProgress step={0} />

					<button type="button" className="close" onClick={this.handleClose.bind(this)}>&times;</button>
					<div className="quick-view">

						<CartScrollBar height="500px">
							{view}
						</CartScrollBar>
						<form className="action-block-checkout" onSubmit={this.quickView.bind(this)}>
							<input type="text" placeholder="Enter Referal Name" value={this.state.referral} onChange={this.updateInputValue.bind(this)} className="generic-form__input"/>
							<button type="submit">PROCEED TO SHIPPING</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}



const mapStateToProps = (state) => ({
    cartItems: getCartItemsSelector( state.productsReducer.data, state.cartReducer ),
    totalItems: getCartItemsCountSelector(state.cartReducer),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addProductToCart,
    removeProductsFromCart,
    push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
