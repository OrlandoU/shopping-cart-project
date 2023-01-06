import { useState, useEffect } from "react"

export default function Carrousel({items, id, src}){
    const [offset, setOffset] = useState(1)

    useEffect(()=>{
        document.querySelector('.carrousel-items').style.left = `${((offset * - getWidths()[1]) + ((getWidths()[0] - getWidths()[1]) / 2))}px`
        const allImages = document.querySelectorAll('.carrousel-item')
        allImages.forEach(image => image.classList.remove('carrousel-main-item'))
        document.getElementById(`${offset}`).classList.add('carrousel-main-item')
    })

    useEffect(() => {
        document.querySelector('.carrousel-items').style.left = `${((offset * - getWidths()[1]) + ((getWidths()[0] - getWidths()[1]) / 2))}px`
        const allImages = document.querySelectorAll('.carrousel-item')
        allImages.forEach(image => image.classList.remove('carrousel-main-item'))
        document.getElementById(`${offset}`).classList.add('carrousel-main-item')
    }, [offset])

    const handleLeftClick = () => {
        setOffset(prevState => {
            if (prevState >= 1) {
                return prevState - 1
            }
            return prevState
        })
    }

    const getWidths = () =>{
        const parentElement = document.getElementById(id)
        const childElement = document.querySelector(`#${id}>.carrousel-items>img`)
        return [parentElement.offsetWidth, childElement.offsetWidth]
    }

    const handleRightClick = () => {
        setOffset(prevState => {
            if (prevState < items.length - 1) {
                return prevState + 1
            }
            return prevState
        })
    }

    return (
    <div className="carrousel-container" id={id}>
            {(offset !== 0) &&
                <span className="left-image" onClick={handleLeftClick}>
                    <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                    </svg>
                </span>}
            {(offset < items.length - 1) &&
                <span className="right-image" onClick={handleRightClick}>
                    <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                </span>}
            <div className="carrousel-items">
                {items.map((element, index) => (
                    <img className="carrousel-item" id={index} src={element[id]} alt="" srcset="" />
                ))}
            </div>
    </div>
    )
}