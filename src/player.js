import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Player {
    constructor(scene) {
        this.scene = scene;
        this.mixer = null;
        this.model = null;
        this.animations = {};

        // Player properties
        this.position = new THREE.Vector3(0, 0, 0); // Initial position
        this.forwardVector = new THREE.Vector3(0, 0, 1); // Default forward direction
        this.movementSpeed = 2; // Units per second
        this.rotationSpeed = THREE.MathUtils.degToRad(90); // Degrees per second converted to radians
        this.moving = false; // Flag for movement
        this.turningLeft = false; // Flag for turning left
        this.turningRight = false; // Flag for turning right

        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('models/player-final.glb', (gltf) => {
            this.model = gltf.scene;
            this.scene.add(this.model);

            // Position and scale the model (adjust as needed)
            this.model.position.copy(this.position); // Sync model position with the player's position
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
        action.reset()
            .setLoop(THREE.LoopRepeat) // Loop the animation
            .play();

        // Automatically stop the action when finished
        action.clampWhenFinished = true;
        action.paused = false;

        // Handle movement and turning flags
        this.moving = animation === 'walking';
        this.turningLeft = animation === 'turn-left';
        this.turningRight = animation === 'turn-right';
    }

    stop() {
        // Stop movement and animations
        this.moving = false;
        this.turningLeft = false;
        this.turningRight = false;
        if (this.mixer) this.mixer.stopAllAction();
    }

    update(delta = 0.016) {
        if (this.mixer) this.mixer.update(delta);

        // Handle movement
        if (this.moving) {
            const deltaPosition = this.forwardVector.clone().multiplyScalar(this.movementSpeed * delta);
            this.position.add(deltaPosition);

            // Sync model position with the player's position
            if (this.model) {
                this.model.position.copy(this.position);
            }
        }

        // Handle turning left
        if (this.turningLeft) {
            this.rotatePlayer(this.rotationSpeed * delta); // Rotate left
        }

        // Handle turning right
        if (this.turningRight) {
            this.rotatePlayer(-this.rotationSpeed * delta); // Rotate right
        }
    }

    rotatePlayer(angle) {
        // Rotate the forward vector
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle); // Rotate around the Y-axis
        this.forwardVector.applyQuaternion(quaternion).normalize();

        // Update the model's rotation to match the forward vector
        if (this.model) {
            this.model.lookAt(this.position.clone().add(this.forwardVector));
        }
    }
}

