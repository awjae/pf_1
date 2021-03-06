import React, { useState, useRef } from 'react';
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
    const tourInput = useRef();

    const searchTour = (el) => {
        if (el.key === "Enter" || el === "click") {
            let value = "";
            if (el === "click") {
                value = tourInput.current.value;
            } else {
                value = el.target.value;
            }
            document.querySelector('.TourPage__contents--wrapper').scrollTop = 0;
            axios.post("/proxyNaE.do", {
                baseUrl : 'http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService/gallerySearchList?pageNo=1&numOfRows=20&MobileOS=ETC&MobileApp=AppTest&arrange=A&_type=json&keyword=',
                extraUrl : value,
                key : '&serviceKey=D27U4D%2FI6rYhcsbQPWP0P4UesCnjrDNSrsiFbOJdmPPKiaGE1frZWi4LJOFPUGDSf%2FFp4ZMsPNzLwCYp82YzIQ%3D%3D',
            })
            .then(function (res) {
                const items = res.data.response.body.items.item;     
                if (!items) {
                    setItemList([]);
                    return;
                }  
                 
                if (Array.isArray(items)) {
                    setItemList(items);
                } else {
                    setItemList([items]);
                }
                
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
                const value = tourInput.current.value;
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
                    <input type="text" placeholder="여행지 검색" onKeyPress={ searchTour } id="tourInput" ref={ tourInput }/><span onClick={() => searchTour("click")}><Flag /></span>
                </header>
                <article className="TourPage__contents">
                    <div className="TourPage__contents--wrapper" onScroll={ TourCardScrollHandler }>
                        { itemList &&
                            itemList.map(item => {
                                return <TourCard key={item.galContentId} url={item.galWebImageUrl} item={item} imgTitle={item.galTitle} tourModalHandler={tourModalHandler} />
                            })
                        }
                        { itemList.length === 0 && !(tourInput.current) &&
                            <section className="TourPage__contents--initData">
                                <header>여행지를 검색하세요</header>
                                <article>
                                    <span>이쁜 사진을 감상 할 수 있습니다.</span>
                                </article>
                            </section>
                        }
                        { itemList.length === 0 && tourInput.current &&
                            <section className="TourPage__contents--noData">
                                <header>검색 결과가 없습니다</header>
                                <article>
                                    <span>다른 여행지를 검색해주세요.</span>
                                </article>
                            </section>
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
