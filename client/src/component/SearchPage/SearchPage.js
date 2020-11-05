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

            searchNAVERGeocoding(searchInput)
        }, 400);
    }

    const searchNAVERGeocoding = (searchInput) => {
        fetch('/api/naver/geocode', {
            method: "GET",
            header : {
                'X-NCP-APIGW-API-KEY-ID' : process.env.NAVER_KEY_ID,
                'X-NCP-APIGW-API-KEY' : process.env.NAVER_KEY_PW,
                'query' : searchInput
            }
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
