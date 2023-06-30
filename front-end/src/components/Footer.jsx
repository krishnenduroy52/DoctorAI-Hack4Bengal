import React from 'react';
import '../css/Footer.css';
import logo from '../../public/Image/doctorai_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="docAI_logo">
          {/* Company Logo */}
          <img src={logo} alt="Logo" />
          <p>Empowering Healthcare through Artificial Intelligence</p>
        </div>
        <div className="content">
          <div className="motto">
            {/* Company Motto */}
          </div>
          <div className="product-list">
            {/* Product List */}
            <label htmlFor="Products">Products</label>
            <ul id='Products'>
              <li>Product 1</li>
              <li>Product 2</li>
              <li>Product 3</li>
            </ul>
          </div>
          <div className="contact">
            {/* Contact Us */}
            <p>Contact Us: contact@example.com</p>
          </div>
        </div>
        <div className="social-media">
          {/* Social Media Links */}
          <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} />Facebook</a>
          <a href="https://www.twitter.com">Twitter</a>
          <a href="https://www.instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
