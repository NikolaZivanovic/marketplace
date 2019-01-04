/* eslint-disable import/no-named-as-default */
import {Route} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import {hot} from "react-hot-loader";
import Checkout from './Checkout';
import Shipping from './Shipping';
import Payment from "./Payment";
import ProductPage from "./ProductPage";
import HomePage from "./HomePage";
import Confirmation from "./Confirmation";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
    render() {
        return (
            <div className="main-app-holder">

                <main>
                    <Route path="/" component={HomePage}/>
                    <Route path="/product/:productId" component={ProductPage}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/shipping" component={Shipping}/>
                    <Route path="/payment" component={Payment}/>
                    <Route path="/confirmation" component={Confirmation}/>
                </main>

            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};

export default hot(module)(App);
