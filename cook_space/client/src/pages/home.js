import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import example_thumb_1 from '../assets/gallary/thumbnail/example1.png';

const Home = () => {

  const [files, setFiles] = useState([]);

  const fileSelcted = (evt) => {
    const target = evt.target.files;
    const newResult = [];
    for (let file of target) {
      newResult.push(file.name);
    }
    setFiles([...files, ...newResult]);
  }

  const fileDelete = (idx) => {
    const newResult = files.filter((el, jdx) => idx !== jdx);
    setFiles(newResult);
  }

  return (
    <Wrapper_section>
      <div className="twinkling"></div>
      <div className="cloud"></div>
      <Title_section>
        <div className="waviy">
          <span style={{"--i":1}}>O</span>
          <span style={{"--i":2}}>p</span>
          <span style={{"--i":3}}>e</span>
          <span style={{"--i":4}}>n</span>
          <span style={{"--i":5}} className="waviy-space"></span>
          <span style={{"--i":6}}>M</span>
          <span style={{"--i":7}}>y</span>
          <span style={{"--i":8}} className="waviy-space"> </span>
          <span style={{"--i":9}}>E</span>
          <span style={{"--i":10}}>x</span>
          <span style={{"--i":11}}>h</span>
          <span style={{"--i":12}}>i</span>
          <span style={{"--i":13}}>b</span>
          <span style={{"--i":14}}>i</span>
          <span style={{"--i":15}}>t</span>
          <span style={{"--i":16}}>i</span>
          <span style={{"--i":17}}>o</span>
          <span style={{"--i":18}}>n</span>
        </div>
        <div>
          <div className="fileForm">
            <label htmlFor="upload">
              <input type="file" id="upload" multiple onChange={ fileSelcted } />
              Upload Files
            </label>
          </div>
          <div className="fileList">
            <ul className="files">
              { files &&
                files.map((el, idx) => (
                  <li key={idx}>{el}<span onClick={() => fileDelete(idx) }>x</span></li>
                ))
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

  .waviy {
    font-size: 5rem;
    color: #fff;
    font-family: fantasy;
    position: relative;
    span {
      position: relative;
      display: inline-block;
      color: #fff;
      animation: flip 5s infinite;
      animation-delay: calc(.1s * var(--i))
    }
  }
  .waviy-space {
    width: 30px;
  }
  @keyframes flip {
    0%,80% {
      transform: rotateY(360deg) 
    }
  }

  .fileForm {
    border: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3vw auto 1vw;
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
    visibility: hidden;
    opacity: 0;
  }

  .fileList li {
    color: #fff;
    margin-bottom: 3px;
  }
  .fileList li span {
    color: #ffeb00;
    margin-left: 7px;
    cursor: pointer;
    font-size: 1.2em;
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
