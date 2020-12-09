import React, { useState } from 'react'
import './LayerPage.css';

function LayerPage() {
    const [user, setUser] = useState();

    return (
        <section className="LayerPage">
            <header className="LayerPage__header">

            </header>
            <article className="LayerPage__contents">
                { user &&
                    console.log(user)
                }
                { !user &&
                    <section className="LayerPage__contents--noUser">
                        <header>나만의 지도를 만들어 보아요</header>
                        <article>
                            <button>로그인</button>
                        </article>
                    </section>
                }
            </article>
        </section>
    )
}

export default LayerPage
