import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

const fence = {};

fence.init = (scene) => {

    // const loader = new OBJLoader();
    // loader.load("./assets/object/fence_1.obj",
    //     // called when resource is loaded
    //     (object) => {
    //         scene.add(object);
    //     },
    //     // called when loading is in progresses
    //     (xhr) => {
    //         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    //     },
    //     // called when loading has errors
    //     ( error ) => {
    //         console.log( 'An error happened' );
    //     }
    // );
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('../assets/gallary/object/fence.gltf',
        (gltf) => {
            fence.curr = gltf;
            gltf.scene.scale.multiplyScalar(2.5);
            gltf.scene.position.z = -5;
            gltf.scene.position.x = -315;
            gltf.scene.traverse( function( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
            });
            scene.add( gltf.scene );

            for (let i = gltf.scene.position.x + 60; i <= 300; i += 60) {
                let clone = gltf.scene.clone();
                clone.position.x = i;
                scene.add( clone );
            }
        },
        (xhr)  => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        (error) => {
            console.log( 'An error happened' );
        }
    );


    return fence.curr;
}

export default fence;
