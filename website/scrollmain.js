import * as THREE from "three";
import GSAP from "gsap";
import "./style.css";

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
_app.clock = new THREE.Clock();

// LIGHT VARIABLES
const _lights = {};
_lights.ambientLight0 = new THREE.AmbientLight(0xffffff);

// SETUP
_app.renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(_app.renderer.domElement);

_app.scene.add(_app.gridHelper);
_app.scene.add(_lights.ambientLight0);

_app.camera.position.set(3, 2, 0);
_app.camera.lookAt(4, 2, 0);

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

// GSAP ANIMATIONS
_app.camera.position.set(3, 2, 0);
_app.camera.lookAt(4, 2, 0);

const tl = GSAP.timeline();
let currentStep = 0;

window.addEventListener("wheel", () => {
	console.log(
		_app.camera.position.x + "\n" + _app.camera.position.y + "\n" + _app.camera.position.z
	);
	currentStep += 1;

	switch (currentStep) {
		case 1:
			tl.to(_app.camera.position, {
				x: 0,
				y: 2,
				z: 3,
				duration: 2,
				onUpdate: function () {
					_app.camera.lookAt(_app.camera.position.x + 1, 2, _app.camera.position.z);
				}
			});
	}
});


function animate() {
	requestAnimationFrame(animate);
	_app.renderer.render(_app.scene, _app.camera);
}

animate();

