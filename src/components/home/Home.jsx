import '../../assets/Home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const [frame, setFrame] = useState(0)
    const numOfFrames = 4

    const handleClick = (e) => {
        setFrame(+e.target.textContent)
    }

    useEffect(() => {
        document.querySelector('.nav-bar').classList.add('in-home')
        let timer = setInterval(() => {
            setFrame(prevState => {
                if (prevState < numOfFrames) {
                    return prevState + 1
                }
                return 0
            })
        }, 10000)
        return () => {
            clearTimeout(timer)
            document.querySelector('.nav-bar').classList.remove('in-home')
            document.querySelector('.nav-bar').classList.remove('show')
        }
    }, [])

    return (

        <div className="home-banner-container">
            <div className="home-modal">
                <h1 className='home-header'>Welcome to ReactZ</h1>
                <p className='home-text'>Here at ReactZ, we offer a wide selection of the latest and greatest games for all platforms. From PC and console to mobile and VR, we've got you covered. Check out our featured games below or use the navigation menu to browse through different categories.</p>
                <Link to='/shop'><button className='home-button'>Browse Games</button></Link>
            </div>
            <div className="home-image-gallery">
                <div className="home-frames-container" style={{ left: `-${frame * window.innerWidth}px` }}>
                    <img className={frame === 0 ? 'frame-active home-frame' : 'home-frame'} src="https://cdna.artstation.com/p/assets/images/images/033/037/886/large/artur-tarnowski-malemain.jpg?1608208334" alt="CyberPunk cover" />
                    <img className={frame === 1 ? 'frame-active home-frame' : 'home-frame'} src="https://www.xtrafondos.com/descargar.php?id=3406&resolucion=3840x2160" alt="MK11 cover" />
                    <img className={frame === 2 ? 'frame-active home-frame' : 'home-frame'} src="https://4kwallpapers.com/images/wallpapers/diablo-iv-lilith-diablo-4-2022-games-2880x1800-5969.png" alt="Diablo 4 cover" />
                    <img className={frame === 3 ? 'frame-active home-frame' : 'home-frame'} src="https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg" alt='GTA 5 Cover' />
                    <img className={frame === 4 ? 'frame-active home-frame' : 'home-frame'} src="https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg" alt='Dark Souls 3 Cover' />
                    <img className={frame === 5 ? 'frame-active home-frame' : 'home-frame'} src="https://static0.srcdn.com/wordpress/wp-content/uploads/2022/03/Minecraft-cover-art-with-players-enemies-and-animals.jpg" alt="Minecraft cover" />
                </div>
                <span className="home-control-buttons">
                    <span className={frame === 0 ? 'frame-button' : null} onClick={handleClick}>0</span>
                    <span className={frame === 1 ? 'frame-button' : null} onClick={handleClick}>1</span>
                    <span className={frame === 2 ? 'frame-button' : null} onClick={handleClick}>2</span>
                    <span className={frame === 3 ? 'frame-button' : null} onClick={handleClick}>3</span>
                    <span className={frame === 4 ? 'frame-button' : null} onClick={handleClick}>4</span>
                </span>
            </div>
        </div>
    )
}