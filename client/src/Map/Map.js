import React, { useEffect } from 'react';
import 'mapbox-gl';
import initMap from './core/initMap';
import MapLeftSidebar from './component/MapLeftSidebar';
import './Map.css';

function Map(props) {
    
    useEffect(() => {

        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;
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

    //[Q]. 이렇게 사용하는게 맞는가?...
    const mapLaftEaseTo = (menuEl) => {
        initMap.leftNavEvent(menuEl)
    }

    return (
        <div id="map">
            <MapLeftSidebar 
                currMenu = { props.currMenu } 
                mapLaftEaseTo = { mapLaftEaseTo } />
        </div>
    )
}

export default Map
