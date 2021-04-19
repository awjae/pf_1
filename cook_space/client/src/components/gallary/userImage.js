import * as THREE from "three";
import img1 from "../../assets/userImages/72.jpg";
import img2 from "../../assets/userImages/Deer.jpg";
import img3 from "../../assets/userImages/vecteezy_background-green-background1_fr0121.jpg";
import img4 from "../../assets/userImages/vecteezy_background-floral-background1_fr0221.jpg";
import img5 from "../../assets/userImages/gummy-designer-tools-1.png";
import img6 from "../../assets/userImages/gummy-programming.png";
import img7 from "../../assets/userImages/Scene-20.jpg";
import img8 from "../../assets/userImages/Scene-24.jpg";
import img9 from "../../assets/userImages/gummy-autumn.png";
import img10 from "../../assets/userImages/gummy-city.png";
import img11 from "../../assets/userImages/cloud.png";

const userImage = {};

userImage.init = (scene) => {

    const loader = new THREE.TextureLoader();
    const imgArr = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];
    for (let i = -315, j = 0; i <= 300; i += 60, j++) {
        const mesh = loader.load(imgArr[j]);
        const geometry = new THREE.PlaneGeometry( 6, 6 );
        const material = new THREE.MeshLambertMaterial( { map: mesh } );
        const image = new THREE.Mesh( geometry, material );
        image.position.x = i;
        image.position.z = -4.9;
        image.position.y = 5;
        image.castShadow = true;
        scene.add(image);
    }
    return userImage.curr;
}

export default userImage;
