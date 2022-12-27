import '../assets/App.css';
import '../assets/loader.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './home/Home'
import About from './about/About'
import Cart from './cart/Cart';
import Shop from './shop/Shop';
import Item from './shop/DetailedItem/DetailedItem';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([])

  const addCartItem = (item) => {
    setCart(prevState=>{
      return [
        ...prevState,
        item
      ]
    })
  }

  const removeCartItem = (id) => {
    setCart(prevState => prevState.filter(item => item.id !== id))
  }

  const cartHasItem = (item) => {
    return cart.reduce((prev, crr)=>{
      if(crr.id === item.id) return true
      return prev
    }, false)
  }


  return (
    <BrowserRouter>
      <nav className='nav-bar'>
        <NavLink to='/'>
          <h3 className='main-header'>Shopping-cart</h3>
        </NavLink>
        <ul className='nav-links'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='shop'>Shop</NavLink>
          </li>
          <li>
            <NavLink to='about'>About</NavLink>
          </li>
          <li>
            <NavLink to='cart'>
              <svg viewBox="0 0 24 24" id="cart">
                <path fill="#eee" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
              </svg>
              <svg id="check" viewBox="0 0 24 24">
                <path strokeWidth="2" fill="none" stroke="#eee" d="M 3,12 l 6,6 l 12, -12" />
              </svg>
              <span>{cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="main-container">
        <div className="loading-screen">
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart items={cart} removeCartItem={removeCartItem} />} />
          <Route path='/shop/id/:idItem' element={<Item />} />
          <Route path='/shop/:query?' element={<Shop cartHasItem={cartHasItem} addCartItem={addCartItem} />} />
        </Routes>
        
        
      </div>
      
    </BrowserRouter>
  );
}

export default App;
