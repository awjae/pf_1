import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const control = {};

control.init = (camera, renderer) => {

    // controls
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.45;
    // controls.minDistance = 5;
    // controls.maxDistance = 3;
    controls.dampingFactor = 0.25; // friction
    controls.rotateSpeed = 1; // mouse sensitivity
    controls.panSpeed = 1;
    controls.zoomSpeed = 1.2;
    // controls.enablePan = false;
    // smooth Zoom


    control.curr = controls;
    return control.curr;
}

export default control;
