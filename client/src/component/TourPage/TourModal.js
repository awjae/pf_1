import React from 'react';
import { Close, Star } from '@material-ui/icons';
import './TourPage.css';
import axios from 'axios';
import initMap from '../../Map/core/initMap';
import { userState } from '../UserState';
import { useRecoilValue } from 'recoil';

function TourModal(props) {

    const user = useRecoilValue(userState);

    const bookmarkHandler = () => {
        const name = props.imgInfo.galTitle;
        const center = initMap.map.getCenter();
        
        console.log(name)
        console.log(center)
        console.log(user);
        if (true) {
            axios.put("/insertBookmark.do", {
                id: user.id,
                name: name,
                x: center.lng,
                y: center.lat
            })
            .then(function (res) {
                const items = res.data
                console.log(items)
                
            })
            .catch(function (err) {
                console.log(err);
            })
        } else {

        }

    }

    return (
        <section className="TourModal"
            style={{  
                backgroundImage: `url("${props.imgInfo.galWebImageUrl}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            <span className="TourModal__marker" onClick={() => bookmarkHandler()} title="즐겨찾기 등록"><Star></Star></span>
            <span className="TourModal__closer" onClick={() => props.tourModalHandler(null)}><Close></Close></span>
        </section>
    )
}

export default TourModal
