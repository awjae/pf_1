import React, { useState, useEffect } from 'react';
import './BookMarkPage.css';

function BookMarkPage() {

    const [user, setUser] = useState();

    useEffect(() => {

        if (window.sessionStorage.id) {
            setUser({id : window.sessionStorage.getItem("id"), name : window.sessionStorage.getItem("name"), email : window.sessionStorage.getItem("email") });
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
    
    return (
        <section className="BookMarkPage">
            <header className="BookMarkPage__header">
                <ul className="BookMarkPage__header--ul">
                    <li>장소</li>
                    <li>경로</li>
                    <li>레이어</li>
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
            </article>
        </section>
    )
}

export default BookMarkPage
