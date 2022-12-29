import '../../assets/Home.css'
import { useState, useEffect } from 'react'

export default function Home() {
    const [frame , setFrame] = useState(0)
    const numOfFrames = 4

    const handleClick = (e) => {
        setFrame(+e.target.textContent)
    }

    useEffect(() => {
        document.querySelector('.nav-bar').classList.add('in-home')
        let timer = setInterval(()=>{
            setFrame(prevState=>{
                if(prevState<numOfFrames){
                  return prevState + 1
                }
                return 0
            })
        },15000)
        return () => { 
            clearTimeout(timer)
            document.querySelector('.nav-bar').classList.remove('in-home') 
        }
    }, [])

    return (
        <div className="home-banner-container">
            <div className="home-image-gallery">
                <div className="home-frames-container" style={{left: `-${frame * window.innerWidth}px`}}>
                    <img className={frame === 0 ? 'frame-active home-frame' : 'home-frame'} src="https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final.jpg" alt="Forza Horizon cover" />
                    <img className={frame === 1 ? 'frame-active home-frame' : 'home-frame'} src="https://rare-gallery.com/uploads/posts/190135-geralt-of-rivia-1920x1200.jpg" alt="The Witcher 3 cover" />
                    <img className={frame === 2 ? 'frame-active home-frame' : 'home-frame'} src="https://cdna.artstation.com/p/assets/images/images/033/037/886/large/artur-tarnowski-malemain.jpg?1608208334" alt="CyberPunk cover" />
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