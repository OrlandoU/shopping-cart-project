import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Tag from "./Tag"
import parse from 'html-react-parser'

export default function DetailedItem() {
    const [item, setItem] = useState({})
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
        setLoaded(true)
        document.querySelector('.loading-screen').classList.remove('visible')
    }

    useEffect(() => {
        document.querySelector('.nav-bar').classList.add('in-item')
        fetchItem(id)
        return () => {
            document.querySelector('.nav-bar').classList.remove('in-item')
            document.querySelector('.nav-bar').classList.remove('show')
        }
    }, [])

    if (loaded) {
        return (
            <div className="detailedItem">
                <section class="hero-container">
                    <img src={item.background_image} className='hero-image' alt="Game Title" />
                    <div className="hero-info">
                        <div className="item-header">{item.name}</div >
                        <button className="hero-button">Add to Cart</button>
                    </div>
                </section>
                <section class="game-info">
                    <div className="shop-item-platforms"><strong>Developer:</strong> {item.developers.map(developer => <Tag filter='developers' id={developer.id} text={developer.name} />)}</div>
                    <div className="shop-item-platforms"><strong>Platforms:</strong> {item.platforms.map(platform => <Tag filter='platforms' id={platform.platform.id} text={platform.platform.name} />)}</div>
                    <div className="shop-item-platforms"><strong>Genres:</strong> {item.genres.map(genre => <Tag filter='genres' id={genre.id} text={genre.name} />)}</div>
                    <p><strong>Release Date:</strong> {item.released}</p>
                    {parse(item.description)}
                </section>
                <section class="screenshots">
                    <h3>Screenshots</h3>
                    <img src="screenshot1.jpg" alt="Screenshot 1" />
                    <img src="screenshot2.jpg" alt="Screenshot 2" />
                    <img src="screenshot3.jpg" alt="Screenshot 3" />
                </section>
                <section class="reviews">
                    <h3>Reviews</h3>
                    <p><strong>Critic Review 1:</strong> "Game Title is a must-play for fans of the genre. The gameplay is smooth and the story is captivating."</p>
                    <p><strong>Critic Review 2:</strong> "Game Title delivers on all fronts. The graphics are stunning and the characters are well-developed."</p>
                    <p><strong>User Review 1:</strong> "I couldn't put this game down! The controls were intuitive and the story kept me hooked."</p>
                    <p><strong>Overall Rating:</strong> 4.5/5</p>
                </section>
                <section class="purchase-options">
                    <h3>Purchase Options</h3>
                    <h4>Digital Download</h4>
                    <p>$59.99</p>
                    <button>Add to Cart</button>
                    <h4>Physical Copy</h4>
                    <p>$69.99</p>
                    <button>Add to Cart</button>
                    <h4>Special Edition</h4>
                    <p>$79.99</p>
                    <button>Add to Cart</button>
                </section>
                <section class="related-games">
                    <h3>Related Games</h3>
                </section>
            </div>
        )
    }
    return (null)

}