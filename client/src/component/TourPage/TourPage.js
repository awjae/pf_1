import React, { useState } from 'react';
import './TourPage.css';
import { Flag } from '@material-ui/icons';
import axios from 'axios';
import TourCard from './TourCard'

function TourPage() {

    const [itemList, setItemList] = useState([]);

    const searchTour = (el) => {
        if (el.key === "Enter") {
            const value = el.target.value;

            axios.post("/proxyNaE.do", {
                baseUrl : 'http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService/gallerySearchList?pageNo=1&numOfRows=20&MobileOS=ETC&MobileApp=AppTest&arrange=A&_type=json&keyword=',
                extraUrl : value,
                key : '&serviceKey=D27U4D%2FI6rYhcsbQPWP0P4UesCnjrDNSrsiFbOJdmPPKiaGE1frZWi4LJOFPUGDSf%2FFp4ZMsPNzLwCYp82YzIQ%3D%3D',
            })
            .then(function (res) {
                const items = res.data.response.body.items.item;            
                console.log(items)    
                setItemList(items);
            })
            .catch(function (err) {
                console.log(err)
            })

        }
    }

    return (
        <section className="TourPage">
            <header className="TourPage__header">
                <input type="text" placeholder="여행지 검색" onKeyPress={ searchTour } id="tourInput"/><Flag />
            </header>
            <article className="TourPage__contents">
                { itemList &&
                    itemList.map(item => {
                        return <TourCard key={item.galContentId} url={item.galWebImageUrl} item={item} imgTitle={item.galTitle} />
                    })

                }
            </article>
        </section>
    )
}

export default TourPage
