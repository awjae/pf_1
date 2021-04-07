import * as THREE from "three";

const renderer = {};

renderer.init = (obj) => {

    renderer.curr = new THREE.WebGLRenderer();
    renderer.curr.setSize( obj.width, obj.height );

    return renderer.curr;
}

export default renderer;
