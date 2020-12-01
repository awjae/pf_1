import React from 'react';
import { Close } from '@material-ui/icons';
import './TourPage.css';

function TourModal(props) {

    return (
        <section className="TourModal"
            style={{  
                backgroundImage: `url("${props.imgInfo.galWebImageUrl}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            <span className="TourModal__closer" onClick={() => props.tourModalHandler(null)}><Close></Close></span>
        </section>
    )
}

export default TourModal
