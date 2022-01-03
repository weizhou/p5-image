import { P5ImgFilter } from "../p5imgFilter";

export class P5LuminanceThresholdFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float threshold;
  
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      highp float luminance = dot(textureColor.rgb, W);
      highp float thresholdResult = step(threshold, luminance);
      
      gl_FragColor = vec4(vec3(thresholdResult), textureColor.a);    
    }
    `;
  }
}