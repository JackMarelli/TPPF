import * as THREE from "three";
import GSAP from "gsap";
import "./style.css";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

//SCENE AND CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//GRID AND RENDERER
const size = 220;
const divisions = 16;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//LIGHTS
const pointLight0 = new THREE.PointLight(0xffffff, 1, 1000);
const ambientLight0 = new THREE.AmbientLight(0xffffff);
const pointLight0Helper = new THREE.PointLightHelper(pointLight0);

pointLight0.position.set(5, 5, 5);

scene.add(pointLight0);
scene.add(ambientLight0);
scene.add(pointLight0Helper);

//GLTF LOADER
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
loader.load(
  // resource URL
  "models/museo2.glb",
  // called when the resource is loaded
  function (gltf) {
    scene.add(gltf.scene);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

camera.position.set(3, 2, 0);
camera.lookAt(4, 2, 0);

const tl = GSAP.timeline();
let currentStep = 0;

window.addEventListener("wheel", () => {
  console.log(
    camera.position.x + "\n" + camera.position.y + "\n" + camera.position.z
  );
  currentStep += 1;

  switch (currentStep) {
    case 1:
      tl.to(camera.position, {
        x: 0,
        y: 2,
        z: 3,
        duration: 2,
        onUpdate: function () {
          camera.lookAt(camera.position.x +1, 2, camera.position.z);
        }
      });
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
console.log("finito");
