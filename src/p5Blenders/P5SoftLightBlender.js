import { P5Blender } from "./P5Blender";

export class P5SoftLightBlender extends P5Blender{
    constructor(){
        super();

        this.fragmentShader = `
        #ifdef GL_ES
        precision mediump float;
        #endif
        
        varying vec2 vTexCoord;
        uniform sampler2D textureID1;
        uniform sampler2D textureID2;


        void main()
        {
           vec4 base = texture2D(textureID1, vTexCoord);
           vec4 overlay = texture2D(textureID2, vTexCoord);
           
           float alphaDivisor = base.a + step(base.a, 0.0); // Protect against a divide-by-zero blacking out things in the output
           gl_FragColor = base * (overlay.a * (base / alphaDivisor) + (2.0 * overlay * (1.0 - (base / alphaDivisor)))) + overlay * (1.0 - base.a) + base * (1.0 - overlay.a);
        }
        `;
    }
}