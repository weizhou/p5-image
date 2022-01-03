import { P5Blender } from "./P5Blender";

export class P5ChromaKeyBlender extends P5Blender{

    constructor(){
        super();

        this.fragmentShader = `
        #ifdef GL_ES
        precision mediump float;
        #endif
        
        varying vec2 vTexCoord;
        uniform sampler2D textureID1;
        uniform sampler2D textureID2;

        uniform float thresholdSensitivity;
        uniform float smoothing;
        uniform vec3 colorToReplace;
        
        void main()
        {
            vec4 textureColor = texture2D(textureID1, vTexCoord);
            vec4 textureColor2 = texture2D(textureID2, vTexCoord);
            
            float maskY = 0.2989 * colorToReplace.r + 0.5866 * colorToReplace.g + 0.1145 * colorToReplace.b;
            float maskCr = 0.7132 * (colorToReplace.r - maskY);
            float maskCb = 0.5647 * (colorToReplace.b - maskY);
            
            float Y = 0.2989 * textureColor2.r + 0.5866 * textureColor2.g + 0.1145 * textureColor2.b;
            float Cr = 0.7132 * (textureColor2.r - Y);
            float Cb = 0.5647 * (textureColor2.b - Y);
            
       //     float blendValue = 1.0 - smoothstep(thresholdSensitivity - smoothing, thresholdSensitivity , abs(Cr - maskCr) + abs(Cb - maskCb));
            float blendValue = smoothstep(thresholdSensitivity, thresholdSensitivity + smoothing, distance(vec2(Cr, Cb), vec2(maskCr, maskCb)));
            gl_FragColor = mix(textureColor, textureColor2, blendValue);
        }        `;
    }
}