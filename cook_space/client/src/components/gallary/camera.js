import * as THREE from "three";

const camera = {};

camera.init = (obj) => {

    camera.curr = new THREE.PerspectiveCamera( 60, obj.width / obj.height, 1, 20000 );

    return camera.curr;
}

export default camera;
