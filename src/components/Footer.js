import React from 'react';
import Image from '../images/dasmarketplace_logo_futer.svg';

const Footer = (props) =>{
    return(
        <footer>
            <div className="footer-wrap">
                <div className="footer-logo">
                    <img src={Image}/>
                </div>
                <div className="footer-about">
                    <h3>ABOUT</h3>
                    <ul>
                        <li><a>About Us</a></li>
                        <li><a>Blog</a></li>
                        <li><a>Order Tracking</a></li>
                        <li><a>FAQs</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h3>FOLLOW</h3>
                    <ul>
                        <li><a>Twitter</a></li>
                        <li><a>Instagram</a></li>
                        <li><a>Tumblr</a></li>
                        <li><a>Pinterest</a></li>
                        <li><a>Facebook</a></li>
                    </ul>
                </div>
                <div className="footer-archive">
                    <h3>ARCHIVE</h3>
                    <ul>
                        <li><a>Designer Shoes</a></li>
                        <li><a>Gallery</a></li>
                        <li><a>Pricing</a></li>
                        <li><a>Feature Index</a></li>
                        <li><a>Help & Support</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
