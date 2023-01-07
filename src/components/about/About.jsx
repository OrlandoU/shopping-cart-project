import { useEffect } from 'react'
import '../../assets/About.css'
import { InView } from 'react-intersection-observer'



export default function About() {
    useEffect(() => {
        document.querySelector('.nav-bar').classList.add('in-about')

        return () => {
            document.querySelector('.nav-bar').classList.remove('in-about')
            document.querySelector('.nav-bar').classList.remove('show')
        }
    }, [])

    return (
        <div className='about-container'>
            <InView as='div' className='sub-container' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                <h2 className='about-title'>React Zone About Page</h2>
                <div className="about-text-container">
                    <p className='text-container'>Welcome to React Zone, the ultimate destination for all your gaming needs. Our app was developed as a personal project by Orlando Umanzor as part of the curriculum of The Odin Project,  with the goal of providing an easy and convenient way for gamers to discover and purchase the latest and greatest games.</p>
                    <img src="https://cdn.dribbble.com/users/553013/screenshots/11118619/top-logo_4x.png" alt="The Odin Project Logo" />
                    <img src="http://www.digitiser2000.com/uploads/4/0/6/6/40667199/published/covers.jpeg?1516612602" alt="Games Covers" />
                    <p className='text-container'>Videogame Store App is an online platform for purchasing and discovering videogames. Initially built as a personal project, this app was later included as part of the curriculum of <a href="https://www.theodinproject.com/">The Odin Project</a> as a way to further develop and showcase my skills in web development. The app is designed to provide users with a convenient and user-friendly way to browse and purchase games.</p>
                </div>
            </InView>
            <div className="about-me sub-container">

            </div>
            <InView as='div' class='sub-container' onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                <h2 className='about-title'>Features</h2>
                <ul className='features-ul'>
                    <li>Browse a catalog of videogames by genre, platform, and other criteria</li>
                    <li>View detailed information about each game, including screenshots, descriptions, and user reviews</li>
                    <li>Add games to a wishlist or shopping cart and check out securely using a payment gateway</li>
                </ul>
            </InView>
            <InView className="about-tech sub-container" onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                <h2 className='about-title'>Technology Used</h2>
                <p>This app is built using React, a popular JavaScript library for building user interfaces, on the front-end. React allows for efficient rendering of components and a flexible structure for building complex and interactive applications. To access data and functionality, this app utilizes various APIs. APIs, or application programming interfaces, are essentially interfaces that allow different systems or software to communicate and exchange data. In this case, we are using APIs to access data about videogames, such as game information, images, and user reviews.</p>
                <p>In addition to React and APIs, this app also utilizes react-router, a library that allows for routing within a React application. This allows users to navigate to different pages and content within the app without the need for reloading the entire page. The app is also hosted on a cloud platform and utilizes a database to store user and game data, such as accounts, wishlists, and reviews.</p>
                <p>I am constantly working to improve the app and add new features, and I welcome any suggestions or feedback from users. If there are any specific features or technologies that you would like to see implemented, please don't hesitate to contact me.</p>
            </InView>
            <InView className="about-contact sub-container" onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                <h2 className='about-title'>Contact</h2>
                <p>If you have any questions or feedback about ReactZ, please don't hesitate to contact me at <a href="mailto:orlandojose729@gmail.com">orlandojose729@gmail.com</a>. I am always looking for ways to improve the app and make it the best it can be, and your input is valuable to me.</p>
                <ul className="social-medias">
                    <li><a href="#">
                        <img src="data:image/png;base64,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" alt="" srcset="" />
                    </a></li>
                </ul>
            </InView>
            <InView className="thanks-message" onChange={(inView, entry) => { (inView && entry.target.classList.add('sectionVisible')) }}>
                Thank you for choosing React Zone for all your gaming needs!
            </InView>
        </div>
    )
}