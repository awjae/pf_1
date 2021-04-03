import React, { useState } from 'react'
import initMap from '../../Map/core/initMap';

function TourCard(props) {

    const [info, setInfo] = useState(props.item);

    const tourItemClick = () => {
        props.tourModalHandler(info);
    }

    return (
        <div className="TourCardImg__wrapper" onClick={ tourItemClick }>
            <img src={props.url} width="180px" height="100px" className="TourCardImg"/>
            <span className="TourCardImg__title"> { props.imgTitle } </span>
        </div>
    )
}

export default TourCard
