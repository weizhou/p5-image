import { P5ImgFilter } from "../p5imgFilter";

export class P5GrayscaleFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    const highp vec3 W = vec3(0.2125, 0.7154, 0.0721);

    void main()
    {
        vec4 textureColor = texture2D(textureID, vTexCoord);
        float luminance = dot(textureColor.rgb, W);
        
        gl_FragColor = vec4(vec3(luminance), textureColor.a);
    }
    `;
  }
}