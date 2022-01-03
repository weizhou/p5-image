import { P5ImgFilter } from "../p5imgFilter";

export class P5CGAColorSpaceFilter extends P5ImgFilter{
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

      void main()
      {
          vec2 sampleDivisor = vec2(1.0 / 200.0, 1.0 / 320.0);
          
          vec2 samplePos = vTexCoord - mod(vTexCoord, sampleDivisor);
          vec4 color = texture2D(textureID, samplePos );
          
          vec4 colorCyan = vec4(85.0 / 255.0, 1.0, 1.0, 1.0);
          vec4 colorMagenta = vec4(1.0, 85.0 / 255.0, 1.0, 1.0);
          vec4 colorWhite = vec4(1.0, 1.0, 1.0, 1.0);
          vec4 colorBlack = vec4(0.0, 0.0, 0.0, 1.0);
          
          float blackDistance = distance(color, colorBlack);
          float whiteDistance = distance(color, colorWhite);
          float magentaDistance = distance(color, colorMagenta);
          float cyanDistance = distance(color, colorCyan);
          
          vec4 finalColor;
          
          float colorDistance = min(magentaDistance, cyanDistance);
          colorDistance = min(colorDistance, whiteDistance);
          colorDistance = min(colorDistance, blackDistance); 
          
          if (colorDistance == blackDistance) {
              finalColor = colorBlack;
          } else if (colorDistance == whiteDistance) {
              finalColor = colorWhite;
          } else if (colorDistance == cyanDistance) {
              finalColor = colorCyan;
          } else {
              finalColor = colorMagenta;
          }
          
          gl_FragColor = finalColor;
      }      `;
  }
}
