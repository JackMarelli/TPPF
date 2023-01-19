import * as THREE from "three";
import GSAP from "gsap";
import "./style.css";

import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// APP VARIABLES
const _app = {};
_app.scene = new THREE.Scene();
_app.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
_app.gridSize = 220;
_app.gridDivisions = 16;
_app.gridHelper = new THREE.GridHelper(_app.size, _app.divisions);
_app.renderer = new THREE.WebGLRenderer();
_app.loader = new GLTFLoader();
_app.dracoLoader = new DRACOLoader();
_app.controls = new FirstPersonControls(_app.camera, _app.renderer.domElement);
_app.clock = new THREE.Clock();

// LIGHT VARIABLES
const _lights = {};
_lights.ambientLight0 = new THREE.AmbientLight(0xffffff);
_lights.pointLight0 = new THREE.PointLight(0xffffff, 1, 1000);
_lights.pointLight0Helper = new THREE.PointLightHelper(_lights.pointLight0);

// SETUP
_app.renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(_app.renderer.domElement);
_lights.pointLight0.position.set(5, 5, 5);

_app.scene.add(_app.gridHelper);
_app.scene.add(_lights.pointLight0);
_app.scene.add(_lights.ambientLight0);
_app.scene.add(_lights.pointLight0Helper);

_app.camera.position.set(3, 2, 0);
_app.camera.lookAt(4, 2, 0);

_app.controls.movementSpeed = 20;
_app.controls.lookSpeed = 0.1;

// LOAD 3D MODEL (DracoLoader is optional, decodes compressed mesh data)
_app.dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
_app.loader.setDRACOLoader(_app.dracoLoader);
_app.loader.load(
  "models/museo2.glb", //model path
  function (gltf) {
    _app.scene.add(gltf.scene);
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;
  }
);

function animate() {
  _app.controls.update(_app.clock.getDelta())
  requestAnimationFrame(animate);
  _app.renderer.render(_app.scene, _app.camera);
}

animate();
