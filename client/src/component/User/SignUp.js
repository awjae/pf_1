import React from 'react';
import axios from 'axios'; 
import './SignUp.css';

function SignUp() {

    const handleCheckId = () => {
        
    }
    
    return (
        <section className="signUpPop">
            <header>
                awjae.space
            </header>
            <article className="signUpPop__input--wrapper">
                <p><input placeholder="아이디" /><button className="signUpPop__checkId" onClick={ handleCheckId }>중복확인</button></p>
                <p><input placeholder="닉네임" /></p>
                <p><input placeholder="이메일" /></p>
                <p className="signUpPop__input--pw"><input placeholder="비밀번호" /></p>
                <p className="signUpPop__input--pw"><input placeholder="비밀번호 확인" /><span></span></p>
            </article>
            <footer className="signUpPop__footer">
                <ul>
                    <li>회원가입</li>
                </ul>
            </footer>
        </section>
    )
}

export default SignUp
