import { P5ImgFilter } from "../p5imgFilter";

export class P5VibranceFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float vibrance;


    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      float average = (textureColor.r + textureColor.g + textureColor.b) / 3.0;
      float mx = max(textureColor.r, max(textureColor.g, textureColor.b));
      float amt = (mx - average) * (-vibrance * 3.0);
      textureColor.rgb = mix(textureColor.rgb, vec3(mx), amt);
      gl_FragColor = textureColor;
    
    }
    `;
  }
}