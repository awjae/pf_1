import React, { useState, useRef } from 'react';
import axios from 'axios'; 
import './SignUp.css';

function SignUp() {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");

    const idCheckButton = useRef();

    const handleCheckId = () => {
        idCheckButton.current.innerText = "확인중";

        axios.post('/checkId.do', { id: id})
        .then((res) => {
            console.log(res)
            const result = res.data.results
            if (result.length > 0) {
                alert("중복입니다. 새로운 아이디를 입력해주세요.")
                idCheckButton.current.innerText = "중복확인";
            } else {
                idCheckButton.current.innerText = "사용가능";
                alert("사용 가능한 아이디입니다.")
            }
        })
        .catch((err)=> {
            console.log(err)
        })

    }

    const habdleSetPw2 = (password) => {

    }
    
    return (
        <section className="signUpPop">
            <header>
                awjae.space
            </header>
            <article className="signUpPop__input--wrapper">
                <p><input placeholder="아이디" value={ id } onChange= {(e) => setId(e.target.value) }/><button ref={idCheckButton} className="signUpPop__checkId" onClick={ handleCheckId }>중복확인</button></p>
                <p><input placeholder="닉네임" value={ name } onChange= {(e) => setName(e.target.value) }/></p>
                <p><input placeholder="이메일" type="email" value={ email } onChange= {(e) => setEmail(e.target.value) }/></p>
                <p className="signUpPop__input--pw"><input placeholder="비밀번호" type="password" value={ pw1 } onChange= {(e) => setPw1(e.target.value) }/></p>
                <p className="signUpPop__input--pw"><input placeholder="비밀번호 확인" type="password" value={ pw2 } onChange= {(e) => habdleSetPw2(e.target.value) }/><span></span></p>
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
