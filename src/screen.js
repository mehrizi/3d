import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export class Screen {
    line = 0
    texts = ['']
    objects = []
    lineHeight = .3
    constructor(scene) {
        this.scene = scene;
    }
    static textDefaultColor = 0xffffff

    newLine() {
        if (this.line < 19)
        {
            this.line++;
            this.texts[this.line] = "";
            return;
        }

        this.line = 0;
        this.texts = [""];
        this.objects.map(o =>
            this.scene.remove(o)
        )
        this.objects = [];
        return;


    }
    type(char) {
        const self = this;
        const loader = new FontLoader();
        if (this.texts[self.line] && this.texts[self.line].length >= 80)
        {
            self.newLine()
        }
        if (this.objects[self.line])
        {
            console.log(this.objects[self.line]);
            self.scene.remove(this.objects[self.line])
            
            // this.objects[self.line].dispose();
        }
        const text = (this.texts[self.line] += char)
        
        loader.load('models/roboto.json', function (font) {

            const textGeometry = new TextGeometry(text, {
                font: font,
                size: .15,
                depth: 0.003,
                curveSegments: 12,
                bevelEnabled: false
            });

            const textMaterial = new THREE.MeshPhongMaterial({ color: Screen.textDefaultColor });
            // textMaterial.setValues
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            console.log(self.line);
            
            textMesh.position.set(-6, 0+(25 - self.line) * self.lineHeight, 0);
            // Center the text on the key
            self.scene.add(textMesh);
            self.objects[self.line] = textMesh;

            // returnKey.textMesh = textMesh1;
            // returnKey.textMaterial = textMaterial;
        })
    }

    async type(char) {
        const self = this;
        const loader = new FontLoader();
        if (this.texts[self.line] && this.texts[self.line].length >= 80)
        {
            self.newLine()
        }
        if (this.objects[self.line])
        {
            self.scene.remove(this.objects[self.line])
            
            // this.objects[self.line].dispose();
        }
        const text = (this.texts[self.line] += char)
        
        try {
            const font = await new Promise((resolve, reject) => {
                loader.load('models/roboto.json', resolve, undefined, reject);
            });
    
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: .2,
                depth: 0.003,
                curveSegments: 12,
                bevelEnabled: false
            });
    
            const textMaterial = new THREE.MeshPhongMaterial({ color: Screen.textDefaultColor });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
            console.log(self.line);
            
            textMesh.position.set(-6.3, .3+(25 - self.line) * self.lineHeight, 0);
            self.scene.add(textMesh);
            self.objects[self.line] = textMesh;
    
        } catch (error) {
            console.error('Error loading font or creating text:', error);
        }
    }
}