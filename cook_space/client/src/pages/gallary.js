import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components';
import * as THREE from "three";
import floor from '../components/gallary/floor';

const gallary = () => {

    const container = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( container.current.clientWidth, container.current.clientHeight );
        container.current.appendChild( renderer.domElement );


        // let width = container.current.clientWidth;
        // let height = container.current.clientHeight;
        // let frameId;

        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        // const renderer = new THREE.WebGLRenderer({
        //     antialias: true
        // });
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0xff00ff
        // });
        // const cube = new THREE.Mesh(geometry, material);

        // camera.position.z = 4;
        // scene.add(cube);
        // renderer.setClearColor('#000000');
        // renderer.setSize(width, height);

        // const renderScene = () => {
        //     renderer.render(scene, camera);
        // }

        // const handleResize = () => {
        //     width = container.current.clientWidth;
        //     height = container.current.clientHeight;
        //     renderer.setSize(width, height);
        //     camera.aspect = width / height;
        //     camera.updateProjectionMatrix();
        //     renderScene();
        // }

        // const animate = () => {
        //     cube.rotation.x += 0.01;
        //     cube.rotation.y += 0.01;

        //     renderScene();
        //     frameId = window.requestAnimationFrame(animate);
        // }

        // const start = () => {
        //     if (!frameId) {
        //         frameId = requestAnimationFrame(animate);
        //     }
        // }

        // const stop = () => {
        //     cancelAnimationFrame(frameId);
        //     frameId = null;
        // }

        // container.current.appendChild(renderer.domElement);
        // window.addEventListener('resize', handleResize);
        // start();

        // controls.current = {
        //     start,
        //     stop
        // }

        // floor.init(scene);

        // return () => {
        //     stop();
        //     window.removeEventListener('resize', handleResize);
        //     container.current.removeChild(renderer.domElement);

        //     scene.remove(cube);
        //     geometry.dispose();
        //     material.dispose();
        // }
    }, [])

    return (
        <Wrapper_main>
            <div ref={container}></div>
        </Wrapper_main>
    )
}

export default gallary

const Wrapper_main = styled.main`
    div {
        width: 100vw;
        height: 100vh;
    }
`;