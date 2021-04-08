import * as THREE from "three";

const light = {};

light.init = () => {

    const color = 0xFFFFFF;
    const intensity = 1;
    light.curr = new THREE.AmbientLight(color, intensity);

    return light.curr;
}

export default light;
