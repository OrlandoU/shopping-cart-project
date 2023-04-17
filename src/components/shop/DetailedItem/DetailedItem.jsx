/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Tag from "./Tag"
import parse from 'html-react-parser'
import { InView } from "react-intersection-observer"
import Carrousel from "./carrousel"

export default function DetailedItem({ cartHasItem, removeCartItem, addCartItem }) {
    const [values, setValues] = useState([])
    const [checked, setChecked] = useState(false)
    const id = useParams().idItem


    const fetchItem = async (id) => {
        document.querySelector('.loading-screen').classList.add('visible')
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_API_KEY }`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchPosts = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/reddit?key=${process.env.REACT_APP_API_KEY }`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchImgs = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.REACT_APP_API_KEY }`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchVideos = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=${process.env.REACT_APP_API_KEY }`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const fetchGames = async (id) => {
        try {
            let response = await fetch(`https://api.rawg.io/api/games/${id}/game-series?key=${process.env.REACT_APP_API_KEY }`, { mode: 'cors' })
            let data = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    const handleClick = () => {
        if (cartHasItem(values.item)) {
            removeCartItem(values.item.id)
            setChecked(false)
        } else {
            addCartItem(values.item)
            setChecked(true)
        }
    }

    useEffect(() => {
        Promise.all([fetchImgs(id), fetchItem(id), fetchVideos(id), fetchGames(id), fetchPosts(id)]).then((values) => {
                const [images, item, videos, games, posts] = values
                setValues({ images, item, videos, games, posts })
                document.querySelector('.loading-screen').classList.remove('visible')
        })
        document.querySelector('.main-container').classList.add('in-item')
        document.querySelector('.nav-bar').classList.add('in-item')

        return () => {
            document.querySelector('.main-container').classList.remove('in-item')
            document.getElementById('root').style.backgroundImage = null;
            document.querySelector('.nav-bar').classList.remove('in-item')
            document.querySelector('.nav-bar').classList.remove('show')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    if (Object.keys(values).length) {
        document.getElementById('root').style.backgroundImage = `url(${values.item.background_image})`
        return (
            <div style={{ backgroundColor: `#${values.item.dominant_color}`, boxShadow: `0px -40px 40px 40px #${values.item.dominant_color}` }} className="detailedItem">
                <InView as='section' class='hover-info' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="left-side">
                        <img src={values.item.background_image} className='game-cover' alt="item cover" />
                    </div>
                    <div className="right-side">
                        <div className="item-header">{values.item.name}</div >
                        <div className="item-additional-info">
                            <span className="additional-info-rating">{values.item.rating}
                                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                    <path fill="orange" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                </svg></span>
                            {values.item.released && <span className="additional-info-meta">{values.item.released.split('-')[0]}</span>}
                            <span className="additional-info-esrb">{values.item.esrb_rating ? values.item.esrb_rating.name : 'Everyone'}</span>
                        </div>
                        <div className="short-description">{values.item.description_raw.split('.')[0].length < 120 ? values.item.description_raw.split('.')[0] + '. ' + values.item.description_raw.split('.')[1] : values.item.description_raw.split('.')[0]}</div>
                        <div className="price-button-container">
                            <span className="price-detail">{(values.item.metacritic ? values.item.metacritic.toFixed(2) : null) || (+values.item.score).toFixed(2)}$</span>
                            <button className="hero-button" onClick={handleClick}>{checked ? 'Remove from Cart' : 'Add to Cart'}</button>
                        </div>
                    </div>
                </InView>
                {values.videos.results.length ? <div class='video-container'>
                    <Carrousel items={values.videos.results} id='video' />
                </div> : null}

                <InView as='section' class='description' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="section-header">Description</div>
                    {parse(values.item.description)}
                </InView>
                <InView as='section' class='game-info' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <div className="shop-item-platforms"><strong className="section-header">Developers</strong> {values.item.developers.map(developer => <Tag filter='developers' id={developer.id} text={developer.name} />)}</div>
                    <div className="shop-item-platforms"><strong className="section-header">Publishers</strong> {values.item.publishers.map(publisher => <Tag filter='publishers' id={publisher.id} text={publisher.name} />)}</div>
                    <div className="shop-item-platforms"><strong className="section-header">Platforms</strong> {values.item.platforms.map(platform => <Tag filter='platforms' id={platform.platform.id} text={platform.platform.name} />)}</div>
                    <div className="shop-item-platforms"><strong className="section-header">Genres</strong> {values.item.genres.map(genre => <Tag filter='genres' id={genre.id} text={genre.name} />)}</div>
                </InView>

                <InView as='section' class='external-links' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                    <a href={values.item.website} className='official-website'>Official Website</a>
                    {values.item.reddit_url && <a href={values.item.reddit_url} className='reddit-website'>{values.item.reddit_name}</a>}
                </InView>

                {values.images.results.length && <div class='images-container section-visible'>
                    <Carrousel items={values.images.results} id='image' />
                </div>}



                <section class='more-games sectionVisible' >
                    <h3 className="section-header">More from the same Series</h3>

                    <div className="games-container">
                        {values.games.results.map(game => (
                            <Link className="game-series" to={`/shop/id/${game.id}`}>
                                <span className="game-name">{game.name}</span>
                                    <img src={game.background_image} alt="Game same franchise" />
                            </Link>
                        ))}
                    </div>
                </section>

                {
                    values.posts.results.length
                        ? <InView as='section' class='reddit' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                            <h3 className="section-header">Recent reddit posts</h3>
                            {values.posts.results.map(post => (
                                <div key={post.id} className="post" >
                                    <div className="post-left">
                                        <div className="post-header section-header">
                                            <span>{post.username}</span>
                                            <span>{post.created}</span>
                                        </div>
                                        <h6 className="post-header">{post.name}</h6>
                                    </div>

                                    {post.image ?<img className="post-image" src={post.image} alt="Reddit post image" />: null}
                                    <a className="post-button" href={post.url}>Go to Post</a>
                                </div>
                            ))}
                        </InView> : null
                }
            </div >
        )
    }
    return (null)

}