import React, { useEffect } from 'react';
import './MapLeftSidebar.css';

function MapLeftSidebar(props) {

    props.mapLaftEaseTo(props.currMenu); 

    return (
        <aside className={ `map--sidebar ${props.currMenu ? "active" : ""}` }>
            { props.currMenu.contents }              
        </aside>
    )
}

export default MapLeftSidebar
