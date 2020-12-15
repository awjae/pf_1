import React from 'react';
import { Link } from 'react-router-dom';
import './css/LoginPop.css';

function loginPop() {
    return (
        <section className="loginPop">
            <header>
                awjae.space
            </header>
            <article className="loginPop__input--wrapper">
                <span>
                    <input placeholder="아이디" />
                    <input placeholder="비밀번호" />
                </span>
                <button>로그인</button>
            </article>
            <footer className="loginPop__footer">
                <ul>
                    <li><Link to="/loginPop/signUp">회원가입</Link></li>
                    <li><Link to="/loginPop/findId">아이디 찾기</Link></li>
                    <li><Link to="/loginPop/findPw">비밀번호 찾기</Link></li>
                </ul>
            </footer>
        </section>
    )
}

export default loginPop
