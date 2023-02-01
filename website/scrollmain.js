import * as THREE from "three";
import GSAP from "gsap";
import "./style.css";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// APP VARIABLES
const _app = {};
_app.ambientLight0 = new THREE.AmbientLight(0xffffff);
_app.camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
_app.clock = new THREE.Clock();
_app.cssRoot = document.querySelector(":root");
_app.currentStep = 0;
_app.dracoLoader = new DRACOLoader();
_app.gridDivisions = 16;
_app.gridHelper = new THREE.GridHelper(_app.size, _app.divisions);
_app.gridSize = 220;
_app.loader = new GLTFLoader();
_app.maxStep = 3;
_app.renderer = new THREE.WebGLRenderer();
_app.scene = new THREE.Scene();

//LISTENERS
document.querySelector("#btnStart").addEventListener("click", () => {
  document.querySelector("#curtain").classList.add("d-none");
  document.querySelector("#btnStart").classList.add("d-none");

  _app.cssRoot.style.setProperty("--bg-color", "transparent");
  _app.cssRoot.style.setProperty("--text-color", "#fff");

  _app.currentStep = 1;
  _app.goToStep(_app.currentStep);
});

document.querySelector("#btnRight").addEventListener("click", () => {
  if (_app.currentStep < _app.maxStep) {
    _app.currentStep++;
  } else {
    _app.currentStep = 1;
  }
  _app.goToStep(_app.currentStep);
});

document.querySelector("#btnLeft").addEventListener("click", () => {
  if (_app.currentStep > 1) {
    _app.currentStep--;
  } else {
    _app.currentStep = _app.maxStep;
  }
  _app.goToStep(_app.currentStep);
});

//FUNCTIONS
_app.animate = () => {
  requestAnimationFrame(_app.animate);
  _app.renderer.render(_app.scene, _app.camera);
};

_app.goToStep = (step) => {
  console.log("step", step);
  switch (step) {
    case 0:
      document.querySelector("#curtain").classList.add("d-initial");
      document.querySelector("#btnStart").classList.add("d-initial");
      _app.resetCamera();
      break;
    case 1:
      _app.moveCamera(3.14, 2.66, -1.17, 2);
      _app.rotateCamera(-2.52, -1.29, -2.54, 2);
      break;
    case 2:
      _app.moveCamera(-3.4, 2.55, -0.37, 2);
      _app.rotateCamera(-2.75, 1.39, 2.74, 2);
      break;
    case 3:
      _app.moveCamera(4.08, 3.46, -3.11, 2);
      _app.rotateCamera(-3.03, 0.29, 3.12, 2);
      break;
    default:
      _app.currentStep = 0;
  }
};

_app.moveCamera = (x, y, z, d) => {
  GSAP.to(_app.camera.position, {
    x,
    y,
    z,
    duration: d,
  });
};

_app.resetCamera = () => {
  _app.camera.position.set(0, 0, 0);
  _app.camera.rotation.set(0, 0, 0);
};

_app.rotateCamera = (x, y, z, d) => {
  GSAP.to(_app.camera.rotation, {
    x,
    y,
    z,
    duration: d,
  });
};

_app.setup = () => {
  _app.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(_app.renderer.domElement);

  _app.scene.add(_app.gridHelper);
  _app.scene.add(_app.ambientLight0);

  _app.camera.position.set(3, 2, 0);
  _app.camera.lookAt(4, 2, 0);

  // LOAD 3D MODEL (DracoLoader is optional, decodes compressed mesh data)
  _app.dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
  _app.loader.setDRACOLoader(_app.dracoLoader);
  _app.loader.load(
    "/assets/models/museo2.glb", //model path
    function (gltf) {
      _app.scene.add(gltf.scene);
      gltf.animations;
      gltf.scene;
      gltf.scenes;
      gltf.cameras;
      gltf.asset;
    }
  );
};

//ANIMATES
_app.setup();
_app.animate();
