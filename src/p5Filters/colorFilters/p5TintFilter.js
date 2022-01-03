import { P5ImgFilter } from "../p5imgFilter";

export class P5TintFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float tint;

    lowp float normTint = tint/100.0;

    const mat3 RGBtoYIQ = mat3(0.299, 0.587, 0.114, 0.596, -0.274, -0.322, 0.212, -0.523, 0.311);
    const mat3 YIQtoRGB = mat3(1.0, 0.956, 0.621, 1.0, -0.272, -0.647, 1.0, -1.105, 1.702);


    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      vec3 yiq = RGBtoYIQ * textureColor.rgb; //adjusting tint
      yiq.b = clamp(yiq.b + normTint*0.5226*0.1, -0.5226, 0.5226);
      vec3 rgb = YIQtoRGB * yiq;
    
      gl_FragColor = vec4(rgb, textureColor.a);
    
    }
    `;
  }
}