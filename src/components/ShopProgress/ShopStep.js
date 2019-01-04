import React from 'react';
import PropTypes from 'prop-types';


const ShopStep = (props) => {
    return (
        <div className="shop-step">
            <div className={"shop-step__circle" + (props.isActive && ' shop-step__circle--full' || '') } />
            <div className="shop-step__line shop-step__line--left" />
            <div className="shop-step__line shop-step__line--right" />
            <div className="shop-step__desc">{props.title}</div>
        </div>
    );
};

ShopStep.defaultProps = {
    isActive: false,
    title: "",
};

ShopStep.propTypes = {
    isActive: PropTypes.bool.isRequired,
    title: PropTypes.string,
};

export default ShopStep;
