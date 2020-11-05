import  React, { useState, useEffect } from 'react';
import { Search, Flag, CallSplit, Grade, PersonPin, Build } from '@material-ui/icons';
import Mypage from './component/Mypage/MyPage.js';
import SearchPage from './component/SearchPage/SearchPage.js';

import './css/LeftNav.css';

function LeftNav(props) {

    const [menuArr, setMenuArr] = useState([]);

    useEffect(() => {

        const list = [
            { name : "내정보", icon : <PersonPin/>, menu : "mypage", contents : <Mypage /> },
            { name : "검색", icon : <Search/>, menu : "SearchPage", contents : <SearchPage /> },
            { name : "길찾기", icon : <CallSplit/>, menu : "routing", contents : "" },
            { name : "여행지", icon : <Flag/>, menu : "trip", contents : "" },
            { name : "도구", icon : <Build/>, menu : "tools", contents : "" },
            { name : "즐겨찾기", icon : <Grade/>, menu : "favorite", contents : "" },
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
                                <span title={ el.name } onClick={() => props.setCurrMenu(el) }>{ el.icon }</span>
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
