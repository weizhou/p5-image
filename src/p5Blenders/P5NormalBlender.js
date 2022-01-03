import { P5Blender } from "./P5Blender";

export class P5NormalBlender extends P5Blender{
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
            vec4 c2 = texture2D(textureID1, vTexCoord);
            vec4 c1 = texture2D(textureID2, vTexCoord);
            
            vec4 outputColor;
                      
            float a = c1.a + c2.a * (1.0 - c1.a);
            float alphaDivisor = a + step(a, 0.0); // Protect against a divide-by-zero blacking out things in the output
            
            outputColor.r = (c1.r * c1.a + c2.r * c2.a * (1.0 - c1.a))/alphaDivisor;
            outputColor.g = (c1.g * c1.a + c2.g * c2.a * (1.0 - c1.a))/alphaDivisor;
            outputColor.b = (c1.b * c1.a + c2.b * c2.a * (1.0 - c1.a))/alphaDivisor;
            outputColor.a = a;
    
            gl_FragColor = outputColor;
        }
        `;
    }
}