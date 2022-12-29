import { useEffect, useState } from "react"
import LazyLoad from "react-lazy-load"
import Tag from "./DetailedItem/Tag"

export default function Item(props) {
    const {addCartItem, item, cartHasItem} = props
    const [checked, setChecked] = useState('')

    const handleClick = () => {
        if(cartHasItem(item)) return
        addCartItem(item)
        setChecked('checked-out')
    }


    useEffect(()=>{
        if(cartHasItem(item)){
            setChecked('checked-out')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('cehc')

    return (
        <li className={"shop-item " + checked}>
            <div className="shop-img-container">
                <LazyLoad offset={300}>
                    <img className="shop-item-cover" src={item.background_image} alt={item.name + ' cover'} />
                </LazyLoad>
                {item.esrb_rating && <span className="shop-esrb">{item.esrb_rating.name}</span>}
                <span className="stars">
                    <div className="shopping-rating-top" style={{ width: item.rating * 20 + 'px' }}>
                        ★★★★★
                    </div>
                    <div className="shopping-rating-bottom">
                        ☆☆☆☆☆
                    </div>
                </span>
            </div>
            <div className="shop-item-bottom">
                <ul className="shop-item-platforms">
                    {item.platforms && item.platforms.map((platform, index)=> (
                        <Tag key={index}  filter='platforms' id={platform.platform.id}  text={platform.platform.name} />
                    ))}
                </ul>
                <div className="shop-name-date-container">
                    <div className="shop-item-name">{item.name}</div>
                    <div className="shop-item-date">{item.metacritic || (+item.score).toFixed(2)}$</div>
                </div>
                <button onClick={handleClick} className='shop-item-button'>
                    <svg viewBox="0 0 24 24" id="cart">
                        <path fill="#000000" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
                    </svg>
                    <span>Add to Cart</span>
                    <svg id="check" viewBox="0 0 24 24">
                        <path strokeWidth="2" fill="none" stroke="#ffffff" d="M 3,12 l 6,6 l 12, -12" />
                    </svg>
                </button>
            </div>
            
        </li>
    )
}