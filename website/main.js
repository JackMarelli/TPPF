import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
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
  "models/museo.glb",
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

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.autoRotateSpeed = 10;

//const firstPersonControls = new THREE.FirstPersonControls(camera, renderer.domElement);

camera.position.set(0, 2, 5);
controls.update();

function updateCamera(ev) {
  let div1 = document.getElementById("div1");
  camera.position.x = 10 - window.scrollY / 500.0;
  camera.position.z = 10 - window.scrollY / 500.0;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("scroll", updateCamera);
animate();
