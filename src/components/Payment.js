import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {getCartItemsSelector} from "./Header.util";
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import ShopProgress from "./ShopProgress/ShopProgress";

class Payment extends Component{
	constructor(props){
		super(props);
		this.state= {
		}
	}

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
        let modal = document.getElementById('paymentModal');
        if(modal && !modal.contains(event.target)) {
            this.handleClose()
        }
    }

	handleClose(){
		this.props.push('/');
	}

	quickView(){
        this.props.push('/confirmation');
	}

	render(){
		let paymentTotal = 0;
		let view = this.props.cartItems.map(product =>{
			paymentTotal += product.quantity * product.price;
			return(
				<li className='payment-modal__item-row' key={product.SKU}>
                    <span className='payment-modal__product-info'>{product.title} x {product.quantity}</span>
                    <span className='payment-modal__product-info'>{ (product.price).toFixed(2) } DASC</span>
				</li>
			)
		});
		return(
			<div className='modal-wrapper active'>
				<div id='paymentModal' className='modal-checkout'>

                    <ShopProgress step={2}/>

					<button type='button' className='close' onClick={this.handleClose.bind(this)}>&times;</button>
					<div className='payment-modal'>
                        <h1 className='payment-modal__title'>Order Details</h1>
                        <ul className='payment-modal__product-list'>
                            {view}
                        </ul>
                        <div className='payment-modal__billing'>
                            <div className='payment-modal__item-row'>
                                <span className='payment-modal__billing-item-info'>Subtital:</span>
                                <span className='payment-modal__billing-item-info'>{ (paymentTotal).toFixed(2) } DASC</span>
                            </div>
                            {/*<div className='payment-modal__item-row'>*/}
                                {/*<span className='payment-modal__billing-item-info'>Shipping:</span>*/}
                                {/*<span className='payment-modal__billing-item-info'></span>*/}
                            {/*</div>*/}
                            <div className='payment-modal__item-row'>
                                <span className='payment-modal__billing-item-info'>Payment Method:</span>
                                <span className='payment-modal__billing-item-info'>DasCoin</span>
                            </div>
                            <div className='payment-modal__item-row'>
                                <span className='payment-modal__billing-item-info--total'>Total:</span>
                                <span className='payment-modal__billing-item-info--total'>{ (paymentTotal).toFixed(2) } DASC</span>
                            </div>
                        </div>
                        {
                            this.props.shippingInfo &&
                            <div className='payment-modal__customer-info'>
                                <h3 className='payment-modal__customer-info-title'>Customer details</h3>
                                <div className='payment-modal__item-row payment-modal__customer-info-row'>
                                    {/*<div className='payment-modal__customer-info-item '>*/}
                                        {/*<span className='payment-modal__customer-info-item-label'>Email:</span>*/}
                                        {/*<span className='payment-modal__customer-info-item-value'>{this.props.shippingInfo.email}</span>*/}
                                    {/*</div>*/}
                                    <div className='payment-modal__customer-info-item '>
                                        <span className='payment-modal__customer-info-item-label'>Phone:</span>
                                        <span className='payment-modal__customer-info-item-value'>{this.props.shippingInfo.cell}</span>
                                    </div>
                                </div>
                                <div className='payment-modal__item-row payment-modal__customer-info-row'>
                                    <div className='payment-modal__customer-info-item '>
                                        <span className='payment-modal__customer-info-item-label'>Billing Address:</span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.address1},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.address2},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.city},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.zip},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.country}
                                        </span>
                                    </div>
                                    <div className='payment-modal__customer-info-item '>
                                        <span className='payment-modal__customer-info-item-label'>Shipping Address:</span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.address1},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.address2},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.city},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.zip},
                                        </span>
                                        <span className='payment-modal__customer-info-item-value'>
                                            {this.props.shippingInfo.country}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }

						<div className='action-block-checkout'>
							<button type='button' onClick={this.quickView.bind(this)}>PAY WITH DASCOIN</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	cartItems: getCartItemsSelector(state.productsReducer.data, state.cartReducer),
    shippingInfo: state.shippingReducer.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
