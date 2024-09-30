import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

export class Animator {
    static textDefaultColor = 0xdddddd

    // static getInstance() {
    //     if (!Animator.instance) {
    //         Animator.instance = new Animator()
    //     }
    //     return Animator.instance
    // }

    static createKey(char, char2, keyWidth = .6, keyHeight = .6) {
        const returnKey = {
            group: null,
            text: null,
            shape: null,
            keyMesh: null,
            textMesh: null,
            textMaterial: null
        }
        // Create a group to hold the key and text
        const keyGroup = new THREE.Group();

        // Key dimensions
        // const keyWidth = 0.6;
        // const keyHeight = 0.6;
        const keyDepth = 0.2;
        const cornerRadius = keyHeight * 0.1;

        // Create rounded rectangle shape
        const shape = new THREE.Shape();
        shape.moveTo(cornerRadius, 0);

        shape.lineTo(keyWidth - cornerRadius, 0);
        shape.quadraticCurveTo(keyWidth, 0, keyWidth, cornerRadius);

        shape.lineTo(keyWidth, keyHeight - cornerRadius);
        shape.quadraticCurveTo(keyWidth, keyHeight, keyWidth - cornerRadius, keyHeight);
        // shape.quadraticCurveTo(keyWidth,  keyHeight,  keyWidth,cornerRadius);

        shape.lineTo(cornerRadius, keyHeight);
        shape.quadraticCurveTo(0, keyHeight, 0, keyHeight - cornerRadius);

        shape.lineTo(0, cornerRadius);
        shape.quadraticCurveTo(0, 0, cornerRadius, 0);

        // Create extrude settings
        const extrudeSettings = {
            steps: 1,
            depth: keyDepth,
            bevelEnabled: false
        };

        // Create key geometry
        const keyGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        // Create key material
        const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: .2 });

        // Create key mesh
        const keyMesh = new THREE.Mesh(keyGeometry, keyMaterial);
        keyMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
        keyGroup.add(keyMesh);

        returnKey.keyMesh = keyMesh;
        returnKey.shape = shape;

        // Create text for the key
        // let 
        // returnKey.textMesh = textMesh1;
        // returnKey.textMaterial = textMaterial;
        // 
        const loader = new FontLoader();
        loader.load('models/roboto.json', function (font) {
            const textGeometry1 = new TextGeometry(char, {
                font: font,
                size: 0.2,
                height: 0.03,
                curveSegments: 12,
                bevelEnabled: false
            });

            const textMaterial = new THREE.MeshPhongMaterial({ color: Animator.textDefaultColor });
            // textMaterial.setValues
            const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);

            // Center the text on the key
            textMesh1.position.set(keyWidth / 3, keyHeight / 3.2, -1 * keyHeight / 2)// keyDepth / 2 + 0.01);
            textMesh1.rotation.x = -Math.PI / 2;
            keyGroup.add(textMesh1);
            returnKey.textMesh = textMesh1;
            returnKey.textMaterial = textMaterial;

            // If there's a second character, add it below the first
            if (char2) {
                const textGeometry2 = new TextGeometry(char2, {
                    font: font,
                    size: 0.15,
                    height: 0.03,
                    curveSegments: 12,
                    bevelEnabled: false
                });

                const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
                textMesh2.position.set(0.1, -0.1, keyDepth / 2 + 0.01);
                keyGroup.add(textMesh2);
            }
        });

        returnKey.group = keyGroup;
        return returnKey;
    }


    static keyboardKeys = []
    static createKeyboard() {
        const keyboard = new THREE.Group();

        const keyWidth = 0.6;
        const keyHeight = 0.6;
        const keyDepth = 0.2;
        const keyMargin = 0.1;
        const rowMargin = 0.2;

        const layout = [
            // Row 1
            [
                { char: '`', width: 1 },
                { char: '1', width: 1 }, { char: '2', width: 1 }, { char: '3', width: 1 }, { char: '4', width: 1 },
                { char: '5', width: 1 }, { char: '6', width: 1 }, { char: '7', width: 1 }, { char: '8', width: 1 },
                { char: '9', width: 1 }, { char: '0', width: 1 }, { char: '-', width: 1 }, { char: '=', width: 1 },
                { char: 'Backspace', width: 2 }
            ],
            // Row 2
            [
                { char: 'Tab', width: 1.5 },
                { char: 'Q', width: 1 }, { char: 'W', width: 1 }, { char: 'E', width: 1 }, { char: 'R', width: 1 },
                { char: 'T', width: 1 }, { char: 'Y', width: 1 }, { char: 'U', width: 1 }, { char: 'I', width: 1 },
                { char: 'O', width: 1 }, { char: 'P', width: 1 }, { char: '[', width: 1 }, { char: ']', width: 1 },
                { char: '\\', width: 1.5 }
            ],
            // Row 3
            [
                { char: 'Caps Lock', width: 1.75 },
                { char: 'A', width: 1 }, { char: 'S', width: 1 }, { char: 'D', width: 1 }, { char: 'F', width: 1 },
                { char: 'G', width: 1 }, { char: 'H', width: 1 }, { char: 'J', width: 1 }, { char: 'K', width: 1 },
                { char: 'L', width: 1 }, { char: ';', width: 1 }, { char: "'", width: 1 },
                { char: 'Enter', width: 2.25 }
            ],
            // Row 4
            [
                { char: 'Shift', width: 2.25 },
                { char: 'Z', width: 1 }, { char: 'X', width: 1 }, { char: 'C', width: 1 }, { char: 'V', width: 1 },
                { char: 'B', width: 1 }, { char: 'N', width: 1 }, { char: 'M', width: 1 }, { char: ',', width: 1 },
                { char: '.', width: 1 }, { char: '/', width: 1 },
                { char: 'Shift', width: 2.75 }
            ],
            // Row 5
            [
                { char: 'Ctrl', width: 1.25 },
                { char: 'Win', width: 1.25 },
                { char: 'Alt', width: 1.25 },
                { char: 'Space', width: 6.25 },
                { char: 'Alt', width: 1.25 },
                { char: 'Win', width: 1.25 },
                { char: 'Menu', width: 1.75 },
                { char: 'Ctrl', width: 1.25 }
            ]
        ];

        layout.forEach((row, rowIndex) => {
            let xOffset = -5;
            row.forEach(keyInfo => {
                const keyWidthWithMargin = keyWidth * keyInfo.width + keyMargin;
                const rKey = this.createKey(keyInfo.char, null, keyWidthWithMargin - keyMargin, keyHeight);

                rKey.group.position.set(
                    xOffset,//+ (keyWidthWithMargin - keyMargin) / 2,
                    0,
                    rowIndex * (keyHeight + rowMargin)
                );
                keyboard.add(rKey.group);
                this.keyboardKeys.push({ char: keyInfo.char, objects: rKey });
                xOffset += keyWidthWithMargin;
            });
        });

        return keyboard;
    }

    static pressKey(char) {
        // console.log(this.keyboardKeys);
        const xxx = this.keyboardKeys.forEach(k => {
            if (k.char === char) {
                k.objects.textMaterial.setValues({ color: 0x00ff00 })
                setTimeout(() => {
                    k.objects.textMaterial.setValues({ color: this.textDefaultColor })
                }, 200);

            }
        });

        // .key.material.color.setHex(0xff0000);
    }

    static loadMonitor(scene) {
        const loader = new GLTFLoader();
        loader.load('./models/monitor.glb', function (gltf) {
            console.log(gltf);
            // gltf.setSize(100)
            gltf.scene.scale.set(15,10,10);
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

    }
    static loadDesk(scene) {
        const loader = new GLTFLoader();
        loader.load('./models/desk.glb', function (gltf) {
            console.log(gltf);
            // gltf.setSize(100)
             gltf.scene.scale.set(.024,.024,.024);
             gltf.scene.rotation.x = Math.PI / 2;
             gltf.scene.position.y = -10;
             gltf.scene.position.z = 2;
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

    }
}