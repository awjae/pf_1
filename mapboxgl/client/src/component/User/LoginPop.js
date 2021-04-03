import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPop.css';

function loginPop() {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const idInput = useRef();
    const pwInput = useRef();

    const handleLogin = () => {
        if (id.length < 1) {
            idInput.current.focus();
            alert('아이디를 입력해주세요');
            return;
        }
        if (pw.length < 5) {
            pwInput.current.focus();
            alert('비밀번호를 확인해주세요');
            return;
        }

        axios.post('/loginUser.do', {
            id : id,
            pw : pw
        }) 
        .then((res) => {
            if (res.data.results.length < 1) {
                alert("일치하는 회원정보가 없습니다.");
            } else {
                //로그인 성공
                // window.sessionStorage.setItem('id', res.data.results[0].id);
                // window.sessionStorage.setItem('name', res.data.results[0].name);
                // window.sessionStorage.setItem('email', res.data.results[0].email);
                const { id, name, email } = res.data.results[0];
                opener.userInfo = {id, name, email};
                window.close();
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    return (
        <section className="loginPop">
            <header>
                awjae.space
            </header>
            <article className="loginPop__input--wrapper">
                <span>
                    <input placeholder="아이디" onChange={e => setId(e.target.value) } ref={ idInput }/>
                    <input type="password" placeholder="비밀번호" onChange={e => setPw(e.target.value) } ref={ pwInput }/>
                </span>
                <button onClick={ handleLogin }>로그인</button>
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
