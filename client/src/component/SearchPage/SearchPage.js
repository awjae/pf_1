import React, { useState } from 'react';
import './SearchPage.css';
import { Search } from '@material-ui/icons';

function SearchPage() {

    const [searchInput, setSearchInput] = useState("");

    let timer;
    const searchHandleChange = (value) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            setSearchInput(value)

            searchNAVERGeocoding(value)
        }, 400);
    }

    //백엔드에서 프록시 넣기
    //https://developers.naver.com/products/datalab/ 장소검색도 검색 결과에 넣기
    const searchNAVERGeocoding = (value) => {
        console.log(value)
        fetch('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' + value, {
            method: "GET",
            headers : {
                'X-NCP-APIGW-API-KEY-ID' : process.env.NAVER_KEY_ID,
                'X-NCP-APIGW-API-KEY' : process.env.NAVER_KEY_PW,
            },
        })
        .then((res) => {
            console.log(res)
        })
    }

    return (
        <section className="SearchPage">
            <header className="SearchPage--header">
                <section>
                    <input type="text" placeholder="장소, 버스, 지하철, 도로 검색" onChange={ (e) => searchHandleChange(e.target.value) }/>
                    <Search></Search>
                </section>
            </header>
            <section className="SearchPage--userLocationInfo">
                <div></div> 
            </section>
            <article className="SearchPage--contents">

            </article>
        </section>
    )
}

export default SearchPage
