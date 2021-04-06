import * as THREE from "three";

const floor = {};

floor.init = (scene) => {

    floor.geometry = new THREE.PlaneGeometry( 10, 10 );
    floor.material = new THREE.MeshLambertMaterial( { color: 0x4676b6 } );
    floor.mesh = new THREE.Mesh( floor.geometry, floor.material );
    floor.mesh.rotation.x = Math.PI * - 0.5;
    floor.mesh.receiveShadow = true;

    scene.add( floor.mesh );
}

export default floor;
