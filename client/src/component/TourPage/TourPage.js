import React, { useState } from 'react';
import './TourPage.css';
import { Flag } from '@material-ui/icons';
import axios from 'axios';
import TourCard from './TourCard';
import TourModal from './TourModal';
import initMap from '../../Map/core/initMap';

function TourPage() {

    const [itemList, setItemList] = useState([]);
    const [paging, setPaging] = useState(1);
    const [tourModal, setTourModal] = useState();

    const searchTour = (el) => {
        if (el.key === "Enter") {
            const value = el.target.value;
            document.querySelector('.TourPage__contents--wrapper').scrollTop = 0;
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
                console.log(err);
            })

        }
    }

    const tourModalHandler = (imgInfo) => {
        setTourModal(imgInfo);
        if (imgInfo) {
            console.log(imgInfo)
            axios.post("/proxy.do", {
                baseUrl : 'http://api.vworld.kr/req/search',
                extraUrl : `?request=search&version=2.0&crs=EPSG:4326&size=1&page=1&query=${imgInfo.galTitle}&type=place&format=json&errorformat=json&key=E33AEC41-F230-3C7E-A007-6307BA86AA9F`
            })
            .then(function (res) {
                const item = res.data.response.result.items[0];
                if(item) {
                    initMap.setCenter(item.point.x, item.point.y);
                }
            })
            .catch(function(err) {
                console.log(err)
            })

        }
    }
    let timer;
    const TourCardScrollHandler = (e) => {
        if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 250) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                const reqPage = paging + 1;
                const value = document.querySelector('#tourInput').value;
                axios.post("/proxyNaE.do", {
                    baseUrl : `http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService/gallerySearchList?pageNo=${reqPage}&numOfRows=20&MobileOS=ETC&MobileApp=AppTest&arrange=A&_type=json&keyword=`,
                    extraUrl : value,
                    key : '&serviceKey=D27U4D%2FI6rYhcsbQPWP0P4UesCnjrDNSrsiFbOJdmPPKiaGE1frZWi4LJOFPUGDSf%2FFp4ZMsPNzLwCYp82YzIQ%3D%3D',
                })
                .then(function (res) {
                    const items = res.data.response.body.items.item;            
                    console.log(items)    
                    //setItemList(items);
                    if (items) {
                        setPaging(reqPage);
                        const newTourList = itemList.concat(items);
                        setItemList(newTourList);
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })

            }, 300);
        }
    }

    return (
        <>
            <section className="TourPage">
                <header className="TourPage__header">
                    <input type="text" placeholder="여행지 검색" onKeyPress={ searchTour } id="tourInput"/><Flag />
                </header>
                <article className="TourPage__contents">
                    <div className="TourPage__contents--wrapper" onScroll={ TourCardScrollHandler }>
                        { itemList &&
                            itemList.map(item => {
                                return <TourCard key={item.galContentId} url={item.galWebImageUrl} item={item} imgTitle={item.galTitle} tourModalHandler={tourModalHandler} />
                            })
                        }
                    </div>
                </article>
            </section>
            { tourModal &&
                <TourModal imgInfo={tourModal} tourModalHandler={tourModalHandler}></TourModal>
            }
        </>
    )
}

export default TourPage
