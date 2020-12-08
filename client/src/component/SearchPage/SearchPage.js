import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import { Search, SettingsEthernetSharp } from '@material-ui/icons';
import axios from "axios";
import SearchCard from './SearchCard';
import initMap from '../../Map/core/initMap';

function SearchPage() {

    const [searchInput, setSearchInput] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        //날씨 API, 영화 순위 API
        // Geolocation API는 보안 컨텍스트(HTTPS)에서만 작동합니다.
        //현재 위치에 기반한 날씨 보류..
        const { lat, lng } = initMap.map.getCenter();
        const key = process.env.OPENWEATHER;
        axios(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`)
        .then(function(res) {
            const { name, main, weather } = res.data;

            console.log(name, main, weather);

            //세션 스토리지에 search 유무 확인
            if (true) {
                
            }

        })
        .catch(function(err) {
            console.log(err)
        })

    }, [])


    let timer;
    const searchHandleChange = (value) => {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                setItems([]);
                setSearchInput(value)
                searchVworldGeocoding(value)
            }, 400);
        }
        
    }

    //백엔드에서 프록시 넣기
    //https://developers.naver.com/products/datalab/ 장소검색도 검색 결과에 넣기
    const searchVworldGeocoding = (value) => {

        axios.post("/proxy.do", {
            baseUrl : 'http://api.vworld.kr/req/search',
            extraUrl : makeURLForSearchAddress(value, 'address', 1)
        })
        .then(function (res) {
            const items1 = res.data.response.result.items;

            if (items1.length < 10) {
                axios.post("/proxy.do", {
                    baseUrl : 'http://api.vworld.kr/req/search',
                    extraUrl : makeURLForSearchAddress(value, 'place', 1)
                })
                .then(function (res2) {
                    const items2 = res2.data.response.result.items;
                    console.log(items1.concat(items2))
                    setItems(items1.concat(items2))
                })
                .catch(function(err) {
                    console.log(err)
                })
            } else {
                setItems(items1);

            }

        })
        .catch(function (err) {
            console.log(err)
        })
    }

    const makeURLForSearchAddress = (query, type, page) => {
        var text = ``;
        switch (type) {
            case 'address' :
                text = `?request=search&version=2.0&crs=EPSG:4326&size=20&page=${page}&query=${query}&type=address&category=road&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
                break;
            case 'place' :
                text = `?request=search&version=2.0&crs=EPSG:4326&size=20&page=${page}&query=${query}&type=place&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
                break;
            default :
                break;
        }
        return text;
    }

    return (
        <section className="SearchPage">
            <header className="SearchPage__header">
                <section>
                    <input type="text" placeholder="장소, 버스, 지하철, 도로 검색" onChange={ (e) => searchHandleChange(e.target.value) } onKeyPress={(e) => searchHandleChange(e.target.value)} />
                    <Search></Search>
                </section>
            </header>
            <section className="SearchPage--userLocationInfo">
                <div>
                </div> 
            </section>
            <article className="SearchPage__contents">
                { items && 
                    items.map((item, idx) => {
                        if (item.address.bldnm || item.title) {
                            return <SearchCard key={idx} address={item.address} point={item.point} placeTitle={item.title}/>;
                        }
                    })
                }
            </article>
            <section className="SearchPage__footer">

            </section>
        </section>
    )
}

export default SearchPage
