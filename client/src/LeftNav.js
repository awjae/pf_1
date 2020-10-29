import  React, { useState, useEffect } from 'react';
import { Search, Flag, CallSplit, Grade, PersonPin, Build } from '@material-ui/icons';

import './css/LeftNav.css';

function LeftNav(props) {

    const [menuArr, setMenuArr] = useState([]);

    useEffect(() => {

        const list = [
            { name : "내정보", icon : <PersonPin/> },
            { name : "검색", icon : <Search/> },
            { name : "길찾기", icon : <CallSplit/> },
            { name : "여행지", icon : <Flag/> },
            { name : "도구", icon : <Build/> },
            { name : "즐겨찾기", icon : <Grade/> },
        ];
        setMenuArr(list);

    }, [])

    return (
        <aside className="leftNav">
            <nav className="leftNav--menu">
                { menuArr && 
                    menuArr.map((el, idx) => (
                        <React.Fragment key={ idx }>
                            <div className="leftNav--menu__icon">
                                <span title={ el.name } onClick={() => props.setCurrMenu(el.name) }>{ el.icon }</span>
                            </div>
                        </React.Fragment>
                    ))
                }
            </nav>
            {/* <div className="info" id="info">
                <ol className="info--contents" id="info--contents" style={{ overflow: 'auto' }} >
                </ol>
            </div> */}
        </aside>
    )
}

export default LeftNav
