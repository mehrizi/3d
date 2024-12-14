import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Player {
    constructor(scene) {
        this.scene = scene;
        this.mixer = null;
        this.model = null;
        this.animations = {};

        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('models/walking.glb', (gltf) => {
            this.model = gltf.scene;
            this.scene.add(this.model);

            // Position and scale the model (adjust as needed)
            this.model.position.set(0, 0, 0);
            this.model.scale.set(1, 1, 1);

            // Create AnimationMixer
            this.mixer = new THREE.AnimationMixer(this.model);

            // Extract and store animations
            gltf.animations.forEach((clip) => {
                this.animations[clip.name] = clip;
            });

            console.log('Player loaded with animations:', Object.keys(this.animations));
        });
    }

    play(animation = 'walking') {
        if (!this.mixer || !this.animations[animation]) {
            console.warn(`Animation "${animation}" not found.`);
            return;
        }

        // Stop all currently playing actions
        this.mixer.stopAllAction();

        // Play the requested animation
        const action = this.mixer.clipAction(this.animations[animation]);
        action.reset().play();
    }

    update(delta = 0.016) {
        if (this.mixer) this.mixer.update(delta);
    }
}
