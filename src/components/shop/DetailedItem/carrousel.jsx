import { useState, useEffect} from "react"

export default function Carrousel({ items, id }) {
    const [offset, setOffset] = useState(items.length > 2 ? 1 : 0)


    const updateCarrousel = () => {
          document.querySelector(`#${id} .carrousel-items`).style.left = `${((offset * - getWidths()[1]) + ((getWidths()[0] - getWidths()[1]) / 2))}px`
          const allImages = document.querySelectorAll(`#${id} .carrousel-item`)
          allImages.forEach(image => {
              image.classList.remove('carrousel-main-item')
              if (!image.paused && id === 'video') {
                  image.pause()
              }
          })
          document.getElementById(`${offset + id}`).classList.add('carrousel-main-item')
          if (id === 'video') document.getElementById(`${offset + id}`).play()
    }

    useEffect(() => {
        updateCarrousel()
        let timer = setTimeout(updateCarrousel, 300)
        return ()=>clearTimeout(timer)
         //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])

    const handleLeftClick = () => {
        setOffset(prevState => {
            if (prevState >= 1) {
                return prevState - 1
            }
            return prevState
        })
    }

    const getWidths = () => {
        const parentElement = document.getElementById(id)
        const childElement = document.querySelector(`#${id}>.carrousel-items>${id === 'video' ? 'video' : 'img'}`)
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
                <>
                    {id === 'image'
                        ? items.map((element, index) => <img key={element[id]} className="carrousel-item" id={index + id} src={element[id]} alt="" />)
                        : items.map((element, index) =>
                            <video key={element.preview} className="carrousel-item" id={index + id} controls poster={element.preview}>
                                <source src={element.data.max} type="video/mp4" />
                            </video>)
                }
                </>
            </div>

        </div>
    )
}