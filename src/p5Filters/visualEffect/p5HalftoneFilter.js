import { P5ImgFilter } from "../p5imgFilter";

export class P5HalftoneFilter extends P5ImgFilter{
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
      uniform float dotScaling;
      
      const highp vec3 W = vec3(0.2125, 0.7154, 0.0721);

      void main()
      {
          vec2 sampleDivisor = vec2(fractionalWidthOfPixel, fractionalWidthOfPixel / aspectRatio);
          
          vec2 samplePos = vTexCoord - mod(vTexCoord, sampleDivisor) + 0.5 * sampleDivisor;
          vec2 textureCoordinateToUse = vec2(vTexCoord.x, (vTexCoord.y * aspectRatio + 0.5 - 0.5 * aspectRatio));
          vec2 adjustedSamplePos = vec2(samplePos.x, (samplePos.y * aspectRatio + 0.5 - 0.5 * aspectRatio));
          float distanceFromSamplePoint = distance(adjustedSamplePos, textureCoordinateToUse);
          
          vec3 sampledColor = texture2D(textureID, samplePos ).rgb;
          float dotScaling = 1.0 - dot(sampledColor, W);
         
          float checkForPresenceWithinDot = 1.0 - step(distanceFromSamplePoint, (fractionalWidthOfPixel * 0.5) * dotScaling);
          
          gl_FragColor = vec4(vec3(checkForPresenceWithinDot), 1.0);
      }
    `;
  }
}
