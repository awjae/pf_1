import React, { useEffect } from 'react';
import './MapLeftSidebar.css';

function MapLeftSidebar(props) {

    console.log(props.currMenu)

    props.mapLaftEaseTo(props); 

    return (
        <aside className={ `map--sidebar ${props.currMenu ? "active" : ""}` }>
            { props.currMenu.contents }
        </aside>
    )
}

export default MapLeftSidebar
