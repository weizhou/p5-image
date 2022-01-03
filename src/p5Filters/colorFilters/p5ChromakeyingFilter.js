import { P5ImgFilter } from "../p5imgFilter";

export class P5ChromakeyingFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;

    uniform float thresholdSensitivity;
    uniform float smoothing;
    uniform vec3 colorToReplace;

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      float maskY = 0.2989 * colorToReplace.r + 0.5866 * colorToReplace.g + 0.1145 * colorToReplace.b;
      float maskCr = 0.7132 * (colorToReplace.r - maskY);
      float maskCb = 0.5647 * (colorToReplace.b - maskY);
      
      float Y = 0.2989 * textureColor.r + 0.5866 * textureColor.g + 0.1145 * textureColor.b;
      float Cr = 0.7132 * (textureColor.r - Y);
      float Cb = 0.5647 * (textureColor.b - Y);

      float blendValue = smoothstep(thresholdSensitivity, thresholdSensitivity + smoothing, distance(vec2(Cr, Cb), vec2(maskCr, maskCb)));
      gl_FragColor = vec4(textureColor.rgb, textureColor.a * blendValue);
    }
    `;
  }
}