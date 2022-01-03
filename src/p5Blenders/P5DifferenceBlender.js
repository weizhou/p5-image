import { P5Blender } from "./P5Blender";

export class P5DifferenceBlender extends P5Blender{
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
            lowp vec4 textureColor = texture2D(textureID1, vTexCoord);
            lowp vec4 textureColor2 = texture2D(textureID2, vTexCoord);
            
            gl_FragColor = vec4(abs(textureColor.rgb - textureColor2.rgb), textureColor.a);
        }
        `;
    }
}