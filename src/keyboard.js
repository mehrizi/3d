import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export class Keyboard {
    line = 0
    texts = ['']
    objects = []
    lineHeight = .28
    constructor(scene) {
        this.scene = scene;
    }
    static textDefaultColor = 0xdddddd
    static highlightColor = 0xff0000

    static extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: false
    };
    createKey(keyInfo, keyWidth = .6, keyHeight = .6) {
        const returnKey = {
            group: null,
            text: null,
            shape: null,
            keyMesh: null,
            keyShape: null,
            textMesh: null,
            textMaterial: null
        }
        // Create a group to hold the key and text
        const keyGroup = new THREE.Group();

        // Key dimensions
        const keyDepth = 0.2;
        const cornerRadius = keyHeight * 0.1;

        // Create rounded rectangle shape
        const shape = new THREE.Shape();
        returnKey.keyShape = shape;
        shape.moveTo(cornerRadius, 0);

        shape.lineTo(keyWidth - cornerRadius, 0);
        shape.quadraticCurveTo(keyWidth, 0, keyWidth, cornerRadius);

        shape.lineTo(keyWidth, keyHeight - cornerRadius);
        shape.quadraticCurveTo(keyWidth, keyHeight, keyWidth - cornerRadius, keyHeight);

        shape.lineTo(cornerRadius, keyHeight);
        shape.quadraticCurveTo(0, keyHeight, 0, keyHeight - cornerRadius);

        shape.lineTo(0, cornerRadius);
        shape.quadraticCurveTo(0, 0, cornerRadius, 0);

        // Create key geometry
        const keyGeometry = new THREE.ExtrudeGeometry(shape, Keyboard.extrudeSettings);
        returnKey.keyGeometry = keyGeometry

        // Create key material
        const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: .2 });

        // Create key mesh
        const keyMesh = new THREE.Mesh(keyGeometry, keyMaterial);
        keyMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
        returnKey.keyMesh = keyMesh;
        keyGroup.add(keyMesh);

        // Create rounded rectangle shape
        const shape2 = new THREE.Shape();
        const outer = .01
        shape2.moveTo(cornerRadius, 0);

        shape2.lineTo(keyWidth+outer - cornerRadius, 0);
        shape2.quadraticCurveTo(keyWidth+outer, 0, keyWidth+outer, cornerRadius);

        shape2.lineTo(keyWidth+outer, keyHeight+outer - cornerRadius);
        shape2.quadraticCurveTo(keyWidth+outer, keyHeight+outer, keyWidth+outer - cornerRadius, keyHeight+outer);

        shape2.lineTo(cornerRadius, keyHeight+outer);
        shape2.quadraticCurveTo(0, keyHeight+outer, 0, keyHeight+outer - cornerRadius);

        shape2.lineTo(0, cornerRadius);
        shape2.quadraticCurveTo(0, 0, cornerRadius, 0);

        const keyGeometry2 = new THREE.ExtrudeGeometry(shape2, {...Keyboard.extrudeSettings,depth:.11});

        // Create key material
        const keyMaterial2 = new THREE.MeshPhongMaterial({
            color: Keyboard.highlightColor,
            emissive: Keyboard.highlightColor,  // Green backlight color
            emissiveIntensity: 1
        });
        // Create key mesh
        const keyMesh2 = new THREE.Mesh(keyGeometry2, keyMaterial2);
        keyMesh2.rotation.x = -Math.PI / 2; // Rotate to lay flat
        keyMesh2.position.z += outer/2;
        keyMesh2.position.x -= outer/2;
        keyGroup.add(keyMesh2);


        // Create text for the key
        const loader = new FontLoader();
        const self = this;
        loader.load('models/roboto.json', function (font) {
            const textGeometry1 = new TextGeometry(keyInfo.char, {
                font: font,
                size: 0.18,
                depth: 0.03,
                curveSegments: 12,
                bevelEnabled: false
            });

            const textMaterial = new THREE.MeshPhongMaterial({ color: Keyboard.textDefaultColor });
            // textMaterial.setValues
            const textMesh1 = new THREE.Mesh(textGeometry1, textMaterial);

            // Center the text on the key
            textMesh1.position.set(keyWidth / 3 + (keyInfo.xPlacement??0), keyHeight / 3.5, -1 * keyHeight / 2)// keyDepth / 2 + 0.01);
            textMesh1.rotation.x = -Math.PI / 2;
            keyGroup.add(textMesh1);
            returnKey.textMesh = textMesh1;
            returnKey.textMaterial = textMaterial;

            
        });

        returnKey.group = keyGroup;
        return returnKey;
    }


    keyboardKeys = []
    create() {

        const keyboard = new THREE.Group();

        const keyWidth = 0.6;
        const keyHeight = 0.6;
        const keyMargin = 0.1;
        const rowMargin = 0.2;

        const layout = [
            // Row 1
            [
                { char: '`', width: 1, keyCode: 'Backquote' },
                { char: '1', width: 1, keyCode: 'Digit1' }, { char: '2', width: 1, keyCode: 'Digit2' }, { char: '3', width: 1, keyCode: 'Digit3' }, { char: '4', width: 1, keyCode: 'Digit4' },
                { char: '5', width: 1, keyCode: 'Digit5' }, { char: '6', width: 1, keyCode: 'Digit6' }, { char: '7', width: 1, keyCode: 'Digit7' }, { char: '8', width: 1, keyCode: 'Digit8' },
                { char: '9', width: 1, keyCode: 'Digit9' }, { char: '0', width: 1, keyCode: 'Digit0' }, { char: '-', width: 1, keyCode: 'Minus' }, { char: '=', width: 1, keyCode: 'Equal' },
                { char: 'Backspace', width: 2.5, xPlacement: -.3, keyCode: 'Backspace' }
            ],
            // Row 2
            [
                { char: 'Tab', width: 1.5, xPlacement: -.2, keyCode: 'Tab' },
                { char: 'Q', width: 1, keyCode: 'KeyQ' }, { char: 'W', width: 1, keyCode: 'KeyW' }, { char: 'E', width: 1, keyCode: 'KeyE' }, { char: 'R', width: 1, keyCode: 'KeyR' },
                { char: 'T', width: 1, keyCode: 'KeyT' }, { char: 'Y', width: 1, keyCode: 'KeyY' }, { char: 'U', width: 1, keyCode: 'KeyU' }, { char: 'I', width: 1, keyCode: 'KeyI' },
                { char: 'O', width: 1, keyCode: 'KeyO' }, { char: 'P', width: 1, keyCode: 'KeyP' }, { char: '[', width: 1, keyCode: 'BracketLeft' }, { char: ']', width: 1, keyCode: 'BracketRight' },
                { char: '\\', width: 2, keyCode: 'Backslash' }
            ],
            // Row 3
            [
                { char: 'Caps', width: 2, xPlacement: -.3, keyCode: 'CapsLock' },
                { char: 'A', width: 1, keyCode: 'KeyA' }, { char: 'S', width: 1, keyCode: 'KeyS' }, { char: 'D', width: 1, keyCode: 'KeyD' }, { char: 'F', width: 1, keyCode: 'KeyF' },
                { char: 'G', width: 1, keyCode: 'KeyG' }, { char: 'H', width: 1, keyCode: 'KeyH' }, { char: 'J', width: 1, keyCode: 'KeyJ' }, { char: 'K', width: 1, keyCode: 'KeyK' },
                { char: 'L', width: 1, keyCode: 'KeyL' }, { char: ';', width: 1, keyCode: 'Semicolon' }, { char: "'", width: 1, keyCode: 'Quote' },
                { char: 'Enter', width: 2.75, keyCode: 'Enter' }
            ],
            // Row 4
            [
                { char: 'Shift', width: 2.5, xPlacement: -.4, keyCode: 'ShiftLeft' },
                { char: 'Z', width: 1, keyCode: 'KeyZ' }, { char: 'X', width: 1, keyCode: 'KeyX' }, { char: 'C', width: 1, keyCode: 'KeyC' }, { char: 'V', width: 1, keyCode: 'KeyV' },
                { char: 'B', width: 1, keyCode: 'KeyB' }, { char: 'N', width: 1, keyCode: 'KeyN' }, { char: 'M', width: 1, keyCode: 'KeyM' }, { char: ',', width: 1, keyCode: 'Comma' },
                { char: '.', width: 1, keyCode: 'Period' }, { char: '/', width: 1, keyCode: 'Slash' },
                { char: 'Shift', width: 3.4, keyCode: 'ShiftRight' }
            ],
            // Row 5
            [
                { char: 'Ctrl', width: 1.25, xPlacement: -.17, keyCode: 'ControlLeft' },
                { char: 'Win', width: 1.25, xPlacement: -.15, keyCode: 'MetaLeft' },
                { char: 'Alt', width: 1.25, xPlacement: -.1, keyCode: 'AltLeft' },
                { char: ' ', width: 6.75, keyCode: 'Space' },
                { char: 'Alt', width: 1.25, keyCode: 'AltRight' ,xPlacement:-.1},
                { char: 'Win', width: 1.25, keyCode: 'MetaRight' ,xPlacement:-.1},
                { char: 'Menu', width: 1.75, keyCode: 'ContextMenu' ,xPlacement:-.2},
                { char: 'Ctrl', width: 1.75, keyCode: 'ControlRight',xPlacement:-.2 }
            ]
        ];
        
        const self = this;
        layout.forEach((row, rowIndex) => {
            let xOffset = -5;
            row.forEach(keyInfo => {
                const keyWidthWithMargin = keyWidth * keyInfo.width + keyMargin;
                const rKey = this.createKey(keyInfo, keyWidthWithMargin - keyMargin, keyHeight);

                rKey.group.position.set(
                    xOffset,//+ (keyWidthWithMargin - keyMargin) / 2,
                    0,
                    rowIndex * (keyHeight + rowMargin)
                );
                keyboard.add(rKey.group);
                self.keyboardKeys.push({ keyInfo: keyInfo, objects: rKey });
                xOffset += keyWidthWithMargin;
            });
        });
        keyboard.position.z += 3;
        keyboard.position.y -= .5;
        const k = this.base();
        k.position.z += 3.5;
        k.position.x -= 5.5;
        k.position.y -= .2
        keyboard.add(k);
        this.scene.add(keyboard);
    }

    base() {
        const cornerRadius = .8
        const baseWidth = 11.5;
        const baseHeight = 4.5
        // Create rounded rectangle shape
        const shape = new THREE.Shape();
        shape.moveTo(cornerRadius, 0);

        shape.lineTo(baseWidth - cornerRadius, 0);
        shape.quadraticCurveTo(baseWidth, 0, baseWidth, cornerRadius);

        shape.lineTo(baseWidth, baseHeight - cornerRadius);
        shape.quadraticCurveTo(baseWidth, baseHeight, baseWidth - cornerRadius, baseHeight);
        // shape.quadraticCurveTo(baseWidth,  baseHeight,  baseWidth,cornerRadius);

        shape.lineTo(cornerRadius, baseHeight);
        shape.quadraticCurveTo(0, baseHeight, 0, baseHeight - cornerRadius);

        shape.lineTo(0, cornerRadius);
        shape.quadraticCurveTo(0, 0, cornerRadius, 0);


        // Create key geometry
        const keyGeometry = new THREE.ExtrudeGeometry(shape, {
            ...Keyboard.extrudeSettings,
            depth: .3
        });
        // returnKey.keyGeometry = keyGeometry
        //  keyGeometry.s

        // Create key material
        const keyMaterial = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: .2 });

        // Create key mesh
        const keyMesh = new THREE.Mesh(keyGeometry, keyMaterial);
        keyMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat
        return (keyMesh);

    }
    keyDown(keyCode) {
        this.keyboardKeys.forEach(k => {            
            if (k.keyInfo.keyCode === keyCode) {
                
                k.objects.textMaterial.setValues({ color: 0xff0000 })
                k.objects.group.scale.set(1, .8, 1);

            }
        });

        // .key.material.color.setHex(0xff0000);
    }
    keyUp(keyCode) {
        this.keyboardKeys.forEach(k => {
            if (k.keyInfo.keyCode === keyCode) {
                k.objects.group.scale.set(1, 1, 1);
                k.objects.textMaterial.setValues({ color: Keyboard.textDefaultColor })
                // }, 200);

            }
        });

        // .key.material.color.setHex(0xff0000);
    }

}