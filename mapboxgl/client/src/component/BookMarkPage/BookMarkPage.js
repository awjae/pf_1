import React, { useState, useEffect } from 'react';
import './BookMarkPage.css';
import { userState } from '../UserState';
import { constSelector, useRecoilState } from 'recoil';
import axios from 'axios';
import initMap from '../../Map/core/initMap';
import { DeleteForever } from '@material-ui/icons';

function BookMarkPage() {

    const [user, setUser] = useRecoilState(userState);
    const [bookMarkList, setBookmarkList] = useState();

    useEffect(() => {

        if (window.sessionStorage.id) {
            setUser({id : window.sessionStorage.getItem("id"), name : window.sessionStorage.getItem("name"), email : window.sessionStorage.getItem("email") });
            //selectBookMarkList(window.sessionStorage.getItem("id"));
            
            axios.post('/selectBookMarkList.do', {
                id : window.sessionStorage.getItem("id")
            })
            .then(res => {
                const result = res.data.results;
                setBookmarkList(result);
            })
            .catch(err => {
                console.log(err);
            }) 
        }

    }, [])

    const loginPop = () => {
        //const win = window.open(window.location.origin + '/loginPop','Data','height=450, width=450, top=200, left=100');
        openPop(window.location.origin + '/loginPop', 'loginPop', 'height=450, width=450, top=200, left=100', function (win) {
            console.log(window.userInfo)
            //로그인 성공
            window.sessionStorage.setItem('id', window.userInfo.id);
            window.sessionStorage.setItem('name', window.userInfo.name);
            window.sessionStorage.setItem('email', window.userInfo.email);

            location.reload();
        })
      
    }

    const openPop = function(uri, name, options, closeCallback) {
        var win = window.open(uri, name, options);
        var interval = window.setInterval(function() {
            try {
                if (win == null || win.closed) {
                    window.clearInterval(interval);
                    closeCallback(win);
                }
            }
            catch (e) {
            }
        }, 1000);
        return win;
    };
    
    const handleBookmarkDelete = (bookmark) => {
        console.log(bookmark)
        
        if (window.confirm(`즐겨찾기 '${bookmark.name}'을(를) 삭제하시겠습니까?`)) {
            axios.delete('/deleteBookMark.do', {
                data : {
                    seq : bookmark.seq,
                    id : bookmark.id
                }
            })
            .then(res => {
                console.log(res.data);
                if (res.data.resCode === 200) {
                    const newBookmarkList = bookMarkList.filter(item => item.seq !== bookmark.seq);
                    setBookmarkList(newBookmarkList);
                }

            })
            .catch(err => {
                console.log(err);
            }) 
        }
    }

    return (
        <section className="BookMarkPage">
            <header className="BookMarkPage__header">
                <ul className="BookMarkPage__header--ul">
                    <li>즐겨찾기 목록</li>
                </ul>
            </header>
            <article className="BookMarkPage__contents">
                { !user &&
                    <section className="BookMarkPage__contents--noUser">
                        <header>자주 가는 장소를 간직해요</header>
                        <article>
                            <button onClick={ loginPop }>로그인</button>
                        </article>
                    </section>
                }
                <ul className="BookMarkPage__contents--ul">
                { bookMarkList && 
                    bookMarkList.map((bookmark, idx) => (
                        <li key={idx}>
                            <span>{bookmark.name}</span>
                            <span><DeleteForever onClick={(e) => handleBookmarkDelete(bookmark)}></DeleteForever></span>
                            <span onClick={() => initMap.setCenter(bookmark.x, bookmark.y) }>이동</span>
                        </li>
                    ))
                }
                </ul>
            </article>
        </section>
    )
}

export default BookMarkPage
