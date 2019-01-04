import React, {Component} from 'react';
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';


class Product extends Component {
    state = {
        selectedProduct: {},
        quickViewProduct: {},
        isAdded: false
    };

    quickView(image, name, description, price, SKU, quantity) {
        this.setState({
            quickViewProduct: {
                image: image,
                name: name,
                description: description,
                price: price,
                SKU: SKU
            }
        }, () => {
            this.props.push("/product/" + SKU);
        })
    }

    render() {
        let image = this.props.image;
        let name = this.props.name;
        let description = this.props.description;
        let price = this.props.price;
        let SKU = this.props.SKU;
        let quantity = this.props.productQuantity;
        return (
            <div className="product">
                <div className="product-image-holder">
                    <div className="product-image" style={{ backgroundImage: "url("+image+")"}}
                         onClick={this.quickView.bind(this, image, name, description, price, SKU, quantity)} />
                </div>
                <div className="product-info">
                    <h4 className="product-name">{this.props.name}</h4>
                    <p className="product-price">{(this.props.price).toFixed(2)}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    productReducer: state.productReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Product);
