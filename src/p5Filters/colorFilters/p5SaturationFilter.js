import { P5ImgFilter } from "../p5imgFilter";

export class P5SaturationFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float saturation;

    // Values from "Graphics Shaders: Theory and Practice" by Bailey and Cunningham
    const mediump vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      float luminance = dot(textureColor.rgb, luminanceWeighting);
      vec3 greyScaleColor = vec3(luminance);

      gl_FragColor = vec4(mix(greyScaleColor, textureColor.rgb, saturation), textureColor.a);
    }
    `;
  }
}