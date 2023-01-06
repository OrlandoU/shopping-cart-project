import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Tag from "./Tag"
import parse from 'html-react-parser'
import { InView} from "react-intersection-observer"
import Carrousel from "./carrousel"

export default function DetailedItem() {
    const [item, setItem] = useState({})
    const [images, setImages] = useState({})
    const [loaded, setLoaded] = useState(false)
    
    const id = useParams().idItem
    

    const fetchItem = async (id) => {
        document.querySelector('.loading-screen').classList.add('visible')
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}?key=a1922842dfc24abb9c57b3377ecc5774`, { mode: 'cors' })
            let data = await response.json()
            console.log(data)
            setItem(data)
        } catch (error) {
            throw error
        }
        return
    }

    const fetchImgs = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=a1922842dfc24abb9c57b3377ecc5774`, { mode: 'cors' })
            let data = await response.json()
            console.log(data)
            setImages(data)
        } catch (error) {
            throw error
        }
        return
    }

    useEffect(() => {
        document.querySelector('.main-container').classList.add('in-item')
        document.querySelector('.nav-bar').classList.add('in-item')
        Promise.all([fetchImgs(id), fetchItem(id)]).then(() => {
            setLoaded(true)
            document.querySelector('.loading-screen').classList.remove('visible')
        })

        return () => {
            document.querySelector('.main-container').classList.remove('in-item')
            document.getElementById('root').style.backgroundImage = null;
            document.querySelector('.nav-bar').classList.remove('in-item')
            document.querySelector('.nav-bar').classList.remove('show')
        }
    }, [])



    if (loaded) {
        document.getElementById('root').style.backgroundImage = `url(${item.background_image})`
        return (
            <div style={{ backgroundColor: `#${item.dominant_color}`, boxShadow: `0px -40px 40px 40px #${item.dominant_color}` }} className="detailedItem">
                <InView as='section' class='hover-info' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="left-side">
                        <img src={item.background_image} className='game-cover' alt="item cover" />
                    </div>
                    <div className="right-side">
                        <div className="item-header">{item.name}</div >
                        <div className="item-additional-info">
                            <span className="additional-info-rating">{item.rating}
                                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                    <path fill="orange" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                </svg></span>
                            <span className="additional-info-meta">{item.released.split('-')[0]}</span>
                            <span className="additional-info-esrb">{item.esrb_rating.name}</span>
                        </div>
                        <div className="short-description">{item.description_raw.split('.')[0].length < 120 ? item.description_raw.split('.')[0] + '. ' + item.description_raw.split('.')[1] : item.description_raw.split('.')[0]}</div>
                        <button className="hero-button">Add to Cart</button>
                    </div>
                </InView>
                <InView as='div' class='images-container' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <Carrousel items={images.results} id='image'/>
                </InView>
                <InView as='section' class='game-info' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="shop-item-platforms"><strong>Developer:</strong> {item.developers.map(developer => <Tag filter='developers' id={developer.id} text={developer.name} />)}</div>
                    <div className="shop-item-platforms"><strong>Platforms:</strong> {item.platforms.map(platform => <Tag filter='platforms' id={platform.platform.id} text={platform.platform.name} />)}</div>
                    <div className="shop-item-platforms"><strong>Genres:</strong> {item.genres.map(genre => <Tag filter='genres' id={genre.id} text={genre.name} />)}</div>
                    <p><strong>Release Date:</strong> {item.released}</p>
                    
                </InView>
                <InView as='section' class='reviews' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="section-header">Description</div>
                    {parse(item.description)}
                </InView>
                <InView as='section' class='screenshots' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <h3>Screenshots</h3>
                    <img src="screenshot1.jpg" alt="Screenshot 1" />
                    <img src="screenshot2.jpg" alt="Screenshot 2" />
                    <img src="screenshot3.jpg" alt="Screenshot 3" />
                </InView>
                
                <InView as='section' class='reviews' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <h3>Reviews</h3>
                    <p><strong>Critic Review 1:</strong> "Game Title is a must-play for fans of the genre. The gameplay is smooth and the story is captivating."</p>
                    <p><strong>Critic Review 2:</strong> "Game Title delivers on all fronts. The graphics are stunning and the characters are well-developed."</p>
                    <p><strong>User Review 1:</strong> "I couldn't put this game down! The controls were intuitive and the story kept me hooked."</p>
                    <p><strong>Overall Rating:</strong> 4.5/5</p>
                </InView>
            </div>
        )
    }
    return (null)

}