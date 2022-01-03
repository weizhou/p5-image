import { P5ImgFilter } from "../p5imgFilter";

export class P5PixellationFilter extends P5ImgFilter{
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

      uniform float fractionalWidthOfPixel;
      uniform float aspectRatio;
     
      void main()
      {
          highp vec2 sampleDivisor = vec2(fractionalWidthOfPixel, fractionalWidthOfPixel / aspectRatio);
          
          highp vec2 samplePos = vTexCoord - mod(vTexCoord, sampleDivisor) + 0.5 * sampleDivisor;
          gl_FragColor = texture2D(textureID, samplePos);
      }
    `;
  }
}
