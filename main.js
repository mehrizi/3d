import { Screen } from '@/screen.js';
import { Commons } from '@/commons.js';
import { Keyboard } from '@/keyboard.js';
import { Player } from '@/player.js';
import * as THREE from 'three';

class App {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Initialize commons, keyboard, screen, and player
        this.commons = new Commons(this.scene, this.camera);
        this.keyboard = new Keyboard(this.scene);
        this.screen = new Screen(this.scene, this.keyboard);
        this.player = new Player(this.scene);

        // Bind event listeners
        this.initEventListeners();

        // Start initialization and animation loop
        this.init();
        this.animate();
    }

    async init() {
        await this.commons.init();
        // this.commons.loadRoom();

        this.keyboard.create();

        for (let i = 0; i < 24; i++) {
            await this.screen.type('Hello World!');
            this.screen.newLine();
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
        this.player.update(); // Update the animation mixer
    }

    initEventListeners() {
        window.addEventListener('keydown', async (e) => {
            this.keyboard.keyDown(e.code);
            console.log(e.key)

            switch (e.key) {
                case 'Backspace':
                    this.screen.backspace();
                    break;
                case 'Enter':
                    this.screen.newLine();
                    setTimeout(() => this.keyboard.keyUp(e.code), 100);
                    break;
                case 'p': // Example to play player animation
                    this.player.play('walking');
                    break;
                case ' ':
                    this.player.play('jump-up');
                    break;
                default:
                    if (e.key.length === 1) await this.screen.type(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            setTimeout(() => this.keyboard.keyUp(e.code), 100);
        });
    }
}

// Initialize the app
new App();
