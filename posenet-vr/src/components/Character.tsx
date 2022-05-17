import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import WebGl from '../utils/webGL';

import useStore from "../utils/store";

declare global {
  interface Window {
    rotateX: Number;
    rotateY: Number;
    rightArmRotateZ: Number;
    rightArmRotateY: Number;
  }
}

function Character() {
  const wrapper = useRef(null);
  // const name = useStore((state) => state.text);
  // const setName = useStore((state) => state.setText);
  const rotateX = useStore((state) => state.rotateX);
  const rotateY = useStore((state) => state.rotateY);
  const rightArmRotateZ = useStore((state) => state.rightArmRotateZ);
  const rightArmRotateY = useStore((state) => state.rightArmRotateY);

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
      webGl.debuggingBone(
        {x:window.rotateX, y:window.rotateY, z:0},
        {y:window.rightArmRotateY, z:window.rightArmRotateZ}
      );
      renderer.render( scene, camera );
    }
  },[])

  useEffect(() => {
    window.rotateX = rotateX;
  },[rotateX])

  useEffect(() => {
    window.rotateY = rotateY;
  },[rotateY])

  useEffect(() => {
    window.rightArmRotateZ = rightArmRotateZ;
  },[rightArmRotateZ])
  
  useEffect(() => {
    window.rightArmRotateY = rightArmRotateY;
  },[rightArmRotateY])

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