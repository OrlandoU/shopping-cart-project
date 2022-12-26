import Item from "./Item"

export default function Cart(props){
    const {removeCartItem, items} = props

    return(
        <>
            <h1>Cart Page</h1>
            <ul>
                {items.map(item=>(
                    <Item key={item.id} removeCartItem={removeCartItem} item={item}/>
                ))}
            </ul>
        </>
    )
}