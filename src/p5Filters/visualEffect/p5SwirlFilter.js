import { P5ImgFilter } from "../p5imgFilter";

export class P5SwirlFilter extends P5ImgFilter{
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
      uniform float radius;
      uniform float angle;
      
      void main()
      {
        vec2 textureCoordinateToUse = vTexCoord;
        float dist = distance(center, vTexCoord);
        if (dist < radius)
        {
            textureCoordinateToUse -= center;
            float percent = (radius - dist) / radius;
            float theta = percent * percent * angle * 8.0;
            float s = sin(theta);
            float c = cos(theta);
            textureCoordinateToUse = vec2(dot(textureCoordinateToUse, vec2(c, -s)), dot(textureCoordinateToUse, vec2(s, c)));
            textureCoordinateToUse += center;
        }
        
        gl_FragColor = texture2D(textureID, textureCoordinateToUse);
      }
      `;
  }
}
