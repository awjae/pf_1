import React, { useEffect } from 'react';
import 'mapbox-gl';
import initMap from './core/initMap';
import './Map.css';

function Map() {

    useEffect(() => {

        const key = process.env.MAPBOXGL_ACCESS_TOKEN;

        mapboxgl.accessToken = key;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-streets-v11', 
            center: [127.1214607, 37.3829765], 
            zoom: 18, 
            pitch: 60, //상하
            bearing: 0, //좌우
        });
        initMap.init(map);

    }, [])

    return (
        <div id="map">

        </div>
    )
}

export default Map
