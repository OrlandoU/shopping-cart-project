
export default function Item(props){
    
    const {item, removeCartItem} = props

    const handleClick = () => {
        removeCartItem(item.id)
    }

    return(
        <li className="cart-item">
            <div className="cart-item-details first">
                <img src={item.background_image} alt="item cover" />
                <div className="cart-item-details-sub">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-console">{item.platforms[0].platform.name}</div>
                    <div className="cart-remove-item" onClick={handleClick}>Remove</div>
                </div>
            </div>
            <div className="quantityButtons">
                <div onClick={() => (props.decreaseQuantity(item.id))} className="decrease-quantity quantity-buttons">-</div>
                <div className="quantity">{props.quantity}</div>
                <div onClick={() => (props.increaseQuantity(item.id))} className="increase-quantity quantity-buttons">+</div>
            </div>
            <div className="cart-item-price">
                {item.metacritic.toFixed(2) || (+item.score).toFixed(2)}$
            </div>
            <div className="cart-item-total-product">
                {((item.metacritic || (+item.score).toFixed(2)) * props.quantity).toFixed(2)}$
            </div>
        </li>
    )
}