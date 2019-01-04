import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import EmptyCart from '../empty-states/EmptyCart';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {getCartItemsSelector, getCartItemsCountSelector} from "./Header.util";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {addProductToCart, removeProductsFromCart} from "./DATA/cartData/cart.actions";
import { push } from 'react-router-redux';
import Image from '../images/dasmarketplace_logo.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false,
            quickViewProduct: {},
            isHidden: false,
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
        let modal = document.getElementById('cartPreview');
        let search = document.getElementById("header");
        if(modal && !modal.contains(event.target) && this.state.showCart) {
            this.handleCart(event)
        }
        if(!search.contains(event.target) && this.state.isHidden) {
            this.handleSearchClose(event)
        }
    }

    handleCart(e) {
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }

    handleSearchClose(e) {
        e.preventDefault();
        this.setState({
            isHidden: false,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isHidden: true
        })
    }

    handleMobileSearch(e) {
        e.preventDefault();
        this.setState({
            mobileSearch: true
        })
    }

    handleSearchNav(e) {
        e.preventDefault();
        this.setState({
            mobileSearch: false
        }, function () {
            this.refs.searchBox.value = "";
            this.props.handleMobileSearch();
        })
    }

    quickView(cart) {
    	this.props.push('/checkout');
        this.handleClickOutside(event)
    }



    render() {
        const cartItems = this.props.cartItems;
        const cartItemElements = cartItems.map( product => {
            return (
                <li className="cart-item" key={product.SKU}>
                    <img className="product-image" src={product.imageLink}/>
                    <div className="product-info">
                        <p className="product-name">{product.title}</p>
                        <p className="product-price">{product.quantity} x { (product.price).toFixed(2) } €</p>
                    </div>

                    <a className="product-remove" href="#"
                       onClick={ () => this.props.removeProductsFromCart(product.SKU) }>×</a>
                </li>
            )
        });

        let view;
        if (!cartItemElements.length) {
            view = <EmptyCart/>
        } else {
            view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300}
                                       component="ul" className="cart-items">{cartItemElements}</CSSTransitionGroup>
        }
        return (
            <header id="header">
                <div className={this.state.isHidden && "container container-active" || "container"}>
                    <div className={this.state.isHidden && "is-hidden" || "brand"}>
                        <img src={Image}/>
                    </div>
                    <div className={this.state.isHidden && "header header-active" || "header"}>
                        <div className={this.state.isHidden && "is-hidden" || "cart"}>
                            <a className="cart-icon icon_cart_alt" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                                <span className="cart-count">{this.props.totalItems > 0 && this.props.totalItems}</span>
                            </a>
                            <div id='cartPreview' className={this.state.showCart && "cart-preview active" || "cart-preview"} ref="cartPreview">
                                <CartScrollBar height="340px">
                                    {view}
                                </CartScrollBar>
                                <div className="action-block-cart">
                                    <button type="button" onClick={this.quickView.bind(this, this.state.cart)}
                                            disabled={!this.props.cartItems.length}
                                            className={this.props.cartItems.length > 0 && " " || "disabled"}>PROCEED TO CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={this.state.isHidden && "search search-active" || "search" }>
                            <form action="#" method="get" className="search-form">
                                <input type="search" ref="searchBox" placeholder="Search for Products"
                                       className={this.state.isHidden && "search-keyword search-keyword-active" || "search-keyword"} onChange={this.props.handleSearch}/>
                                <button className="icon_search search-icon" type="submit" onClick={this.handleSubmit.bind(this)} />
                            </form>
                        </div>
                    </div>
                </div>
            </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
