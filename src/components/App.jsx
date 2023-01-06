import '../assets/App.css';
import '../assets/loader.css'
import {  Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Home from './home/Home'
import About from './about/About'
import Cart from './cart/Cart';
import Shop from './shop/Shop';
import Item from './shop/DetailedItem/DetailedItem';
import { useEffect, useState, useRef } from 'react';
import logo from '../assets/LOGO.png'

function App() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const mounted = useRef()

  useEffect(()=>{
    getItems()
  }, [])

  useEffect(()=>{
    saveItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  const saveItems = () => {
    if(!mounted.current){
      mounted.current = true
    }
    else{
      window.localStorage.setItem('shop-items', JSON.stringify(cart))
    }
  }

  const getItems = () => {
    let data = JSON.parse(window.localStorage.getItem('shop-items'))
    if(!data) return
    setCart(data)
  }

  const addCartItem = (item) => {
    console.log(item)
    setCart(prevState=>{
      return [
        ...prevState,
        item
      ]
    })
    
  }

  const removeCartItem = (id) => {
    console.log(id)
    setCart(prevState => prevState.filter(item => item.id !== id))
  }

  const cartHasItem = (item) => {
    return cart.reduce((prev, crr)=>{
      if(crr.id === item.id) return true
      return prev
    }, false)
  }

  const handleSearch = (e) => {
    if(e.key && e.key !== 'Enter') return
    let input = document.querySelector('.nav-search-input')
    navigate(`/shop/q/${input.value}`)
  }
  const changeColor = () => {
    let scroll = window.scrollY
    if(!scroll) return
    
    if(scroll >= 150){
      document.querySelector('.nav-bar').classList.add('show')
      return
    }
    document.querySelector('.nav-bar').classList.remove('show')
  }

  window.addEventListener('scroll', changeColor)

  return (
    <>
      <nav className='nav-bar'>
        <NavLink to='/'>
          <img src={logo} alt="" className='logo'/>
        </NavLink>
        <ul className='nav-links'>
          <li className='search-bar-container' onKeyDown={handleSearch}>
            <input type="text" className='nav-search-input' placeholder='Games....'/>
            <svg viewBox="0 0 24 24" className='search-icon' onClick={handleSearch}>
              <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
              <span></span>
          </li>
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
            <NavLink to='cart' className='cart'>
              <svg viewBox="0 0 24 24" id="cart">
                <path fill="#eee" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
              </svg>
              {cart.length > 0 && <span className='cart-count'>{cart.length}</span>}
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
          <Route path='/shopping-cart-project' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart items={cart} removeCartItem={removeCartItem} />} />
          <Route path='/shop/id/:idItem' element={<Item cartHasItem={cartHasItem} removeCartItem={removeCartItem} addCartItem={addCartItem}/>} />
          <Route path='/shop/q/:search?' element={<Shop cartHasItem={cartHasItem} addCartItem={addCartItem} key={document.location.href} />} />
          <Route path='/shop/:filter?/:value?' element={<Shop cartHasItem={cartHasItem} addCartItem={addCartItem} key={document.location.href} />} />
        </Routes>
        
        
      </div>
      
    </>
  );
}

export default App;
