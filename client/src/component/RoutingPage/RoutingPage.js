import React, { useState } from 'react';
import { ImportExport, ChevronRight, DirectionsCar, DirectionsBus, DirectionsWalk, DirectionsBike } from '@material-ui/icons';
import './RoutingPage.css';
import axios from 'axios'; 
import SearchCard from '../SearchPage/SearchCard';
import initMap from '../../Map/core/initMap';

function RoutingPage() {

    const [contents, setContents] = useState([]);
    const [currentFocus, setCurrentFocus] = useState("");
    const [startPoint, setStartPoint] = useState({});
    const [endPoint, setEndPoint] = useState({});

    const makeURLForSearchAddress = (query, type, page) => {
        var text = ``;
        switch (type) {
            case 'address' :
                text = `?request=search&version=2.0&crs=EPSG:4326&size=20&page=${page}&query=${query}&type=address&category=road&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
                break;
            case 'place' :
                text = `service=search&request=search&version=2.0&crs=EPSG:4326&size=20&page=${page}&query=${query}&type=place&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
                break;
            default :
                break;
        }
        return text;
    }

    const searchPoint = (el) => {
        if (el.key === "Enter") {
            const value = el.target.value;

            axios.post("/proxy.do", {
                baseUrl : 'http://api.vworld.kr/req/search',
                extraUrl : makeURLForSearchAddress(value, 'address', 1)
            })
            .then(function (res) {
                const items = res.data.response.result.items;
                setCurrentFocus(el.target.id);
                setContents(items);

            })
            .catch(function (err) {
                console.log(err)
            })

        }
    } 

    const setRoutingPoint = (id, item) => {
        id === "startPointButton" ? setStartPoint(item) : id === "endPointButton" ? setEndPoint(item) : null;
        initMap.setCenter(item.point.x, item.point.y);
    }

    /* 길찾기 버튼 클릭 */
    const findRouting = () => {
        console.log(startPoint);
        console.log(endPoint);
        setCurrentFocus("routing");

        
    }

    return (
        <section className="RoutingPage">
            <header className="RoutingPage__header">
                <p>
                    <input className="RoutingPage__header--input" placeholder="출발지 입력하세요" onKeyPress={ searchPoint } id="startPoint"/>
                </p>
                <p>
                    <input className="RoutingPage__header--input" placeholder="도착지 입력하세요"onKeyPress={ searchPoint } id="endPoint" />
                </p>
                <p className="RoutingPage__header--changer"><ImportExport /></p>
            </header>
            <section className="RoutingPage__subHeader">
                <button>
                    초기화
                </button>
                <button onClick={ findRouting }>
                    길찾기<ChevronRight />
                </button>
            </section>
            <article className="RountingPage__contents">
                <header className="RountingPage__contents--header">
                    <ul>
                        <li><DirectionsCar /></li>
                        <li><DirectionsBus /></li>
                        <li><DirectionsWalk /></li>
                        <li><DirectionsBike /></li>
                    </ul>
                </header>
                <article className="RountingPage__contents--body">
                    { currentFocus && currentFocus === "startPoint" &&
                        contents.map((item, idx) => {
                            if (item.address.bldnm) {
                                return (
                                    <div key={"startPoint-" + idx}>
                                        <p className="RoutingPoint" id="startPointButton" onClick={ (e) => setRoutingPoint(e.target.id, item) }>출발</p>
                                        <SearchCard address={item.address} point={item.point}/>
                                    </div>
                                );
                            }
                        })
                    }
                    { currentFocus && currentFocus === "endPoint" &&
                        contents.map((item, idx) => {
                            if (item.address.bldnm) {
                                return (
                                    <div key={"endPoint-" + idx}>
                                        <p className="RoutingPoint" id="endPointButton" onClick={ (e) => setRoutingPoint(e.target.id, item) }>도착</p>
                                        <SearchCard  address={item.address} point={item.point}/>
                                    </div>
                                );
                            }
                        })
                    }
                    { currentFocus && currentFocus === "routing" &&
                        contents.map(item => {
                            if (item.address.bldnm) {
                                return <SearchCard key={item.id} address={item.address} point={item.point}/>;
                            }
                        })
                    }
                </article>
            </article>
        </section>
    )
}

export default RoutingPage
