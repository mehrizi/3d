import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export class Commons {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
    }

    init() {
        const renderer = new THREE.WebGLRenderer({
            antialias:true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);


        this.camera.position.z = 17;
        this.camera.position.x = 0;
        this.camera.position.y = 5;

        // const controls = new OrbitControls(this.camera, renderer.domElement);
        //
        const sun = new THREE.DirectionalLight(0xffffff, 1);
        // const sun = new THREE.PointLight(0xffffff, 1,1,.5);
        sun.position.set(0, 10, 15);
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        this.scene.add(sun, ambientLight);

        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        const self = this;
        function animate() {
            // controls.update();
            renderer.render(self.scene, self.camera);
        }
        renderer.setAnimationLoop(animate);

    }

    loadMonitor() {
        const loader = new GLTFLoader();
        const self = this;
        loader.load('./models/monitor.glb', function (gltf) {
            gltf.scene.scale.set(20, 15, 15);
            gltf.scene.position.y += -.73
            self.scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

    }
    loadRoom() {
        const loader = new GLTFLoader();
        const self = this;
        loader.load('./models/office.glb', function (gltf) {
            gltf.scene.scale.set(20, 15, 15);
            gltf.scene.position.y += -.73
            self.scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

    }
    // loadRoom() {
    //     const loader = new OBJLoader();
    //     const self = this;
    //     loader.load('./models/office.obj', function (gltf) {
    //         console.log(gltf);
    //         //  gltf.scale.setScalar(200);
    //         // gltf.position.y += -.73
    //         self.scene.add(gltf);
    //     }, undefined, function (error) {
    //         console.error(error);
    //     });

    // }
    // loadRoom() {
    //     const loader = new FBXLoader();
    //     const self = this;
    //     loader.load('./models/office.fbx', function (gltf) {
    //         console.log(gltf);
    //         //  gltf.scale.setScalar(200);
    //         // gltf.position.y += -.73
    //         self.scene.add(gltf);
    //     }, undefined, function (error) {
    //         console.error(error);
    //     });

    // }
    loadDesk() {
        const loader = new GLTFLoader();
        const self = this;
        loader.load('./models/desk.glb', function (gltf) {
            console.log(gltf);
            // gltf.setSize(100)
            gltf.scene.scale.set(35, 35, 35);
            // gltf.scene.rotation.x = Math.PI / 2;
            gltf.scene.position.y = -20.63;
            gltf.scene.position.z = 2;
            self.scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

    }


}