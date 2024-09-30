import './style.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

import * as THREE from 'three';
import { Animator } from './src/animator.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


camera.position.z = 15;
camera.position.x = 0;
camera.position.y = 5;

const controls = new OrbitControls(camera, renderer.domElement);
//
const sun = new THREE.DirectionalLight(0xffffff,.8);
// const sun = new THREE.PointLight(0xffffff, 1,1,.5);
sun.position.set(0, 10, 15);
const ambientLight = new THREE.AmbientLight(0xffffff, .2);
scene.add(sun,ambientLight);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//

// const key = animator.createKey('A', 'a');
// scene.add(key);

const keyboard = Animator.createKeyboard();
keyboard.position.z += 5;
scene.add(keyboard);

Animator.loadMonitor(scene);
Animator.loadDesk(scene);

window.addEventListener('keypress',(e)=>{
  Animator.pressKey(e.key.toUpperCase());
})

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// on scroll body echo event
// window.addEventListener('wheel', function (e) {
//   cube.rotation.x += 0.05;
//   cube.rotation.y += 0.05;
//   // cube.rotation.z += 0.05;
// });
