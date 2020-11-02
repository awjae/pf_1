import React, { useState } from 'react';
import LeftNav from 'LeftNav';
import Map from './Map/Map';
import './css/BodyContents.css';

function BodyContents() {

    const [currMenu, setCurrMenu] = useState("");

    const handleSetCurrMenu = (el) => {
        if (currMenu === el) {
            setCurrMenu("");
        } else { 
            setCurrMenu(el) 
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
