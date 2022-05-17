import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default class WebGl {
    private scene;
    private camera;
    private renderer;
    private controls;
    private skeleton;

    constructor(el) {
        this.setScene();
        this.setLight();
        this.setGround();
        this.setCamera();
        this.setModel('models/Xbot.glb');
        this.setRenderer();
        this.setControls();
        this.setCanvas(el);
    }

    setScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xa0a0a0 );
        this.scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );
    }
    setLight() {
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set( 0, 20, 0 );
        this.scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set( 0, 20, 10 );
        this.scene.add( dirLight );
    }
    setGround() {
        const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        this.scene.add( mesh );
        const grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        this.scene.add( grid );
    }
    setCamera() {
        this.camera = new THREE.PerspectiveCamera( 12, 1, 0.1, 50 );
        this.camera.position.set( 0, 2, 10 );
    }
    setModel(path) {
        const loader = new GLTFLoader();
        loader.load( path, function ( gltf ) {
          const model = gltf.scene;
          this.scene.add( model );
          model.traverse( function ( object ) {
            if ( object.isMesh ) object.castShadow = true;
          });
          this.skeleton = new THREE.SkeletonHelper( model );
          this.skeleton.visible = true;
          this.scene.add( this.skeleton );
          this.debuggingBone();
        }.bind(this));
    }
    setControls() {
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.target.set( 0, 1, 0 );
    }
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( 500, 500 );
        this.renderer.render( this.scene, this.camera );
    }
    setCanvas(el) {
        el.appendChild(this.renderer.domElement);
    }
    getControls() {
        return this.controls
    }
    getRenderer() {
        return this.renderer
    }
    getCamera() {
        return this.camera
    }
    getScene() {
        return this.scene
    }
    getSkeleton() {
        return this.skeleton
    }
    debuggingBone(face :any, rightArm :any) {
        if (this.skeleton) {
            // 180도 = 3.14
            // console.dir(rightArm.z / 80)
            // console.log("arm, forearm, hand : ", this.skeleton.bones[10], this.skeleton.bones[11], this.skeleton.bones[12]);
            // console.log("arm, forearm, hand : ", this.skeleton.bones[34], this.skeleton.bones[35], this.skeleton.bones[36]);
            this.skeleton.bones[5].rotation.x = ( +face.x / 60);
            this.skeleton.bones[5].rotation.y = ( +face.y / 80);
            this.skeleton.bones[5].rotation.z = ( +face.z / 60);
            this.skeleton.bones[34].rotation.z = ( +rightArm.z / 80);
            this.skeleton.bones[34].rotation.y = rightArm.y / 45;
        }
    }
}