import React, { useEffect } from 'react';
import 'mapbox-gl';
import initMap from './core/initMap';
import MapLeftSidebar from './component/MapLeftSidebar';
import './Map.css';
import { Route } from 'react-router-dom';
import Mypage from '../component/Mypage/MyPage';
import SearchPage from '../component/SearchPage/SearchPage';
import RoutingPage from '../component/RoutingPage/RoutingPage';
import TourPage from '../component/TourPage/TourPage';
import BookMarkPage from '../component/BookMarkPage/BookMarkPage';
import LayerPage from '../component/LayerPage/LayerPage';

function Map() {
    
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

    //leftMenu-Route
    return (
        <div id="map">
            <Route path="/mypage" render={() => <MapLeftSidebar mapLaftEaseTo={mapLaftEaseTo} currMenu = { <Mypage /> } /> } />
            <Route path="/searchPage" render={() => <MapLeftSidebar mapLaftEaseTo={mapLaftEaseTo} currMenu = { <SearchPage /> } /> } /> 
            <Route path="/routing" render={() => <MapLeftSidebar mapLaftEaseTo={mapLaftEaseTo} currMenu = { <RoutingPage /> } /> } /> 
            <Route path="/trip" render={() => <MapLeftSidebar mapLaftEaseTo={mapLaftEaseTo} currMenu = { <TourPage /> } /> } /> 
            <Route path="/tools" render={() => <MapLeftSidebar mapLaftEaseTo={mapLaftEaseTo} currMenu = { <LayerPage /> } /> } />
            <Route path="/favorite" render={() => <MapLeftSidebar mapLaftEaseTo={mapLaftEaseTo} currMenu = { <BookMarkPage /> } /> } />  
        </div>
    )
}

export default Map
