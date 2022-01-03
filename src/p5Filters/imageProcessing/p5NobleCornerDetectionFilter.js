import { P5HarrisCornerDetectionFilter } from "./p5HarrisCornerDetectionFilter";

export class P5NobleCornerDetectionFilter extends P5HarrisCornerDetectionFilter {
  constructor() {
    
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;   
    uniform sampler2D inputImageTexture;

    uniform float sensitivity;
 
    const float harrisConstant = 0.04;
    
    void main()
    {
      vec3 derivativeElements = texture2D(inputImageTexture, vTexCoord).rgb;
      
      float derivativeSum = derivativeElements.x + derivativeElements.y;
      
      float zElement = (derivativeElements.z * 2.0) - 1.0;
  
      float cornerness = (derivativeElements.x * derivativeElements.y - (zElement * zElement)) / (derivativeSum);
      
      gl_FragColor = vec4(vec3(cornerness * sensitivity), 1.0);
    }    
    `;
  }
}

