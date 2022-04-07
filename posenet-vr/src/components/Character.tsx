import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import * as THREE from 'three';

function Character() {
  const wrapper = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, 1, 1, 500 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( 500, 500 );
    wrapper.current.appendChild( renderer.domElement );

    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const points = [];
    points.push( new THREE.Vector3( - 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );
    scene.add( line );
    renderer.render( scene, camera );

    
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