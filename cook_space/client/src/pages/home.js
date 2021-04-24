import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import example_thumb_1 from '../assets/gallary/thumbnail/example1.png';

const Home = () => {

  const [files, setFiles] = useState([]);

  return (
    <Wrapper_section>
      <div className="twinkling"></div>
      <div className="cloud"></div>
      <Title_section>
        <h1>Open My Exhibition</h1>
        <div>
          <div className="fileForm">
            <label htmlFor="upload">
              <input type="file" id="upload" multiple />
              Upload Files
            </label>
          </div>
          <div>
            <ul className="files">
              { files &&
                files.map(el => {
                  <li></li>
                })
              }
            </ul>
          </div>
        </div>
      </Title_section>
      <Example_section>
        <ul>
          <li style={{ backgroundImage: `url(${example_thumb_1})` }}>
            <Link to="/gallary/example1"></Link>  
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

  .fileForm {
    border: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3vw auto;
    width: 10vw;
    height: 5vw;
    border-radius: 10px;
    cursor: pointer;
  }
  .fileForm:hover {
    border: 2px solid #ffeb00;
  }

  label {
    color: #fff;
    display: inline-block;
    line-height: 5vw;
    cursor: pointer;
  }
  label:hover {
    color: #ffeb00;
  }
  input[type="file"] {
    position: absolute;
    right: -9999px;
    visibility: hidden;
    opacity: 0;
  }
`;
const Example_section =  styled.section`
  position: absolute;
  top: 75%;
  width: 100%;
  text-align: center;
  z-index: 3;
  ul {
    display: flex;
    justify-content: center;
  }
  li {
    width: 12vw;
    height: 8vw;
    border: 1px solid #797979;
    border-radius: 15px;
    background-size: cover;
  }
  li a {
    color: #fff; 
    width: 100%;
    height: 100%;
    line-height: 8vw;
    display: inline-block;
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
