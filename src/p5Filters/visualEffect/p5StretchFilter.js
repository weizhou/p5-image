import { P5ImgFilter } from "../p5imgFilter";

export class P5StretchFilter extends P5ImgFilter{
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

      uniform vec2 center;
 
      void main()
      {
          highp vec2 normCoord = 2.0 * vTexCoord - 1.0;
          highp vec2 normCenter = 2.0 * center - 1.0;
          
          normCoord -= normCenter;
          mediump vec2 s = sign(normCoord);
          normCoord = abs(normCoord);
          normCoord = 0.5 * normCoord + 0.5 * smoothstep(0.25, 0.5, normCoord) * normCoord;
          normCoord = s * normCoord;
          
          normCoord += normCenter;
             
          mediump vec2 textureCoordinateToUse = normCoord / 2.0 + 0.5;
          
          
          gl_FragColor = texture2D(textureID, textureCoordinateToUse);
          
      }
      `;
  }
}
