import * as THREE from "three";

const light = {};

light.init = () => {

    const color = 0xFFFFFF;
    const intensity = 1;
    light.curr = new THREE.AmbientLight(color, intensity);

    return light.curr;
}

light.directLight = () => {
    const dirLight = new THREE.DirectionalLight( 0xdfebff, 1 );
    dirLight.position.set( 50, 200, 100 );
    dirLight.position.multiplyScalar( 1.3 );

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;

    const d = 300;

    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;

    dirLight.shadow.camera.far = 1000;

    return dirLight;
};

export default light;
