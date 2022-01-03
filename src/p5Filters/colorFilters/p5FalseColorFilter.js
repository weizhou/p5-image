import { P5ImgFilter } from "../p5imgFilter";

export class P5FalseColorFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform vec3 firstColor;
    uniform vec3 secondColor;

    const vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);
      float luminance = dot(textureColor.rgb, luminanceWeighting);      
      gl_FragColor = vec4( mix(firstColor.rgb, secondColor.rgb, luminance), textureColor.a);
    }
    `;
  }
}