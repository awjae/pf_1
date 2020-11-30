import  React, { useState, useEffect } from 'react';
import { Search, Flag, CallSplit, Grade, PersonPin, Build } from '@material-ui/icons';
import Mypage from './component/Mypage/MyPage';
import SearchPage from './component/SearchPage/SearchPage';
import RoutingPage from './component/RoutingPage/RoutingPage';
import TourPage from './component/TourPage/TourPage';

import './css/LeftNav.css';

function LeftNav(props) {

    const [menuArr, setMenuArr] = useState([]);

    useEffect(() => {

        const list = [
            { name : "내정보", icon : <PersonPin/>, menu : "mypage", contents : <Mypage /> },
            { name : "검색", icon : <Search/>, menu : "SearchPage", contents : <SearchPage /> },
            { name : "길찾기", icon : <CallSplit/>, menu : "routing", contents : <RoutingPage /> },
            { name : "여행지", icon : <Flag/>, menu : "trip", contents : <TourPage /> },
            { name : "도구", icon : <Build/>, menu : "tools", contents : "" },
            { name : "즐겨찾기", icon : <Grade/>, menu : "favorite", contents : "" },
        ];
        setMenuArr(list);

    }, [])

    const clickHandle = (e) => {
        if (e.title === "내정보") return;
        if (e.classList.contains("active")) {
            e.classList.remove("active");
            return;
        } else {
            const spanList = document.querySelectorAll('.leftNav--menu__iconSpan');
            spanList.forEach(span => span.classList.remove("active"));

            e.classList.add("active")
        }
        
        
    }
    
    return (
        <aside className="leftNav">
            <nav className="leftNav--menu">
                { menuArr && 
                    menuArr.map((el, idx) => (
                        <React.Fragment key={ idx }>
                            <div className="leftNav--menu__icon">
                                <span 
                                    className="leftNav--menu__iconSpan" 
                                    title={ el.name } 
                                    onClick={(e) =>  { props.setCurrMenu(el); clickHandle(e.currentTarget) } }>
                                        { el.icon }
                                </span>
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
