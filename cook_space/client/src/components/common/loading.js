import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const loading = (props) => {

    const [hide, setHide] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            setHide(true);
            setTimeout(() => {
                props.handler();
            }, 2000)
        }, props.timer)

    }, [])

    return (
        <Wrapper_loading>
            <div className={ hide ? "hide" : "" }>
                <Loading_bar>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </Loading_bar>
            </div>
        </Wrapper_loading>
    )
}

const Wrapper_loading = styled.section`
    div {
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(17, 17, 17);
        top: 0;
        left: 0;
        opacity: 1;
        overflow: hidden;
    }
    div.hide {
        opacity: 0;
        transition: opacity 2s;
    }
`;

const Loading_bar = styled.div`
    width:100px;
    height:100px;
    margin:30px auto;
    position:absolute;
    top: 50%;
    left: 50%;

    div{
        width: 100px;
        height: 30px;
        background: white;
        position: absolute;
        top: 35px;
        left: 45px;
        opacity:0.05;
        -webkit-animation: fadeit 1.1s linear infinite;
        -moz-animation: fadeit 1.1s linear infinite;
        animation: fadeit 1.1s linear infinite;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -50px;
    }

    div:nth-child(1){
        -webkit-transform: rotate(0deg) translate(0, -30px);
        -moz-transform: rotate(0deg) translate(0, -30px);
        transform: rotate(0deg) translate(0, -30px); 

        -webkit-animation-delay:0.39s;
        -moz-animation-delay:0.39s;
        animation-delay:0.39s;
    } 

    div:nth-child(2){
        -webkit-transform: rotate(45deg) translate(0, -30px);
        -moz-transform: rotate(45deg) translate(0, -30px);
        transform: rotate(45deg) translate(0, -30px); 

        -webkit-animation-delay:0.52s;
        -moz-animation-delay:0.52s;
        animation-delay:0.52s;
    } 

    div:nth-child(3){
        -webkit-transform: rotate(90deg) translate(0, -30px);
        -moz-transform: rotate(90deg) translate(0, -30px);
        transform: rotate(90deg) translate(0, -30px); 

        -webkit-animation-delay:0.65s;
        -moz-animation-delay:0.65s;
        animation-delay:0.65s;
    } 

    div:nth-child(4){
        -webkit-transform: rotate(135deg) translate(0, -30px);
        -moz-transform: rotate(135deg) translate(0, -30px);
        transform: rotate(135deg) translate(0, -30px); 

        -webkit-animation-delay:0.78s;
        -moz-animation-delay:0.78s;
        animation-delay:0.78s;
    } 

    div:nth-child(5){
        -webkit-transform: rotate(180deg) translate(0, -30px);
        -moz-transform: rotate(180deg) translate(0, -30px);
        transform: rotate(180deg) translate(0, -30px); 

        -webkit-animation-delay:0.91s;
        -moz-animation-delay:0.91s;
        animation-delay:0.91s;
    } 

    div:nth-child(6){
        -webkit-transform: rotate(225deg) translate(0, -30px);
        -moz-transform: rotate(225deg) translate(0, -30px);
        transform: rotate(225deg) translate(0, -30px); 

        -webkit-animation-delay:1.04s;
        -moz-animation-delay:1.04s;
        animation-delay:1.04s;
    } 

    div:nth-child(7){
        -webkit-transform: rotate(270deg) translate(0, -30px);
        -moz-transform: rotate(270deg) translate(0, -30px);
        transform: rotate(270deg) translate(0, -30px); 

        -webkit-animation-delay:1.17s;
        -moz-animation-delay:1.17s;
        animation-delay:1.17s;
    } 

    div:nth-child(8){
        -webkit-transform: rotate(315deg) translate(0, -30px);
        -moz-transform: rotate(315deg) translate(0, -30px);
        transform: rotate(315deg) translate(0, -30px); 

        -webkit-animation-delay:1.3s;
        -moz-animation-delay:1.3s;
        animation-delay:1.3s;
    }

    @-webkit-keyframes fadeit{
        0%{
            opacity:1;
        }
        100%{
            opacity:0;
        }
    }
    @-moz-keyframes fadeit{
        0%{
            opacity:1;
        }
        100%{
            opacity:0;
        }
    }
    @keyframes fadeit{
        0%{
            opacity:1;
        }
        100%{
            opacity:0;
        }
    }
`;

export default loading