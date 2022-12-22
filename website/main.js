import * as THREE from "three";
import "./style.css";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.CylinderGeometry(1, 1, 3);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(5, 5, 5);
scene.add(light);

const lightGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const lightPoint = new THREE.Mesh(lightGeometry, lightMaterial);
lightPoint.position.set(light.position.x, light.position.y, light.position.z);
scene.add(lightPoint);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.autoRotateSpeed = 10;

camera.position.set(0, 2, 5);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
