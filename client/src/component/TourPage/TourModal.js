import React from 'react';
import { Close, Star } from '@material-ui/icons';
import './TourPage.css';
import initMap from '../../Map/core/initMap';

function TourModal(props) {

    const bookmarkHandler = () => {
        console.log(props)
        const name = props.imgInfo.galTitle;
        console.log(initMap.map.getCenter());

    }

    return (
        <section className="TourModal"
            style={{  
                backgroundImage: `url("${props.imgInfo.galWebImageUrl}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            <span className="TourModal__marker" onClick={() => bookmarkHandler()} title="즐겨찾기 등록"><Star></Star></span>
            <span className="TourModal__closer" onClick={() => props.tourModalHandler(null)}><Close></Close></span>
        </section>
    )
}

export default TourModal
