import { Screen } from '@/screen.js';
import { Commons } from '@/commons.js';
import { Keyboard } from '@/keyboard.js';
import { Player } from '@/player.js';
import * as THREE from 'three';
import './style.css';

class App {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Initialize commons, keyboard, screen, and player
        this.commons = new Commons(this.scene, this.camera);
        this.keyboard = new Keyboard(this.scene);
        this.screen = new Screen(this.scene, this.keyboard);
        this.player = new Player(this.scene);

        // Player animation mapping
        this.animationKeys = {
            ArrowUp: 'walking',
            ArrowLeft: 'turn-left',
            ArrowRight: 'turn-right',
            ' ': 'jumping',
            p: 'waving',
            o: 'opening',
        };

        // Track currently active keys
        this.activeKeys = new Set();

        // Bind event listeners
        this.initEventListeners();

        // Start initialization and animation loop
        this.init();
        this.animate();
    }

    async init() {
        await this.commons.init();
        this.keyboard.create();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
        this.player.update(); // Update the animation mixer
    }

    initEventListeners() {
        // Keydown event listener
        window.addEventListener('keydown', async (e) => {
            if (this.activeKeys.has(e.key)) return; // Ignore if key is already active
            this.activeKeys.add(e.key);

            // Play animation based on mapped keys
            const animation = this.animationKeys[e.key];
            if (animation) {
                this.player.play(animation);
                return; // Exit early to avoid processing further
            }

            // Handle other key actions (like screen typing)
            switch (e.key) {
                case 'Backspace':
                    this.screen.backspace();
                    break;
                case 'Enter':
                    this.screen.newLine();
                    break;
                default:
                    if (e.key.length === 1) await this.screen.type(e.key);
            }
        });

        // Keyup event listener
        window.addEventListener('keyup', (e) => {
            if (this.activeKeys.has(e.key)) {
                this.activeKeys.delete(e.key);

                // Stop animation if the key corresponds to an animation
                const animation = this.animationKeys[e.key];
                if (animation) {
                    this.player.stop();
                }
            }
        });
    }
}

// Initialize the app
new App();
