import React, { useEffect } from 'react';
import './MapLeftSidebar.css';

function MapLeftSidebar(props) {

    return (
        <aside className={ `map--sidebar ${props.currMenu ? "active" : ""}` }>
            { props.currMenu }            
        </aside>
    )
}

export default MapLeftSidebar
