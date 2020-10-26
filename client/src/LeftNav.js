import React from 'react';
import './css/LeftNav.css';

function LeftNav() {
    return (
        <aside>
             <nav className="menu" id="menu">
            </nav>
            <div className="info" id="info">
                <ol className="info--contents" id="info--contents" style={{ overflow: 'auto' }} >
                </ol>
            </div>
        </aside>
    )
}

export default LeftNav
