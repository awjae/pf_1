import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components';
import * as THREE from "three";
import renderWrapper from '../components/gallary/renderer';
import sceneWrapper from '../components/gallary/scene';
import cameraWrapper from '../components/gallary/camera';
import floorWrapper from '../components/gallary/floor';
import groundWrapper from '../components/gallary/ground';
import lightWrapper from '../components/gallary/light';
import controller from '../components/gallary/control';
import control from '../components/gallary/control';

import fenceModel from '../components/gallary/objects/fence';
import treeModel from '../components/gallary/objects/tree';
import benchModel from '../components/gallary/objects/bench';
 
const gallary = () => {

    const container = useRef(null);

    useEffect(() => {
        
        const obj = {
            width: container.current.clientWidth,
            height: container.current.clientHeight
        };        

        const scene = sceneWrapper.init();
        const camera = cameraWrapper.init(obj);
        const floor = floorWrapper.init();
        const ground = groundWrapper.init();
        const light = lightWrapper.init();
        const dirLight = lightWrapper.directLight();
        
        // camera.position.set(0, 20, 20);
        camera.position.set(-335, 12, 20);
        camera.rotation.x = Math.PI * (-0.05);

        const renderer = renderWrapper.init(obj);
        container.current.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        cube.translateY(2);

        //scene.add(floor);
        scene.add(cube);
        scene.add(ground);
        scene.add(light);
        scene.add(dirLight);

        // const controls = controller.init(camera, renderer);
        const controls = controller.pointerLock(camera, renderer);

        //랜더링 갱신
        const animate = () => {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            camera.position.x += 0.1;
            if (camera.position.x > 340) {
                camera.position.x = -340;
            }

            renderer.render(scene, camera);
            
        }
        
        animate();

        //object
        const tree = treeModel.init(scene);       
        const fence = fenceModel.init(scene);
        const bench = benchModel.init(scene);
        
        window.g = {
            scene,
            camera,
            controls,
        }

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
