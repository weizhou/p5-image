import { P5Blender } from "./P5Blender";

export class P5MultiplyBlender extends P5Blender{

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
            vec4 overlayer = texture2D(textureID2, vTexCoord);
                
            gl_FragColor = overlayer * base + overlayer * (1.0 - base.a) + base * (1.0 - overlayer.a);
        }
        `;
    }
}