import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import Products from '../components/Products';
import QuickView from '../components/QuickView';
import Checkout from "../components/Checkout";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Slider from "../components/Slider";
import { fetchProducts } from '../components/DATA/productsData/products.actions';
import { addProductToCart, removeProductsFromCart } from '../components/DATA/cartData/cart.actions';
import { getCartItemsSelector } from './Header.util';
import ProductPage from "./ProductPage";
import Footer from "./Footer";


class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: '',
      category: '',
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false,
      checkoutActive: false,
      checkoutProducts: {},
      shippingActive: false,
      referral: '',
      paymentActive: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({term: event.target.value});
  }

  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({term: ""});
  }

  // Filter by Category
  handleCategory(event) {
    this.setState({category: event.target.value});
    console.log(this.state.category);
  }


  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    })
  }

  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    })
  }

  //Reset Quantity
  updateQuantity(qty) {
    this.setState({
      quantity: qty
    })
  }

  render() {
    return (
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
          openCheckout={this.openCheckout}
        />

        <Slider/>

        <Products
          productsList={this.props.products || []}
          searchTerm={this.state.term}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        />


        <Footer/>
        {/*{*/}
        {/*this.state.modalActive &&*/}
        {/*<QuickView*/}
        {/*product={this.state.quickViewProduct}*/}
        {/*addToCart={this.handleAddToCart}*/}
        {/*productQuantity={this.state.quantity}*/}
        {/*updateQuantity={this.updateQuantity}*/}
        {/*closeModal={this.closeModal}*/}
        {/*/>*/}
        {/*}*/}

        {/*{*/}
        {/*this.state.checkoutActive &&*/}
        {/*<Checkout*/}
        {/*closeCheckout={this.closeCheckout}*/}
        {/*cartItems={this.state.cart}*/}
        {/*openShipping={this.openShipping}*/}
        {/*/>*/}
        {/*}*/}

        {/*{*/}
        {/*this.state.shippingActive &&*/}
        {/*<Shipping*/}
        {/*closeShipping={this.closeShipping}*/}
        {/*openPayment={this.openPayment}*/}
        {/*/>*/}
        {/*}*/}

        {/*{*/}
        {/*this.state.paymentActive &&*/}
        {/*<Payment*/}
        {/*closePayment={this.closePayment}*/}
        {/*items={this.state.cart}*/}
        {/*/>*/}
        {/*}*/}

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productsReducer: state.productsReducer,
  products: state.productsReducer.data,
  cartItems: getCartItemsSelector( state.productsReducer.data, state.cartReducer ),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProducts,
  addProductToCart,
  removeProductsFromCart,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
