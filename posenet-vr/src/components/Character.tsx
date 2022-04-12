import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import WebGl from '../utils/webGL';

import useStore from "../utils/store";

function Character() {
  const wrapper = useRef(null);
  const name = useStore((state) => state.text);
  const setName = useStore((state) => state.setText);

  useEffect(() => {
    const webGl = new WebGl(wrapper.current);
    const controls = webGl.getControls();
    const renderer = webGl.getRenderer();
    const scene = webGl.getScene();
    const camera = webGl.getCamera();

    console.log(name)
    setName({text: "heelo"});

    animate();
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      // webGl.debuggingBone();
      renderer.render( scene, camera );
    }
  },[])

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