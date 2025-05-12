import React, { useContext } from 'react';
import './header.css';

import { Link as RouterLink } from 'react-router-dom'; 
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from './CartContext';
import Cart from './Cart' 

function Header() {
  const { cartItems, toggleCartVisibility, isCartVisible } = useContext(CartContext);

  return (
    <nav className='navbar'>
      <h1>PinkBull.</h1>
      <div className="navbarlist">
  <RouterLink to="/" smooth={true}>Home</RouterLink>
  <RouterLink to="/services" smooth={true}>About</RouterLink>
  {/* <RouterLink to="/about" smooth={true}>About</RouterLink> */}

  <div className="dropdown">
    <span className="dropdown-title">Products</span>
    <div className="dropdown-content">
    <RouterLink to="/product">All</RouterLink>
      <RouterLink to="/product/foundation">Foundation</RouterLink>
      <RouterLink to="/product/concealer">Concealer</RouterLink>
      <RouterLink to="/product/lipstick">Lipsticks</RouterLink>
      <RouterLink to="/product/Eyeshadow">Eyeshadow</RouterLink>
      <RouterLink to="/product/Eyeliner">Eyeliner</RouterLink>
      <RouterLink to="/product/Blush">Blush</RouterLink>
    </div>
  </div>

  <RouterLink to="/Contact" smooth={true}>Contact</RouterLink>
</div>


      {/* Chat & Cart Section */}
      <div className="right-icons">
         <RouterLink to="/Signup">
          <button className='btnSignupNavbar'>Signup/Login</button>
        </RouterLink>
        <RouterLink to="/chatbot">
          <button className='btn-1'>Chat with us</button>
        </RouterLink>

        {/* Cart Icon with Badge */}
        <div className="cart-icon" onClick={toggleCartVisibility}>
          <FaShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </div>
      </div>

      {/* Show the cart if it's visible */}
      {isCartVisible && <Cart />}
    </nav>
  );
}

export default Header;

