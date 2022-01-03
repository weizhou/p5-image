import { P5ImgFilter } from "../p5imgFilter";

export class P5SolarizeFilter extends P5ImgFilter{
  constructor() {

    super();

    this.fragmentShader = 
     `
      #define MAX_RADIUS 10

      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform sampler2D textureID;
      varying vec2 vTexCoord;

      uniform float threshold;
 
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      
      void main()
      {
          highp vec4 textureColor = texture2D(textureID, vTexCoord);
          highp float luminance = dot(textureColor.rgb, W);
          highp float thresholdResult = step(luminance, threshold);
          highp vec3 finalColor = abs(thresholdResult - textureColor.rgb);
          
          gl_FragColor = vec4(finalColor, textureColor.w);
      }      `;
  }
}
