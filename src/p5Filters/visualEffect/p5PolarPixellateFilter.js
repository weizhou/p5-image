import { P5ImgFilter } from "../p5imgFilter";

export class P5PolarPixellateFilter extends P5ImgFilter{
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
      uniform vec2 pixelSize;
     
      
      void main()
      {
        vec2 normCoord = 2.0 * vTexCoord - 1.0;
        vec2 normCenter = 2.0 * center - 1.0;
        
        normCoord -= normCenter;
        
        float r = length(normCoord); // to polar coords 
        float phi = atan(normCoord.y, normCoord.x); // to polar coords 
        
        r = r - mod(r, pixelSize.x) + 0.03;
        phi = phi - mod(phi, pixelSize.y);
              
        normCoord.x = r * cos(phi);
        normCoord.y = r * sin(phi);
          
        normCoord += normCenter;
        
        mediump vec2 textureCoordinateToUse = normCoord / 2.0 + 0.5;
        
        gl_FragColor = texture2D(textureID, textureCoordinateToUse);
      }
    `;
  }
}
