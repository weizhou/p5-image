import { P5ImgFilter } from "../p5imgFilter";

export class P5ContrastFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float contrast;
    
    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);
      gl_FragColor = vec4(((textureColor.rgb - vec3(0.5)) * contrast + vec3(0.5)), textureColor.a);
    } `;
  }
}