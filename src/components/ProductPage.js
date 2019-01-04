import React, {Component} from 'react';
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import {fetchProduct} from "./DATA/productData/product.action";
import {addProductToCart} from "./DATA/cartData/cart.actions";
import QuickView from "./QuickView";

class ProductPage extends Component {
    state = {
        quantity: 1,
        isAdded: false
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
        this.props.fetchProduct(this.props.match.params.productId);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
        let modal = document.getElementById('quickViewModal');
        if(modal && !modal.contains(event.target)) {
            this.handleClose()
        }
    }

  // Add to Cart
    handleAddToCart(productSku, quantity) {
        this.props.addProductToCart(productSku, quantity);
        this.setState({
            isAdded: true
        })
    }

    updateQuantity(qty) {
        this.setState({
            quantity: qty
        })
    }

    handleClose() {
        this.props.push("/");
    }

    render() {
        if (this.props.productReducer.isLoading) {
            return <div>Loading...</div>
        }
        if (this.props.productReducer.isError) {
            return <div>Error...</div>
        }

        return (
            <div className="modal-wrapper active">
                <div className="modal quick-view-modal">
                {
                    this.props.productReducer.data &&
                    <QuickView
                        addToCart={this.handleAddToCart.bind(this)}
                        product={this.props.productReducer.data}
                        updateQuantity={this.updateQuantity.bind(this)}
                        quantity={this.state.quantity}
                        close={this.handleClose.bind(this)}
                        added={this.state.isAdded}
                    />
                }
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    productReducer: state.productReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProduct,
    addProductToCart,
    push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
