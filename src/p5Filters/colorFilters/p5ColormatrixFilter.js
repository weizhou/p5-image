import { P5ImgFilter } from "../p5imgFilter";

export class P5ColormatrixFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform mat4 colorMatrix;
    uniform float intensity;

    void main() {
      lowp vec4 textureColor = texture2D(textureID, vTexCoord);
      lowp vec4 outputColor = textureColor * colorMatrix;        
      gl_FragColor = (intensity * outputColor) + ((1.0 - intensity) * textureColor);
    }
    `;
  }
}