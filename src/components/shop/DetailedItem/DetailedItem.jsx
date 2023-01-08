import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Tag from "./Tag"
import parse from 'html-react-parser'
import { InView } from "react-intersection-observer"
import Carrousel from "./carrousel"

export default function DetailedItem({ cartHasItem, removeCartItem, addCartItem }) {
    const [values, setValues] = useState([])
    const [images, item, videos, games, posts] = values
    const [checked, setChecked] = useState(false)
    const id = useParams().idItem


    const fetchItem = async (id) => {
        document.querySelector('.loading-screen').classList.add('visible')
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}?key=a1922842dfc24abb9c57b3377ecc5774`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchPosts = async (id) => {
        document.querySelector('.loading-screen').classList.add('visible')
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/reddit?key=a1922842dfc24abb9c57b3377ecc5774`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchImgs = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=a1922842dfc24abb9c57b3377ecc5774`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchVideos = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=a1922842dfc24abb9c57b3377ecc5774`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchGames = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/game-series?key=a1922842dfc24abb9c57b3377ecc5774`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const handleClick = () => {
        if (cartHasItem(item)) {
            console.log('done')
            removeCartItem(item.id)
            setChecked(false)
        } else {
            console.log()
            addCartItem(item)
            setChecked(true)
        }
    }

    useEffect(() => {
        document.querySelector('.main-container').classList.add('in-item')
        document.querySelector('.nav-bar').classList.add('in-item')
        Promise.all([fetchImgs(id), fetchItem(id), fetchVideos(id), fetchGames(id), fetchPosts(id)]).then((values) => {
            setValues(values)
            document.querySelector('.loading-screen').classList.remove('visible')
        })

        return () => {
            document.querySelector('.main-container').classList.remove('in-item')
            document.getElementById('root').style.backgroundImage = null;
            document.querySelector('.nav-bar').classList.remove('in-item')
            document.querySelector('.nav-bar').classList.remove('show')
        }
    }, [id])



    if (values.length) {
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
                            {item.released && <span className="additional-info-meta">{item.released.split('-')[0]}</span>}
                            <span className="additional-info-esrb">{item.esrb_rating ? item.esrb_rating.name : 'Everyone'}</span>
                        </div>
                        <div className="short-description">{item.description_raw.split('.')[0].length < 120 ? item.description_raw.split('.')[0] + '. ' + item.description_raw.split('.')[1] : item.description_raw.split('.')[0]}</div>
                        <div className="price-button-container">
                            <span className="price-detail">{(item.metacritic ? item.metacritic.toFixed(2) : null) || (+item.score).toFixed(2)}$</span>
                            <button className="hero-button" onClick={handleClick}>{checked ? 'Remove from Cart' : 'Add to Cart'}</button>
                        </div>
                    </div>
                </InView>
                {videos.results.length ? <InView as='div' class='video-container' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <Carrousel items={videos.results} id='video' />
                </InView> : null}

                <InView as='section' class='description' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="section-header">Description</div>
                    {parse(item.description)}
                </InView>
                <InView as='section' class='game-info' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="shop-item-platforms"><strong className="section-header">Developers</strong> {item.developers.map(developer => <Tag filter='developers' id={developer.id} text={developer.name} />)}</div>
                    <div className="shop-item-platforms"><strong className="section-header">Publishers</strong> {item.publishers.map(publisher => <Tag filter='publishers' id={publisher.id} text={publisher.name} />)}</div>
                    <div className="shop-item-platforms"><strong className="section-header">Platforms</strong> {item.platforms.map(platform => <Tag filter='platforms' id={platform.platform.id} text={platform.platform.name} />)}</div>
                    <div className="shop-item-platforms"><strong className="section-header">Genres</strong> {item.genres.map(genre => <Tag filter='genres' id={genre.id} text={genre.name} />)}</div>
                </InView>

                <InView as='section' class='external-links' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <a href={item.website} className='official-website'>Official Website</a>
                    {item.reddit_url &&<a href={item.reddit_url} className='reddit-website'>{item.reddit_name}</a>}
                </InView>

                {images.results.length && <InView as='div' class='images-container' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <Carrousel items={images.results} id='image' />
                </InView>}

                

                <InView as='section' class='more-games' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <h3 className="section-header">More from the same Series</h3>
                    <div className="games-container">
                        {games.results.map(game => (
                            <Link className="game-series" to={`/shop/id/${game.id}`}>
                                <span className="game-name">{game.name}</span>
                                <img src={game.background_image} alt="Game same franchise" />
                            </Link>
                        ))}
                    </div>
                </InView>

                {posts.results.length ?<InView as='section' class='reddit' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <h3 className="section-header">Recent reddit posts</h3>
                    {posts.results.map(post => (
                        <a className="post" href={post.url}>
                            <div className="post-left">
                                <div className="post-header section-header">
                                    <span>{post.username}</span>
                                    <span>{post.created}</span>
                                </div>
                                <h6 className="post-header">{post.name}</h6>
                                {parse(post.text)}
                            </div>
                            {post.image && <img className="post-image" src={post.image} alt="Reddit post image" />}
                        </a>
                    ))}
                </InView> : null}
            </div>
        )
    }
    return (null)

}