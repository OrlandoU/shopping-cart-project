import { useEffect, useState } from "react";
import Item from "./Item";
import '../../assets/Shop.css'
import { useParams } from "react-router-dom";
import DetailedHeader from "./DetailedItem/DetailedHeader";


export default function Shop(props) {
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const [order, setOrder] = useState('')
    const [direction, setDirection] = useState('-')
    const urlParams = useParams()

    const getUrl = () => {
        let url = new URLSearchParams(urlParams)
        console.log(url.toString())
        if (url.get('search')) {
            return `search=${url.get('search')}`
        }
        return url.get('filter') + '=' + url.get('value')
    }

    const queryGames = async () => {
        document.querySelector('.loading-screen').classList.add('visible')
        try {
            let response = await fetch(`https://api.rawg.io/api/games?key=${ process.env.REACT_APP_API_KEY }&page_size=50&ordering=${direction + order}&page=${page}&${getUrl()}`, { mode: 'cors' })
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

    const handleSelect = (e) => {
        setOrder(e.target.value)
    }
    const handleSort = (side) => {
        console.log(side)
        if (side === 'descending') {
            setDirection('-')
        } else {
            setDirection('')
        }
    }

    useEffect(() => {
        queryGames()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => {
            document.querySelector('.nav-bar').classList.remove('show')
        }
    }, [page, order, direction])



    return (
        <div className="shop-main-container">
            
            <ul className="tags-container">
                <li className="sub-tags expand">
                    <svg style={{ width: '34px', height: '34px' }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z" />
                    </svg>
                    <span>Sort By</span>
                    <select name="sortFactor" id="sort-select" onChange={handleSelect}>
                        <option value=""></option>
                        <option value="name">Alpabetical</option>
                        <option value="released">Release Date</option>
                        <option value="rating">Rating</option>
                        <option value="metacritic">Metacritic</option>
                    </select>
                </li>
                <li className="sub-tags">
                    <svg style={{ width: '34px', height: '34px' }} viewBox="0 0 24 24" onClick={() => { handleSort('descending') }} className={direction === '-' && 'selected'}>
                        <path fill="currentColor" d="M19 17H22L18 21L14 17H17V3H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
                    </svg>
                </li>
                <li className="sub-tags">
                    <svg style={{ width: '34px', height: '34px' }} viewBox="0 0 24 24" onClick={() => { handleSort('ascending') }} className={direction === '' && 'selected'}>
                        <path fill="currentColor" d="M19 7H22L18 3L14 7H17V21H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
                    </svg>
                </li>
            </ul>
            {new URLSearchParams(urlParams).get('filter') && <DetailedHeader />}
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