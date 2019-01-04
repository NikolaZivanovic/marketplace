import React, {Component} from 'react';
import ShopProgress from "./ShopProgress/ShopProgress";
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";
import {connect} from "react-redux";

class Confirmation extends Component {


    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }

    handleClickOutside(event) {
        let modal = document.getElementById('confirmationModal');
        if (!modal.contains(event.target)) {
            this.handleClose()
        }
    }

    handleClose() {
        this.props.push('/');
    };

    render() {
        return (
            <div className="modal-wrapper active">
                <div id='confirmationModal' className="modal-checkout">
                    <button type="button" className="close" onClick={this.handleClose.bind(this)}>&times;</button>
                    <ShopProgress step={3}/>
                    <div className='confirmation-screen'>
                        <h1 className='confirmation-header'>Confirmation</h1>
                        <p className='confirmation-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div className='action-block-checkout'>
                        <button onClick={this.handleClose.bind(this)}>GO SHOPPING</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(Confirmation);
