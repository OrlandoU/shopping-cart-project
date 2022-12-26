import { useEffect, useState } from "react";
import Item from "./Item";
import '../../assets/Shop.css'

export default function Shop(props){
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])

    const queryGames = async() => {
        let response = await fetch(`https://api.rawg.io/api/games?key=a1922842dfc24abb9c57b3377ecc5774&page=${page}`)
        let data = await response.json()
        setItems(data.results)
    }

    const handlePrevious = () => {
        if(page > 1){
            setPage(prevState => prevState - 1)
        }
    }

    const handleNext = () => {
        setPage(prevState => prevState + 1)
    }

    useEffect(()=>{
        queryGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return(
        <>
            <h1>Shop Page</h1>
            <ul className="shop-items-container">
                {items.map(item=>(
                    <Item cart={props.cart} key={item.id} {...props} item={item}/>
                ))}
            </ul>
            <footer>
                <button onClick={handlePrevious}>previous</button>
                <span>{page}</span>
                <button onClick={handleNext}>next</button>
            </footer>
        </>
    )
}