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

        // let naverHeader = new Headers();
        // naverHeader.append('X-NCP-APIGW-API-KEY-ID', process.env.NAVER_KEY_ID);
        // naverHeader.append('X-NCP-APIGW-API-KEY', process.env.NAVER_KEY_PW);
        // const init = { method: 'GET',
        //        headers: naverHeader,
        //        mode: 'no-cors',
        //        cache: 'default' };
        // const req = new Request('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' + value, init);
        // fetch(req)
        // .then((res) => {
        //     console.log(res)
        // })
        const url = makeURLForSearchAddress(value, 'address', 1);
        fetch('./api/vworld' + url)
        .then((res) => res.json())
        .then(json => {

            const data = json.response.result.items;

        });
    }

    const makeURLForSearchAddress = (query, type, page) => {
        var text = ``
        switch (type) {
            case 'address' :
                text = `?request=search&version=2.0&crs=EPSG:4326&size=8&page=${page}&query=${query}&type=address&category=road&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
                break;
            case 'place' :
                text = `service=search&request=search&version=2.0&crs=EPSG:4326&size=8&page=${page}&query=${query}&type=place&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
                break;
            default :
                break;
        }
        return text;
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
