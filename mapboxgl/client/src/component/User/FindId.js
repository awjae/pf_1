import React from 'react';
import { useState } from 'react';
import './SignUp.css';

function FindId() {

    const [userId, setUserId] = useState()

    return (
        <section className="findIdPop">
            <header>
                awjae.space
            </header>
            { !userId && 
                <>
                    <article className="findIdPop__input--wrapper">
                        <p><input placeholder="가입시 입력한 이메일" /></p>
                    </article>
                    <footer className="findIdPop__footer">
                        <ul>
                            <li>아이디 찾기</li>
                        </ul>
                    </footer>
                </>
            }
            {
                userId && 
                <>
                    <article className="findIdPop__input--wrapper">
                        <p><input value={ userId } readOnly/></p>
                    </article>
                    <footer className="findIdPop__footer">
                        <ul>
                            <li><Link>로그인</Link></li>
                        </ul>
                    </footer>
                </>
            }
            
        </section>
    )
}

export default FindId
