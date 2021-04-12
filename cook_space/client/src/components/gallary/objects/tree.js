import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

const tree = {};

tree.init = (scene) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/object/tree.gltf',
        (gltf) => {
            tree.curr = gltf;
            gltf.scene.scale.multiplyScalar(0.08);
            gltf.scene.rotateY(90 * Math.PI / 180 );
            gltf.scene.position.z = -10;
            gltf.scene.position.x = -300;
            
            // gltf.animations; // Array<THREE.AnimationClip>
            // gltf.scene; // THREE.Group
            // gltf.scenes; // Array<THREE.Group>
            // gltf.cameras; // Array<THREE.Camera>
            // gltf.asset; // Object
            scene.add( gltf.scene );

            for (let i = gltf.scene.position.x + 60; i <= 300; i += 60) {
                let clone = gltf.scene.clone();
                clone.position.x = i;
                scene.add( clone );
            }
        },
        // called while loading is progressing
        (xhr)  => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        (error) => {
            console.log( 'An error happened' );
        }
    );
    return tree.curr;
}

export default tree;
