import { P5Blender } from "./P5Blender";

export class P5AlphaBlender extends P5Blender{
    constructor(){
        super();

        this.fragmentShader = `
        #ifdef GL_ES
        precision mediump float;
        #endif
        
        varying vec2 vTexCoord;
        uniform sampler2D textureID1;
        uniform sampler2D textureID2;
        uniform lowp float mixturePercent;

        void main()
        {
           vec4 textureColor = texture2D(textureID1, vTexCoord);
           vec4 textureColor2 = texture2D(textureID2, vTexCoord);
           
           gl_FragColor = vec4(mix(textureColor.rgb, textureColor2.rgb, textureColor2.a * mixturePercent), textureColor.a);        }
        `;
    }
}