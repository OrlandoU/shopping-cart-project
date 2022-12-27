import { useEffect, useState } from "react";
import Item from "./Item";
import '../../assets/Shop.css'
import { useLocation, useParams } from "react-router-dom";

export default function Shop(props){
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const tags = useParams()

    const parseQuery = () => {
        if (!Object.keys(tags).length) return ''

        let copTags = tags.query.split('&').map((wholeQuery, index) => {
            let query = wholeQuery.split('=')
            return { [query[0]]: query[1].split(',') }
        })

        let finalObj = {}
        for (let i = 0; i < copTags.length; i++) {
            Object.assign(finalObj, copTags[i]);
        }

        copTags = finalObj

        return "&"+ Object.keys(copTags).map(filter => {
            return filter + '=' + copTags[filter].join(',')
        }).join('&')

    }

    const queryGames = async() => {
        document.querySelector('.loading-screen').classList.add('visible')
        try {
            let response = await fetch(`https://api.rawg.io/api/games?key=a1922842dfc24abb9c57b3377ecc5774&page=${page}${parseQuery()}`)
            let data = await response.json()
            setItems(data.results)
        } catch (error) {
            throw error
        }
        document.querySelector('.loading-screen').classList.remove('visible')
        
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

    useEffect(()=>{
        queryGames()
    }, [useLocation()])

    return(
        <div>
            <h1>{tags.query}</h1>
            <h1>Shop Page</h1>
            <ul className="tags-container">

            </ul>
            <ul className="shop-items-container">
                {items.map(item=>(
                    <Item  tags={tags} cartHasItem={props.cartHasItem} key={item.id} {...props} item={item}/>
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