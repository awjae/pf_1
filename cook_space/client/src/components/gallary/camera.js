import * as THREE from "three";

const camera = {};

camera.init = (obj) => {

    camera.curr = new THREE.PerspectiveCamera( 75, obj.width / obj.height, 0.1, 1000 );

    return camera.curr;
}

export default camera;
