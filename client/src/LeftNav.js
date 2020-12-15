import  React, { useState, useEffect } from 'react';
import { Search, Flag, CallSplit, Grade, PersonPin, Build } from '@material-ui/icons';
import initMap from './Map/core/initMap';
import { Link, useHistory } from "react-router-dom";

import './css/LeftNav.css';

function LeftNav(props) {

    const [menuArr, setMenuArr] = useState([]);
    const history = useHistory();

    useEffect(() => {

        const list = [
            { name : "내정보", icon : <PersonPin/>, menu : "mypage" },
            { name : "검색", icon : <Search/>, menu : "searchPage" },
            { name : "길찾기", icon : <CallSplit/>, menu : "routing" },
            { name : "여행지", icon : <Flag/>, menu : "trip" },
            { name : "도구", icon : <Build/>, menu : "tools" },
            { name : "즐겨찾기", icon : <Grade/>, menu : "favorite" },
        ];
        setMenuArr(list);

    }, [])
    const clickHandle = ((e, menu) => {

        if (e.title === "길찾기") {
            initMap.map.addControl(initMap.directArr.traffic);
            initMap.currDirect = initMap.directArr.traffic;
        } else {
            try {
                initMap.map.removeControl(initMap.directArr.traffic)
            } catch {
                //라이브러리가 객체 메모리 해제가 비정상적으로 이루어져 어쩔수 없이 코드 제거 후 try catch
            }
        }

        if (e.classList.contains("active")) {
            e.classList.remove("active");
            history.push('/');
            return;
        } else {
            const spanList = document.querySelectorAll('.leftNav--menu__iconSpan');
            spanList.forEach(span => span.classList.remove("active"));
            history.push(`/${menu}`);
            e.classList.add("active")
        }
        
    }).bind(this);
    
    return (
        <aside className="leftNav">
            <nav className="leftNav--menu">
                { menuArr && 
                    menuArr.map((el, idx) => (
                        <React.Fragment key={ idx }>
                            <div className="leftNav--menu__icon">
                                <Link to={ "#" }
                                    className="leftNav--menu__iconSpan" 
                                    title={ el.name } 
                                    onClick={(e) =>  { props.setCurrMenu(el); clickHandle(e.currentTarget, el.menu) } }>
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