import  React, { useState, useEffect } from 'react';
import { Search, Flag, CallSplit, Grade, PersonPin, Build } from '@material-ui/icons';
import initMap from './Map/core/initMap';
import { Link } from "react-router-dom";

import './css/LeftNav.css';

function LeftNav(props) {

    const [menuArr, setMenuArr] = useState([]);

    useEffect(() => {

        const list = [
            { name : "내정보", icon : <PersonPin/>, menu : "mypage" },
            { name : "검색", icon : <Search/>, menu : "SearchPage" },
            { name : "길찾기", icon : <CallSplit/>, menu : "routing" },
            { name : "여행지", icon : <Flag/>, menu : "trip" },
            { name : "도구", icon : <Build/>, menu : "tools" },
            { name : "즐겨찾기", icon : <Grade/>, menu : "favorite" },
        ];
        setMenuArr(list);

    }, [])

    const clickHandle = (e) => {
        
        if (e.title === "내정보") {
            const spanList = document.querySelectorAll('.leftNav--menu__iconSpan');
            spanList.forEach(span => span.classList.remove("active"));
            return;
        }

        if (e.title === "길찾기") {
            initMap.map.addControl(initMap.directArr.traffic);
            initMap.currDirect = initMap.directArr.traffic;
        } else {
            if (initMap.currDirect) {
                initMap.map.removeControl(initMap.directArr.traffic)
                initMap.currDirect = null;
            }
            
        }

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
                                <Link to={`${el.menu}`}
                                    className="leftNav--menu__iconSpan" 
                                    title={ el.name } 
                                    onClick={(e) =>  { props.setCurrMenu(el); clickHandle(e.currentTarget) } }>
                                        { el.icon }
                                </Link>
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
