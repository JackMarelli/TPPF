import * as THREE from "three";
import GSAP from "gsap";
import "./css/style.css";

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
_app.descsDiv = document.querySelector("#descs");
_app.dracoLoader = new DRACOLoader();
_app.gridDivisions = 16;
_app.gridHelper = new THREE.GridHelper(_app.size, _app.divisions);
_app.gridSize = 220;
_app.loader = new GLTFLoader();
_app.maxStep = 10;
_app.renderer = new THREE.WebGLRenderer();
_app.scene = new THREE.Scene();
_app.texts = new Map();
_app.titlesDiv = document.querySelector("#titles");

//LISTENERS
document.querySelector("#btnStart").addEventListener("click", () => {
  document.querySelector("#curtain").classList.add("d-none");

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

document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowRight":
      if (_app.currentStep < _app.maxStep) {
        _app.currentStep++;
      } else {
        _app.currentStep = 1;
      }
      _app.goToStep(_app.currentStep);
      break;
    case "ArrowLeft":
      if (_app.currentStep > 1) {
        _app.currentStep--;
      } else {
        _app.currentStep = _app.maxStep;
      }
      _app.goToStep(_app.currentStep);
      break;
  }
});

window.addEventListener('resize', () => {
  _app.camera.aspect = window.innerWidth / window.innerHeight;
  _app.camera.updateProjectionMatrix();
  _app.renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

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
    case 1: //entrata
      _app.moveCamera(0, 3.08, 9.31, 2);
      _app.rotateCamera(0.02, 0, 0, 2);
      _app.setText("Benvenuto", _app.texts.get("Benvenuto"));
      break;
    case 9: //maschera front
      _app.moveCamera(6.28, 1.63, 0, 3);
      _app.rotateCamera(-1.34, -1.51, -1.34, 3);
      _app.setText(
        "Maschera Cava",
        _app.texts.get("Maschera Cava")
      );
      break;
    case 10: //maschera side
      _app.moveCamera(8.54, 1.42, 2.52, 3);
      _app.rotateCamera(0.04, 0.01, -0.01, 3);
      _app.setText(
        "Maschera Cava",
        _app.texts.get("Maschera Cava")
      );
      break;
    case 7: //casa front
      _app.moveCamera(-0.2, 2.1, -4.81, 3);
      _app.rotateCamera(-0.32, 0.08, -0, 3);
      _app.setText("Casa Destrutturata", _app.texts.get("Casa Destrutturata"));
      break;
    case 8: //casa side
      _app.moveCamera(1.23, 2.12, -6.69, 3);
      _app.rotateCamera(-0.54, 0.58, 0.32, 3);
      _app.setText("Casa Destrutturata", _app.texts.get("Casa Destrutturata"));
      break;
    case 2: //palle
      _app.moveCamera(5.33, 2.64, 6.35, 3);
      _app.rotateCamera(-3.0, -0.2, -3.14, 3);
      _app.setText("Illusione di Ebbinghaus", _app.texts.get("Illusione di Ebbinghaus"));
      break;
    case 5: //rombo impossibile front
      _app.moveCamera(-1.6, 2.62, -0.43, 4);
      _app.rotateCamera(-1.93, 1.42, 1.94, 3);
      _app.setText("Rombo impossibile", _app.texts.get("Rombo impossibile"));
      break;
    case 6: //rombo impossibile side
      _app.moveCamera(-6.82, 2.15, 1.84, 3);
      _app.rotateCamera(-0.33, 0.68, 0.29, 3);
      _app.setText("Rombo impossibile", _app.texts.get("Rombo impossibile"));
      break;
    case 3: //triangolo decostruito front
      _app.moveCamera(-5.35, 5.79, 4.39, 3);
      _app.rotateCamera(-2.51, 0.04, -3.14, 3);
      _app.setText(
        "Triangolo di Penrose",
        _app.texts.get("Triangolo di Penrose")
      );
      break;
    case 4: //triangolo decostruito side
      _app.moveCamera(-8.73, 3.25, 7.3, 3);
      _app.rotateCamera(-2.61, -1.2, -2.63, 3);
      _app.setText(
        "Triangolo di Penrose",
        _app.texts.get("Triangolo di Penrose")
      );
      break;
    default:
      _app.currentStep = 0;
  }
};

_app.moveCamera = (x, y, z, d) => {
  GSAP.to(_app.camera.position, {
    duration: d,
    ease: "power1.out",
    x,
    y,
    z
  });
};

_app.resetCamera = () => {
  _app.camera.position.set(0, 0, 0);
  _app.camera.rotation.set(0, 0, 0);
};

_app.rotateCamera = (x, y, z, d) => {
  GSAP.to(_app.camera.rotation, {
    duration: d,
    ease: "power2.out",
    x,
    y,
    z,
  });
};

_app.setup = () => {
  _app.pl1 = new THREE.PointLight(0xffffff, 1, 3);
  _app.pl1.position.set(6.28, 3.63, 0);
  _app.scene.add(_app.pl1);

  _app.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(_app.renderer.domElement);

  //_app.scene.add(_app.gridHelper);
  _app.scene.add(_app.ambientLight0);

  _app.camera.position.set(0, 3, 9);
  _app.camera.lookAt(0, 0, 0);

  // LOAD 3D MODEL (DracoLoader is optional, decodes compressed mesh data)
  _app.dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
  _app.loader.setDRACOLoader(_app.dracoLoader);
  _app.loader.load(
    "/assets/models/museo.glb", //model path
    function (gltf) {
      _app.scene.add(gltf.scene);
      gltf.animations;
      gltf.scene;
      gltf.scenes;
      gltf.cameras;
      gltf.asset;
    }
  );

  _app.texts.set("Benvenuto", "nella mostra Illusioni");
  _app.texts.set(
    "Illusione di Ebbinghaus",
    "I due cerchi centrali sono identici ma appaiono diversi perch?? circondati da cerchi pi?? piccoli o pi?? grandi. Il cervello interpreta in modo diverso la loro grandezza in rapporto al contesto."
  );
  _app.texts.set(
    "Maschera Cava",
    "Quando le persone guardano la maschera concava hanno l'impressione di vedere la faccia convessa, come se fosse una faccia vista di fronte."
  );
  _app.texts.set(
    "Casa Destrutturata",
    "In questo anamorfismo tridimensionale la casa sembra intera se vista da un solo punto di vista. Se ci si sposta le figure diventano geometrie indipendenti."
  );
  _app.texts.set(
    "Triangolo di Penrose",
    "Il triangolo di Penrose pu?? esistere solamente come rappresentazione bidimensionale e non pu?? essere costruito nello spazio, poich?? presenta una sovrapposizione impossibile di linee con differenti costruzioni prospettiche."
  );
  _app.texts.set(
    "Rombo impossibile",
    "Ispirato del cubo di Escher nel rombo impossibile la raffigurazione degli spigoli come oggetti solidi rende certa la collocazione delle facce anteriore e posteriore ma i prismi che costituiscono gli spigoli laterali si intrecciano in modo impossibile per un oggetto tridimensionale."
  );
};

_app.setText = (title, desc) => {
  _app.titlesDiv.textContent = title;
  _app.descsDiv.textContent = desc;
};

//ANIMATES
_app.setup();
_app.animate();
