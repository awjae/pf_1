import * as THREE from "three";

const scene = {};

scene.init = () => {

    scene.curr = new THREE.Scene();
    scene.curr.background = new THREE.Color( 0xcce0ff );
    scene.curr.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

    return scene.curr;
}

export default scene;
