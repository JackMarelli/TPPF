import * as THREE from "three";
// import GSAP from "gsap";
import "./style.css";

// import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { FlyControls } from "three/addons/controls/FlyControls.js";

// APP VARIABLES
const _app = {};
_app.scene = new THREE.Scene();
_app.camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
_app.gridSize = 220;
_app.gridDivisions = 16;
_app.gridHelper = new THREE.GridHelper(_app.size, _app.divisions);
_app.renderer = new THREE.WebGLRenderer();
_app.loader = new GLTFLoader();
_app.dracoLoader = new DRACOLoader();
_app.controls = new FlyControls(_app.camera, _app.renderer.domElement);
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

function animate() {
	_app.controls.update(_app.clock.getDelta());
	requestAnimationFrame(animate);
	_app.renderer.render(_app.scene, _app.camera);
}

animate();
