export default function Item(props){
    const {item, removeCartItem} = props

    const handleClick = () => {
        removeCartItem(item.id)
    }

    return(
        <li className="cart-item">
            <h5>{item.name}</h5>
            <img className="shop-item-cover" src={item.background_image} alt={item.name + ' cover'} />
            <button onClick={handleClick}>Remove from Cart</button>
        </li>
    )
}