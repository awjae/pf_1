import React from 'react';
import { useState, useEffect } from 'react';
import initMap from '../../Map/core/initMap';
import './SearchCard.css';

function SearchCard(props) {

    const [address, setAddress] = useState({});
    const [point, setPoint] = useState([]);

    useEffect(() => {
        setAddress(props.address);
        setPoint(props.point);
    }, [])

    const setMapCenter = (lngLat) => {
        console.log(lngLat)
        initMap.setCenter(lngLat.x, lngLat.y);
    } 

    return (
        <div className="SearchCard">
            <p className="SearchCard__title" onClick={() => setMapCenter(point) }>
                { address.bldnm }
            </p>
            <p className="SearchCard__subTitle">
                { address.road }
            </p>
        </div>
    )
}

export default SearchCard
