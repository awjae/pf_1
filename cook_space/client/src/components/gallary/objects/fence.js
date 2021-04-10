import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const fence = {};

fence.init = (scene) => {

    const loader = new OBJLoader();
    loader.load("./assets/object/fence_1.obj",
        // called when resource is loaded
        (object) => {
            scene.add(object);
        },
        // called when loading is in progresses
        (xhr) => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        ( error ) => {
            console.log( 'An error happened' );
        }
    );
    return fence.curr;
}

export default fence;
