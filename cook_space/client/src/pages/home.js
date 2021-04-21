import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Wrapper_section>
      <div className="twinkling"></div>
      <div className="cloud"></div>
      <Title_section>
        <h1>Open My Exhibition</h1>
        <a>Add Images</a>
      </Title_section>
      <Example_section>
        <ul>
          <li>
            <Link to="/gallary">
              example1
            </Link>  
          </li>
        </ul>
      </Example_section>
    </Wrapper_section>
  );
};

export default Home;

const Title_section =  styled.section`
  position: absolute;
  top: 25%;
  width: 100%;
  text-align: center;
  z-index: 3;

  h1 {
    font-size: 5rem;
    color: #fff;
    font-family: fantasy;
  }
  a {
    color: #fff;
  }
`;
const Example_section =  styled.section`
  position: absolute;
  top: 75%;
  width: 100%;
  text-align: center;
  z-index: 3;
  li a {
    color: #fff; 
  }
`;
const Wrapper_section = styled.section`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: #000 url('https://image.ibb.co/mjnygo/stars.png') repeat top center;

  div.twinkling, div.cloud {
    position:absolute;
    display:block;
    top:0; bottom:0;
    left:0; right:0;
    width:100%; height:100%;
  }
  div.twinkling {
    z-index: 1;
    background:transparent url('https://image.ibb.co/ir1DE8/twinkling.png') repeat top center;
    animation: move-twink-back 200s linear infinite;
  }
  div.cloud {
    z-index: 2;
    background:transparent url('https://image.ibb.co/bT4N7T/clouds.png') repeat top center;
    animation: move-clouds-back 200s linear infinite;
  }
  @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  @keyframes move-clouds-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
  }
`;