import { P5ImgFilter } from "../p5imgFilter";

export class P5OpacityFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float opacity;

    void main() {
      lowp vec4 textureColor = texture2D(textureID, vTexCoord);
      gl_FragColor = vec4(textureColor.rgb, textureColor.a * opacity);
       
    }
    `;
  }
}