import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1,30,30);
// const material = new THREE.MeshBasicMaterial({ color: 0xffff00})
const material = new THREE.MeshStandardMaterial({ color: 0xffff00,metalness:.3,roughness:0})
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
const cube2 =cube.clone()
cube2.position.x = 3
const cube3 =cube.clone()
cube3.position.x = -3
scene.add(cube,cube2,cube3);

camera.position.z = 5;
// camera.position.x = 5;
// camera.position.y = 5;

const controls = new OrbitControls(camera, renderer.domElement);
//
const sun = new THREE.DirectionalLight(0xffffff,.8);
// const sun = new THREE.PointLight(0xffffff, 1,1,.5);
sun.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, .2);
scene.add(sun,ambientLight);
//

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// on scroll body echo event
window.addEventListener('wheel', function (e) {
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;
  // cube.rotation.z += 0.05;
});

window.addEventListener('scroll', function (e) {
  console.log(e);
});