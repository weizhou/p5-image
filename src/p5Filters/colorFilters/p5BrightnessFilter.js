import { P5ImgFilter } from "../p5imgFilter";

export class P5BrightnessFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform lowp float brightness;

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);
      gl_FragColor = vec4(textureColor.rgb+vec3(brightness), textureColor.a);
    }
    `;
  }
}