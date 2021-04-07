import * as THREE from "three";

const floor = {};

floor.init = () => {

    const geometry = new THREE.PlaneGeometry( 10, 10 );
    const material = new THREE.MeshLambertMaterial( { color: 0x4676b6 } );
    floor.curr = new THREE.Mesh( geometry, material );
    floor.curr.rotation.x = Math.PI * - 0.5;
    floor.curr.receiveShadow = true;

    return floor.curr;
}

export default floor;
