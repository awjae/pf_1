import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

const animal = {};

animal.init = (scene) => {

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('../assets/gallary/object/deer.gltf',
        (gltf) => {
            animal.curr = gltf;

            gltf.scene.scale.multiplyScalar(0.7);
            gltf.scene.rotateY(-40 * Math.PI / 180 );
            gltf.scene.position.z = -12;
            gltf.scene.position.x = -333;
            gltf.scene.traverse( function( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
            });
            scene.add( gltf.scene );

            for (let i = gltf.scene.position.x + 180; i <= 300; i += 180) {
                let clone = gltf.scene.clone();
                clone.position.x = i;
                scene.add( clone );
            }
        },
        (xhr)  => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        (error) => {
            console.log( 'An error happened' );
        }
    );

    gltfLoader.load('../assets/gallary/object/cat.gltf',
        (gltf) => {
            animal.curr = gltf;

            gltf.scene.scale.multiplyScalar(0.3);
            gltf.scene.rotateY(-60 * Math.PI / 180 );
            gltf.scene.position.z = -8;
            gltf.scene.position.x = -237;
            gltf.scene.traverse( function( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
            });
            scene.add( gltf.scene );

            for (let i = gltf.scene.position.x + 180; i <= 300; i += 120) {
                let clone = gltf.scene.clone();
                clone.position.x = i;
                scene.add( clone );
            }
        },
        (xhr)  => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        (error) => {
            console.log( 'An error happened' );
        }
    );

    gltfLoader.load('../assets/gallary/object/dog.gltf',
    (gltf) => {
        animal.curr = gltf;

        gltf.scene.scale.multiplyScalar(0.3);
        gltf.scene.rotateY(130 * Math.PI / 180 );
        gltf.scene.position.z = 0;
        gltf.scene.position.x = -207;
        gltf.scene.traverse( function( node ) {
            if ( node.isMesh || node.isLight ) node.castShadow = true;
        });
        scene.add( gltf.scene );

        for (let i = gltf.scene.position.x + 180; i <= 300; i += 120) {
            let clone = gltf.scene.clone();
            clone.position.x = i;
            scene.add( clone );
        }
    },
    (xhr)  => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    (error) => {
        console.log( 'An error happened' );
    }
);

    return animal.curr;
}

export default animal;
