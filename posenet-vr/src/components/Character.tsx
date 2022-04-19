import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import WebGl from '../utils/webGL';

import useStore from "../utils/store";

declare global {
  interface Window {
    rotateX: Number;
    rotateY: Number;
  }
}

function Character() {
  const wrapper = useRef(null);
  // const name = useStore((state) => state.text);
  // const setName = useStore((state) => state.setText);
  const rotateX = useStore((state) => state.rotateX);
  const rotateY = useStore((state) => state.rotateY);

  useEffect(() => {
    const webGl = new WebGl(wrapper.current);
    const controls = webGl.getControls();
    const renderer = webGl.getRenderer();
    const scene = webGl.getScene();
    const camera = webGl.getCamera();

    animate();
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      webGl.debuggingBone(window.rotateX, window.rotateY, 0);
      renderer.render( scene, camera );
    }
  },[])

  useEffect(() => {
    window.rotateX = rotateX;
  },[rotateX])

  useEffect(() => {
    window.rotateY = rotateY;
  },[rotateY])

  return (
    <CharacterDiv ref={wrapper}>
    </CharacterDiv>
  )
}

export default Character

const CharacterDiv = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 10px;
    background-color: #21bd9b;
    margin: 0px 20px;
`