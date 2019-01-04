import React from 'react';
import Counter from "./Counter";

const QuickView = props => {

    let quantity = props.quantity;
    // PLEASE: Do not remove id='quickViewModal', because it is used in other component for handling click outside of modal
    return (
        <div id='quickViewModal' className='quick-view-modal__content'>
            <button type='button' className='close' onClick={() => props.close()}>&times;</button>

            <div className="quick-view-modal__image-holder" >
                <div className='quick-view-modal__image' style={{ backgroundImage: "url("+props.product.imageLink+")"}} />
            </div>

            <div className='quick-view-modal__info'>
                <h1 className='quick-view-modal__product-title'>{props.product.title}</h1>
                <div className='quick-view-modal__product-price-section'>
                    {
                        props.product.old_price &&
                        <span className='quick-view-modal__product-price--discounted'>{ (props.product.old_price).toFixed(2) } €</span>
                    }
                    <span className='quick-view-modal__product-price'>{ (props.product.price).toFixed(2) } €</span>
                </div>
                <p className='quick-view-modal__product-description'>{props.product.description}</p>

                <div className='quick-view-modal__product-purchase-section'>
                    <Counter productQuantity={props.quantity} updateQuantity={props.updateQuantity} />
                    <button
                        type='button'
                        className={`quick-view-modal__purchase-button ${(!props.added && '' || 'added')}`}
                        onClick={() => props.addToCart(props.product.SKU, quantity)}
                    >
                        {!props.added && 'ADD TO CART' || '✔ ADDED'}
                    </button>
                </div>
            </div>

        </div>
    )
};

export default QuickView;
