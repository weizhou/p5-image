import { P5ImgFilter } from "../p5imgFilter";

export class P5HazeFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float hazeDistance;
    uniform float slope;

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      float  d = vTexCoord.y * slope  +  hazeDistance;            
      vec4 c = (textureColor - d) / (1.0 - d);
      
      gl_FragColor = c; 
    }
    `;
  }
}