import React, { useState } from 'react';
import './BookMarkPage.css';

function BookMarkPage() {

    const [user, setUser] = useState();

    const loginPop = () => {
        window.open(window.location.origin + '/loginPop','Data','height=350,width=350');
    }

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
                { user &&
                    console.log(user)
                }
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
