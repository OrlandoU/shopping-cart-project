export default function Item(props) {
    const {addCartItem, item, cart} = props

    const handleClick = () => {
        addCartItem(item)
    }

    return (
        <li className="shop-item">
            <h5>{item.name}</h5>
            <img className="shop-item-cover" src={item.background_image} alt={item.name + ' cover'} />
            {!cart.includes(item) 
            ? <button onClick={handleClick}>Add to Cart</button>
            : <span>On Cart</span>
        }
        </li>
    )
}