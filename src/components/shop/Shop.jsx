import { useEffect, useState } from "react";
import Item from "./Item";
import '../../assets/Shop.css'
import { useLocation, useParams } from "react-router-dom";
import DetailedHeader from "./DetailedItem/DetailedHeader";


export default function Shop(props) {
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const urlParams = useParams()

    const getUrl = () => {
        let url = new URLSearchParams(urlParams)
        console.log(url.toString())
        if(url.get('search')){
            return `search=${url.get('search')}`
        }
        return url.get('filter') + '=' + url.get('value')
    }

    const queryGames = async () => {
        document.querySelector('.loading-screen').classList.add('visible')
        try {
            let response = await fetch(`https://api.rawg.io/api/games?key=a1922842dfc24abb9c57b3377ecc5774&page_size=50&page=${page}&${getUrl()}`)
            let data = await response.json()
            setItems(data.results)
        } catch (error) {
            throw error
        }
        document.querySelector('.loading-screen').classList.remove('visible')

    }

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prevState => prevState - 1)
        }
    }

    const handleNext = () => {
        setPage(prevState => prevState + 1)
    }

    useEffect(() => {
        queryGames()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, useLocation()])

    

    return (
        <div className="shop-main-container">
            {new URLSearchParams(urlParams).get('filter') && <DetailedHeader />}
            <ul className="tags-container">
            </ul>
            <ul className="shop-items-container">
                {items.map(item => (
                    <Item cartHasItem={props.cartHasItem} key={item.id} {...props} item={item} />
                ))}
            </ul>
            <footer>
                <button onClick={handlePrevious}>previous</button>
                <span>{page}</span>
                <button onClick={handleNext}>next</button>
            </footer>
        </ div>
    )
}