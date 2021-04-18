import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

const bench = {};

bench.init = (scene) => {

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/object/bench_2.gltf',
        (gltf) => {
            bench.curr = gltf;
            gltf.scene.scale.multiplyScalar(0.12);
            gltf.scene.rotateY(180 * Math.PI / 180 );
            gltf.scene.position.z = 4.5;
            gltf.scene.position.x = -314;
            gltf.scene.traverse( function( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
            });
            
            let y = 0;
            for (let i = gltf.scene.position.x; i <= 300; i += 60) {
                let clone = gltf.scene.clone();
                clone.position.x = i;
                y++;
                switch (y%3) {
                    case 0 : 
                        clone.rotateY(-15 * Math.PI / 180 );
                        clone.position.x -= 5;
                        break;
                    
                    case 2 :
                        clone.rotateY(15 * Math.PI / 180 );
                        clone.position.x += 5;
                        break;
                    default :
                        break;
                };

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

    return bench.curr;
}

export default bench;
