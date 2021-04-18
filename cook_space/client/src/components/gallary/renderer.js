import * as THREE from "three";

const renderer = {};

renderer.init = (obj) => {

    renderer.curr = new THREE.WebGLRenderer({ antialias: true });
    renderer.curr.setSize( obj.width, obj.height );
    renderer.curr.shadowMap.enabled = true;
    return renderer.curr;
}

export default renderer;
