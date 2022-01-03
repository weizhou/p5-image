import { P5Blender } from "./P5Blender";

export class P5ScreenBlender extends P5Blender{
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
           
           mediump vec4 whiteColor = vec4(1.0);
           gl_FragColor = whiteColor - ((whiteColor - overlay) * (whiteColor - base));
        }
        `;
    }
}