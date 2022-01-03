import { P5ImgFilter } from "../p5imgFilter";

export class P5SepiaToneFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    mat4 colorMatrix = mat4(0.393, 0.769, 0.189, 0.0,
      0.349, 0.686, 0.168, 0.0,
      0.272, 0.534, 0.131, 0.0,
      0.0,   0.0,   0.0,   1.0);

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);
      vec4 outputColor = textureColor * colorMatrix;        
      gl_FragColor = outputColor;
    }
    `;
  }
}