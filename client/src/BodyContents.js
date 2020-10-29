import React, { useState } from 'react';
import LeftNav from 'LeftNav';
import Map from './Map/Map';
import './css/BodyContents.css';

function BodyContents() {

    const [currMenu, setCurrMenu] = useState("");

    const handleSetCurrMenu = (name) => {
        if (currMenu === name) {
            setCurrMenu("");
        } else { 
            setCurrMenu(name) 
        };
    }
    
    return (
        <main className="main">
            <LeftNav
                setCurrMenu = { handleSetCurrMenu }
                >
            </LeftNav>
            <Map
                currMenu = { currMenu }>
            </Map>
        </main>
    )
}

export default BodyContents
