import * as THREE from "three";
// import GSAP from "gsap";
import "./style.css";

import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
// import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

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
_app.pointerLock = new PointerLockControls(_app.camera, _app.renderer.domElement);
_app.clock = new THREE.Clock();

// LIGHT VARIABLES
const _lights = {};
_lights.ambientLight0 = new THREE.AmbientLight(0xffffff);

//LISTENERS
document.querySelector("#btnStart").addEventListener("click", () => {
	document.querySelector("#curtain").classList.add("d-none");
	document.querySelector("#btnStart").classList.add("d-none");
	_app.currentStep = 1;
	_app.goToStep(_app.currentStep);
});

// SETUP
_app.renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(_app.renderer.domElement);

_app.scene.add(_app.gridHelper);
_app.scene.add(_lights.ambientLight0);

_app.camera.position.set(3, 2, 0);
_app.camera.lookAt(4, 2, 0);

_app.controls.movementSpeed = 0.6;
_app.controls.lookSpeed = 2;
_app.controls.rollSpeed = 0.2;
_app.controls.dragToLook = true;

document.addEventListener("keyup", (e) => {
	console.log("pressed '" + e.code + "'");
	switch (e.code) {
		case ("Space"):
			_app.camera.position.y += 0.2;
			break;
		case ("ShiftLeft"):
			_app.camera.position.y -= 0.2;
			break;
		case ("Enter"):
			console.log(
				Math.round((_app.camera.position.x + Number.EPSILON) * 100) / 100 + "\n",
				Math.round((_app.camera.position.y + Number.EPSILON) * 100) / 100 + "\n",
				Math.round((_app.camera.position.z + Number.EPSILON) * 100) / 100
			);
			console.log(
				Math.round((_app.camera.rotation.x + Number.EPSILON) * 100) / 100 + "\n",
				Math.round((_app.camera.rotation.y + Number.EPSILON) * 100) / 100 + "\n",
				Math.round((_app.camera.rotation.z + Number.EPSILON) * 100) / 100
			); break;
		default:
			break;
	}
});

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

function animate() {
	_app.controls.update(_app.clock.getDelta());
	requestAnimationFrame(animate);
	_app.renderer.render(_app.scene, _app.camera);
}

animate();
