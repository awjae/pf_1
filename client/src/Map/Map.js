import React, { useEffect } from 'react';
import 'mapbox-gl';
import './Map.css';

function Map() {

    useEffect(() => {

        const key = process.env.MAPBOXGL_ACCESS_TOKEN;

        mapboxgl.accessToken = key;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
            center: [127, 37.5], // starting position [lng, lat]
            zoom: 12 // starting zoom
        });

    }, [])

    return (
        <div id="map">

        </div>
    )
}

export default Map
