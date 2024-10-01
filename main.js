import {Screen} from './src/screen.js'
import * as THREE from 'three';
import { Commons } from './src/commons.js'
import { Keyboard } from './src/keyboard.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const commons = new Commons(scene,camera);
commons.init();
commons.loadMonitor()
commons.loadDesk()
//
const keyboard = new Keyboard(scene)
keyboard.create()

screen = new Screen(scene,keyboard);
for (let i =0; i<24;i++){
  await screen.type('Hello World!');
  screen.newLine();
  
}

window.addEventListener('keydown',async (e)=>{
  console.log(e);
  
  keyboard.keyDown(e.key.toUpperCase());
  await screen.type(e.key);
})
window.addEventListener('keyup',(e)=>{
  console.log(e);
  
  keyboard.keyUp(e.key.toUpperCase());
})
