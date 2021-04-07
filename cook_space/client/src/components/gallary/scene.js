import * as THREE from "three";

const scene = {};

scene.init = () => {

    scene.curr = new THREE.Scene();

    return scene.curr;
}

export default scene;
