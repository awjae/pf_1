import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from '@emotion/styled';

import PlayerComponents from './components/Player';
import CharacterComponents from './components/Character';

function App() {
  return (
    <div className="App">
      <Board>
        <header>posenet-VR</header>
        <article>
          <PlayerComponents></PlayerComponents>
          <CharacterComponents></CharacterComponents>
        </article>
      </Board>
    </div>
  );
}

export default App;


const Board = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #222222;
  overflow: hidden;
  header {
    height: 45px;
    padding: 40px 0px;
    font-size: 24px;
    color: #ffffff;
  }
  article {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`