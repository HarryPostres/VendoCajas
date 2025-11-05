import {useState} from 'react'
import './Carousel.css'

export default function Carousel ({images}) {
    const [current, setCurrent] = useState(0)

    cont nextSlide = () => {
        setCurrent((prev) => (prev +1) % images.length)
}

const prevSlide = () => {
    setCurrent((prev) => (prev -1 + images.length) % images.lengtuh)
}

return (
    <div className= "carousel-container">
        <button classname="nav-btn left" onClick={prevSlide}>❮</button>

        <div>
            <img src="" alt="" />