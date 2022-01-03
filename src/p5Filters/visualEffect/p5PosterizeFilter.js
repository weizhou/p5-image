import { P5ImgFilter } from "../p5imgFilter";

export class P5PosterizeFilter extends P5ImgFilter{
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

      uniform float colorLevels;
 
      void main()
      {
          vec4 textureColor = texture2D(textureID, vTexCoord);
          
          gl_FragColor = floor((textureColor * colorLevels) + vec4(0.5)) / colorLevels;
      }     
      `;
  }
}
