import { P5ImgFilter } from "../p5imgFilter";

export class P5CrosshatchFilter extends P5ImgFilter{
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

      uniform float crossHatchSpacing;
      uniform float lineWidth;
      
      const highp vec3 W = vec3(0.2125, 0.7154, 0.0721);
     
      void main()
      {
          float luminance = dot(texture2D(textureID, vTexCoord).rgb, W);
          
          vec4 colorToDisplay = vec4(1.0, 1.0, 1.0, 1.0);
          if (luminance < 1.00) 
          {
              if (mod(vTexCoord.x + vTexCoord.y, crossHatchSpacing) <= lineWidth) 
              {
                  colorToDisplay = vec4(0.0, 0.0, 0.0, 1.0);
              }
          }
          if (luminance < 0.75) 
          {
              if (mod(vTexCoord.x - vTexCoord.y, crossHatchSpacing) <= lineWidth) 
              {
                  colorToDisplay = vec4(0.0, 0.0, 0.0, 1.0);
              }
          }
          if (luminance < 0.50) 
          {
              if (mod(vTexCoord.x + vTexCoord.y - (crossHatchSpacing / 2.0), crossHatchSpacing) <= lineWidth) 
              {
                  colorToDisplay = vec4(0.0, 0.0, 0.0, 1.0);
              }
          }
          if (luminance < 0.3) 
          {
              if (mod(vTexCoord.x - vTexCoord.y - (crossHatchSpacing / 2.0), crossHatchSpacing) <= lineWidth) 
              {
                  colorToDisplay = vec4(0.0, 0.0, 0.0, 1.0);
              }
          }
     
          gl_FragColor = colorToDisplay;
      }    
      `;
  }
}
