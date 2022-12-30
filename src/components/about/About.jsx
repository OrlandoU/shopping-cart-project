import { useEffect } from 'react'
import '../../assets/About.css'



export default function About() {
    useEffect(() => {
        document.querySelector('.nav-bar').classList.add('in-about')

        return ()=>{
            document.querySelector('.nav-bar').classList.remove('in-about')
            document.querySelector('.nav-bar').classList.remove('show')
        }
    }, [])

    return (
        <div className='about-container'>
            <div className="about-hero-container">
                <h2 className='about-hero-title'>Who we are</h2>
                <div className="about-banners">
                    <div className='about-banner'>We are a team of dedicated gamers and enthusiasts who are passionate about providing the best selection of games to our customers. Our store is stocked with the latest and greatest titles for all major gaming platforms, as well as a wide variety of tabletop and card games.</div>
                    <div className='about-banner'style={{marginTop: '30px'}}>Whether you're looking for the latest blockbuster release or a classic board game, we have something for everyone. Our friendly and knowledgeable staff is always on hand to help you find the perfect game for your needs.</div>
                    <div className='about-banner'>We believe in the power of gaming to bring people together and provide endless entertainment. We are proud to offer a wide variety of games that cater to all interests and skill levels.</div>
                </div>
            </div>
            <div className="about-introduction">
                <h3 className='about-title'>React Zone About Page</h3>
                <div className="about-text-container">
                    <p>Welcome to React Zone, the ultimate destination for all your gaming needs. Our app was developed as a personal project by Orlando Umanzor as part of the curriculum of The Odin Project,  with the goal of providing an easy and convenient way for gamers to discover and purchase the latest and greatest games.</p>
                    <img src="https://cdn.dribbble.com/users/553013/screenshots/11118619/top-logo_4x.png" alt="The Odin Project Logo" />
                    <img src="http://www.digitiser2000.com/uploads/4/0/6/6/40667199/published/covers.jpeg?1516612602" alt="Games Covers" />
                    <p>With React Zone, you can browse and purchase a wide variety of games for various platforms, such as PC, consoles, and mobile devices. Not only is React Zone convenient and easy to use, but it also offers numerous benefits for customers. You can shop for games from the comfort of your own home, </p>
                    <p>As the developer of React Zone, Orlando Umanzor is dedicated to delivering an excellent gaming experience to all users.</p>
                </div>
            </div>
            <div className="about-me">
            </div>
            <div className="about-contact">

            </div>
            <div className="thanks-message">
                Thank you for choosing React Zone for all your gaming needs!
            </div>
        </div>
    )
}