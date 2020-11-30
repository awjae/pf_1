import React, { useState } from 'react'

function TourCard(props) {

    const [info, setInfo] = useState(props.item);

    console.log(props.imgTitle)

    return (
        <div className="TourCardImg__wrapper">
            <img src={props.url} width="180px" height="100px" className="TourCardImg"/>
            <span className="TourCardImg__title"> { props.imgTitle } </span>
        </div>
    )
}

export default TourCard
