import { Screen } from './src/screen.js'
import * as THREE from 'three';
import { Commons } from './src/commons.js'
import { Keyboard } from './src/keyboard.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const commons = new Commons(scene, camera);
commons.init();
commons.loadMonitor()
commons.loadDesk()
//
const keyboard = new Keyboard(scene)
keyboard.create()

screen = new Screen(scene, keyboard);
for (let i = 0; i < 24; i++) {
  await screen.type('Hello World!');
  screen.newLine();

}

window.addEventListener('keydown', async (e) => {
  console.log(e);
  keyboard.keyDown(e.code);

  switch (e.key) {
    case 'Backspace':
      screen.backspace();
      break;
    case 'Enter':
      screen.newLine();
      setTimeout(()=>keyboard.keyUp(e.code),100)
      break;
    default:
      if (e.key.length == 1)
      await screen.type(e.key);
  }

})
window.addEventListener('keyup', (e) => {
  console.log(99,e);

  setTimeout(()=>keyboard.keyUp(e.code),100);
})
