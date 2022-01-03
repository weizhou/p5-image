import { P5ImgFilter } from "../p5imgFilter";

export class P5RGBFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform highp float redAdjustment;
    uniform highp float greenAdjustment;
    uniform highp float blueAdjustment;
   

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);
      gl_FragColor = vec4(textureColor.r * redAdjustment, textureColor.g * greenAdjustment, textureColor.b * blueAdjustment, textureColor.a);
    }
    `;
  }
}