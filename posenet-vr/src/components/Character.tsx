import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import WebGl from '../utils/webGL';
import create from 'zustand';

// const useStore = create<any>((set) => ({
//   text: 'React',
//   setText: (text) => set({text}),
// }));
const useStore = create<any>((set) => ({
  text: 'React',
  setText: (text) => set({text}),
}));

function Character() {
  const wrapper = useRef(null);
  const setText = useStore((state) => state.setText);

  useEffect(() => {
    const webGl = new WebGl(wrapper.current);
    const controls = webGl.getControls();
    const renderer = webGl.getRenderer();
    const scene = webGl.getScene();
    const camera = webGl.getCamera();
    setText('hi');
    
    animate();
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      // webGl.debuggingBone();
      renderer.render( scene, camera );
    }
  })

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