import { P5ImgFilter } from "../p5imgFilter";

export class P5GammaFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float gamma;

    void main()
    {
        vec4 textureColor = texture2D(textureID, vTexCoord);        
        gl_FragColor = vec4(pow(textureColor.rgb, vec3(gamma)), textureColor.a);
      }
    `;
  }
}