import Item from "./Item"
import '../../assets/Cart.css'
import { useEffect, useState } from "react"

export default function Cart(props) {
    const [quantity, setQuantity] = useState({})
    const [shipping, setShipping] = useState(8)
    const { removeCartItem, items } = props

    const increaseQuantity = (id) => {
        setQuantity(prevState=>{
            let copy = {...prevState}
            copy[id]++
            return copy
        })
    }
    const decreaseQuantity = (id) => {
        setQuantity(prevState => {
            if(prevState[id] === 1) return prevState
            let copy = { ...prevState }
            copy[id]--
            return copy
        })
    }

    useEffect(()=>{
        items.map(item=>{
            setQuantity(prevState=>{return {...prevState, [item.id] : 1}})
            return item
        })
    }, [items])

    
    

    const getTotal = () => (
        items.reduce((prev, crr) => {
            return prev + ((crr.metacritic || (+crr.score).toFixed(2))*quantity[crr.id])
        }, 0)
    )

    const handleShipping = () => {
        setShipping(+document.getElementById('shipping').value)
    }

    return (
        <div className="cart-main-container">
            <div className="cart-modal-container">
                <div className="cart-products">
                    <div className="cart-products-header bottom-border">
                        <div>Shopping Cart</div>
                        <div className="cart-products-count">{items.length} Items</div>
                    </div>
                    <div className="cart-products-container">
                        <div className="cart-products-tags-container">
                            <div className="cart-products-tags first">PRODUCT DETAILS</div>
                            <div className="cart-products-tags">QUANTITY</div>
                            <div className="cart-products-tags">PRICE</div>
                            <div className="cart-products-tags">TOTAL</div>
                        </div>
                        {items.map(item => {
                            return <Item quantity={quantity[item.id]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeCartItem={removeCartItem} item={item} />
                        })}
                    </div>
                </div>
                <div className="cart-order">
                    <div className="cart-order-top bottom-border">
                        <div>Order Summary</div>
                    </div>

                    <div className="cart-order-middle bottom-border">
                        <div className="cart-items-count">
                            <span>ITEMS  {items.length}</span>
                            <span className="cart-items-total">{getTotal()}$</span>
                        </div>

                        <div className="cart-item-shipping">
                            <label htmlFor="shipping">SHIPPING</label>
                            <select name="select-value" id="shipping" onChange={handleShipping}>
                                <option value="8">Standard Delivery - 8$</option>
                                <option value="14">Expedited Delivery - 14$</option>
                            </select>
                        </div>

                        <div className="cart-item-promo">
                            <label htmlFor="promo-code">PROMO CODE</label>
                            <input type="text" id='promo-code'/>
                            <button className="cart-apply-code">APPLY</button>
                        </div>
                    </div>

                    <div className="cart-order-bottom">
                        <span className="cart-order-total">
                            <span>TOTAL COST</span>
                            <span className="cart-order-total-amount">
                            {getTotal() + shipping}$
                            </span>
                        </span>
                        <div className="cart-order-buttons">
                            <button className="cart-order-checkout-button">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}