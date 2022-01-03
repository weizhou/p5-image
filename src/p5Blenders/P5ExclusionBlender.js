import { P5Blender } from "./P5Blender";

export class P5ExclusionBlender extends P5Blender{
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
           //Dca = (Sca.Da + Dca.Sa - 2.Sca.Dca) + Sca.(1 - Da) + Dca.(1 - Sa)
           gl_FragColor = vec4((overlay.rgb * base.a + base.rgb * overlay.a - 2.0 * overlay.rgb * base.rgb) + overlay.rgb * (1.0 - base.a) + base.rgb * (1.0 - overlay.a), base.a);
        }
        `;
    }
}