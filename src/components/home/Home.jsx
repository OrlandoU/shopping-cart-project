import '../../assets/Home.css'
import { useState, useEffect } from 'react'

export default function Home() {
    const [frame , setFrame] = useState(0)
    const numOfFrames = 3

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
        },10000)
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
                    <img className={frame === 1 ? 'frame-active home-frame' : 'home-frame'} src="https://i0.wp.com/www.gamerfocus.co/wp-content/uploads/2015/04/The-Witcher-III-Wild-Hunt.jpeg?fit=1920%2C1080&ssl=1" alt="The Witcher 3 cover" />
                    <img className={frame === 2 ? 'frame-active home-frame' : 'home-frame'} src="https://cdna.artstation.com/p/assets/images/images/033/037/886/large/artur-tarnowski-malemain.jpg?1608208334" alt="CyberPunk cover" />
                    <img className={frame === 3 ? 'frame-active home-frame' : 'home-frame'} src="https://i.pinimg.com/originals/29/a0/b4/29a0b495840516b71597e6674fe72256.jpg" alt="Minecraft cover" />
                </div>
                <span className="home-control-buttons">
                    <span className={frame === 0 ? 'frame-button' : null} onClick={handleClick}>0</span>
                    <span className={frame === 1 ? 'frame-button' : null} onClick={handleClick}>1</span>
                    <span className={frame === 2 ? 'frame-button' : null} onClick={handleClick}>2</span>
                    <span className={frame === 3 ? 'frame-button' : null} onClick={handleClick}>3</span>
                </span>
            </div>
        </div>
    )
}