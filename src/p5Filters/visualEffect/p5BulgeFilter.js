import { P5ImgFilter } from "../p5imgFilter";

export class P5BulgeFilter extends P5ImgFilter{
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

      uniform float aspectRatio;
      uniform vec2 center;
      uniform float radius;
      uniform float scale;
     
      void main()
      {
         highp vec2 textureCoordinateToUse = vec2(vTexCoord.x, ((vTexCoord.y - center.y) * aspectRatio) + center.y);
         highp float dist = distance(center, textureCoordinateToUse);
         textureCoordinateToUse = vTexCoord;
         
         if (dist < radius)
         {
             textureCoordinateToUse -= center;
             highp float percent = 1.0 - ((radius - dist) / radius) * scale;
             percent = percent * percent;
             
             textureCoordinateToUse = textureCoordinateToUse * percent;
             textureCoordinateToUse += center;
         }
         
         gl_FragColor = texture2D(textureID, textureCoordinateToUse );    
      }
      `;
  }
}
