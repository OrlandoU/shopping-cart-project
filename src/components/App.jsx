import '../assets/App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './home/Home'
import About from './about/About'
import Cart from './cart/Cart';
import Shop from './shop/Shop';
import Item from './shop/DetailedItem/DetailedItem';
import Filter from './shop/filter/Filter';
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

  return (
    <BrowserRouter>
      <nav>
        <h3>Shopping-cart</h3>
        <ul>
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
            <NavLink to='cart'>Cart</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/cart' element={<Cart items={cart} removeCartItem={removeCartItem} />}/>
        <Route path='/shop' element={<Shop cart={cart} addCartItem={addCartItem}/>}/>
        <Route path='/shop/id/:idItem' element={<Item />}/>
        <Route path='/shop/:filter/:query?' element={<Filter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
