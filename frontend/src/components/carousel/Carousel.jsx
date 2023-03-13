import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { useState } from 'react'
import './carousel.css'

export const Carousel = () => {
    const [carouselContent, setCarouselContent] = useState([
        {
            title: "GLC 300",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, in",
            image: "assets/carousel/1.png"
        },
        {
            title: "XYZ 123",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, doloremque",
            image: "assets/carousel/2.png"
        }
    ])

    const [i, setI] = useState(0)

    const [carouselSelect, setCarouselSelect] = useState(carouselContent[i])

    const navigateNext = () => {
        setI(prevI => (prevI + 1) % carouselContent.length)
        setCarouselSelect(carouselContent[i])
    }

    const navigatePrevious = () => {
        setI(prevI => (prevI - 1 + carouselContent.length) % carouselContent.length)
        setCarouselSelect(carouselContent[i])
    }

    return (
        <div className='carouselWrapper'>
            <div className="carouselContainer">
                <NavigateBefore className='carouselNavigationLeft' onClick={navigatePrevious} />
                <div className="carouselForeground">
                    <div className="carouselTexts">
                        <span className="carouselTitle">{carouselSelect.title}</span>
                        <p className="carouselDescription">{carouselSelect.description}</p>
                        <span className="carouselMore">More</span>
                    </div>
                    <img src={carouselSelect.image} alt="" className="carouselImage" />
                </div>
                <NavigateNext className='carouselNavigationRight' onClick={navigateNext} />
            </div>
            <div className="otherCarouselContentWrapper">
                <div className="otherCarouselContent">
                    <div className="otherContent otherContent1">
                        <span className="other1Title">Porche 911</span>
                        <img src="assets/otherContent/1.png" alt="" className="otherImg other1Image" />
                    </div>
                    <div className="otherContent otherContent2">
                        <span className="other2Title">BMW M5 CSL</span>
                        <img src="assets/otherContent/2.png" alt="" className="otherImg other2Image" />
                    </div>
                    <div className="otherContent otherContent3">
                        <span className="other3Title">Bugatti Veyron</span>
                        <img src="assets/otherContent/3.png" alt="" className="otherImg other3Image" />
                    </div>
                </div>
            </div>
        </div>
    )
}
