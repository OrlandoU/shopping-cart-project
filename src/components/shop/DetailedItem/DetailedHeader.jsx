import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function DetailedHeader() {
    const [data, setData] = useState({})
    const urlParams = useParams()

    const queryData = async () => {
        let response = await fetch(`https://api.rawg.io/api/${urlParams.filter}/${urlParams.value}?key=${process.env.REACT_APP_API_KEY }`)
        let parsedResponse = await response.json()
        console.log(parsedResponse)
        setData(parsedResponse)
    }

    useEffect(() => {
        queryData()
    }, [])

    return (
        <div className="detailed-header">
            <div className="shop-banner" > 
                <span className='shop-banner-name'>{data.name}</span>
                <span className="shop-banner-count">{data.games_count}</span>
                <img className="banner-back" src={data.image_background} alt="" />
            </div>
        </div>
    )
}