import React, { useEffect } from 'react';
import './MapLeftSidebar.css';

function MapLeftSidebar(props) {

    useEffect(() => {

        console.log(props.currMenu)

    }, [])

    return (
        <aside className={ "map--sidebar" + props.currMenu ? ".active" : "" }>
            
        </aside>
    )
}

export default MapLeftSidebar
