import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Character() {
  const wrapper = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );
    // lights

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 20, 10 );
    scene.add( dirLight );

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    mesh.rotation.x = - Math.PI / 2;
    scene.add( mesh );

    const grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );

    const camera = new THREE.PerspectiveCamera( 12, window.innerWidth / window.innerHeight, 0.25, 100 );
    camera.position.set( 0, 2, 10 );
    // camera.lookAt( new THREE.Vector3( 0, 2, 0 ) );

    const loader = new GLTFLoader();
    loader.load( 'models/Xbot.glb', function ( gltf ) {
      const model = gltf.scene;
      scene.add( model );
      model.traverse( function ( object ) {
        if ( object.isMesh ) object.castShadow = true;
      });
      const skeleton = new THREE.SkeletonHelper( model );
      skeleton.visible = false;
      scene.add( skeleton );
    });


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( 500, 500 );
    renderer.render( scene, camera );
    wrapper.current.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.target.set( 0, 1, 0 );
    animate();
    function animate() {
      requestAnimationFrame( animate );
      controls.update();
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