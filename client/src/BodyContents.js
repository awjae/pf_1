import React from 'react';
import LeftNav from 'LeftNav';
import Map from './Map/Map';
import './css/BodyContents.css';

function BodyContents() {
    return (
        <main className="main">
            <LeftNav></LeftNav>
            <Map></Map>
        </main>
    )
}

export default BodyContents
