import React from 'react';
import PropTypes from 'prop-types';
import ShopStep from './ShopStep';
import './ShopProgress.scss';


const STEPS = ['Checkout', 'Shipping', 'Payment', 'Confirmation'];

const ShopProgress = (props) => {
    return (
        <aside className="shop-progress">
            <h2 className="shop-progress__title">Your Cart</h2>

            <div className="shop-steps">
                {
                    STEPS.map( (step, index) => (
                        <ShopStep key={step} isActive={ (index === props.step) } title={step} />
                    ))
                }
            </div>
        </aside>
    );
};

ShopProgress.defaultProps = {
    step: 0,
};

ShopProgress.propTypes = {
    step: PropTypes.number.isRequired,
};

export default ShopProgress;
