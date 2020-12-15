import React from 'react';
import { useState } from 'react';
import './SignUp.css';

function FindPw() {

    const [user, setUser] = useState()

    return (
        <section className="findPwPop">
            <header>
                awjae.space
            </header>
            { !user && 
                <>
                    <article className="findPwPop__input--wrapper">
                        <p><input placeholder="아이디" /></p>
                        <p><input placeholder="이메일" /></p>
                    </article>
                    <footer className="findPwPop__footer">
                        <ul>
                            <li>비밀번호 찾기</li>
                        </ul>
                    </footer>
                </>
            }
            {
                user && 
                <>
                    <article className="findPwPop__input--wrapper">
                        <p><input value={ user } readOnly/></p>
                        <p><input placeholder="새 비밀번호"/></p>
                        <p><input placeholder="새 비밀번호 확인"/></p>
                    </article>
                    <footer className="findPwPop__footer">
                        <ul>
                            <li>비밀번호 변경</li>
                        </ul>
                    </footer>
                </>
            }
            
        </section>
    )
}

export default FindPw
