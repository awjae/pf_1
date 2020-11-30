import React, { useState } from 'react';
import './SearchPage.css';
import { Search } from '@material-ui/icons';
import axios from "axios";
import SearchCard from './SearchCard';

function SearchPage() {

    const [searchInput, setSearchInput] = useState("");
    const [items, setItems] = useState([]);

    let timer;
    const searchHandleChange = (value) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            setSearchInput(value)

            searchVworldGeocoding(value)
        }, 400);
    }

    //백엔드에서 프록시 넣기
    //https://developers.naver.com/products/datalab/ 장소검색도 검색 결과에 넣기
    const searchVworldGeocoding = (value) => {
        console.log(value);

        axios.post("/proxy.do", {
            baseUrl : 'http://api.vworld.kr/req/search',
            extraUrl : makeURLForSearchAddress(value, 'address', 1)
        })
        .then(function (res) {
            const items = res.data.response.result.items;
            console.log(items);
            setItems(items);
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
                text = `service=search&request=search&version=2.0&crs=EPSG:4326&size=20&page=${page}&query=${query}&type=place&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
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
                    <input type="text" placeholder="장소, 버스, 지하철, 도로 검색" onChange={ (e) => searchHandleChange(e.target.value) }/>
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
                        if (item.address.bldnm) {
                            return <SearchCard key={idx} address={item.address} point={item.point} />;
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
