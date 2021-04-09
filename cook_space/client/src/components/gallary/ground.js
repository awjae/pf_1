import * as THREE from "three";
import grassTexture from "../../assets/textures/GrassGreenTexture0002.jpg";

const ground = {};

ground.init = () => {
    console.log(grassTexture)
    const mesh = new THREE.TextureLoader().load(grassTexture);
    mesh.wrapS = THREE.RepeatWrapping;
    mesh.wrapT = THREE.RepeatWrapping;
    mesh.repeat.set(25, 25);
    const geometry = new THREE.PlaneGeometry( 10, 10 );
    const material = new THREE.MeshLambertMaterial( { map: mesh } );
    ground.curr = new THREE.Mesh( geometry, material );
    ground.curr.rotation.x = Math.PI * - 0.5;

    return ground.curr;
}

export default ground;
