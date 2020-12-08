import React from 'react';
import './MapLeftSidebar.css';

function MapLeftSidebar(props) {

    props.mapLaftEaseTo(props); 

    return (
        <aside className={ `map--sidebar ${props.currMenu ? "active" : ""}` }>
            { props.currMenu }
        </aside>
    )
}

export default MapLeftSidebar
