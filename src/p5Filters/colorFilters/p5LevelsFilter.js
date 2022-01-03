import { P5ImgFilter } from "../p5imgFilter";

export class P5LevelsFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `

    /*
    ** Gamma correction
    ** Details: http://blog.mouaif.org/2009/01/22/photoshop-gamma-correction-shader/
    */
    #define GammaCorrection(color, gamma)								pow(color, 1.0 / gamma)
    
    /*
    ** Levels control (input (+gamma), output)
    ** Details: http://blog.mouaif.org/2009/01/28/levels-control-shader/
    */    
    #define LevelsControlInputRange(color, minInput, maxInput)				min(max(color - minInput, vec3(0.0)) / (maxInput - minInput), vec3(1.0))
    #define LevelsControlInput(color, minInput, gamma, maxInput)				GammaCorrection(LevelsControlInputRange(color, minInput, maxInput), gamma)
    #define LevelsControlOutputRange(color, minOutput, maxOutput) 			mix(minOutput, maxOutput, color)
    #define LevelsControl(color, minInput, gamma, maxInput, minOutput, maxOutput) 	LevelsControlOutputRange(LevelsControlInput(color, minInput, gamma, maxInput), minOutput, maxOutput)
   
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;

    uniform mediump vec3 levelMinimum;
    uniform mediump vec3 levelMiddle;
    uniform mediump vec3 levelMaximum;
    uniform mediump vec3 minOutput;
    uniform mediump vec3 maxOutput;
    

    void main() {
      lowp vec4 textureColor = texture2D(textureID, vTexCoord);
      gl_FragColor = vec4(LevelsControl(textureColor.rgb, levelMinimum, levelMiddle, levelMaximum, minOutput, maxOutput), textureColor.a);
    }

    `;
  }
}