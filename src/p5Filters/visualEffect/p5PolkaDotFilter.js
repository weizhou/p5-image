import { P5ImgFilter } from "../p5imgFilter";

export class P5PolkaDotFilter extends P5ImgFilter{
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
      
      void main()
      {
          vec2 sampleDivisor = vec2(fractionalWidthOfPixel, fractionalWidthOfPixel / aspectRatio);
          
          vec2 samplePos = vTexCoord - mod(vTexCoord, sampleDivisor) + 0.5 * sampleDivisor;
          vec2 textureCoordinateToUse = vec2(vTexCoord.x, (vTexCoord.y * aspectRatio + 0.5 - 0.5 * aspectRatio));
          vec2 adjustedSamplePos = vec2(samplePos.x, (samplePos.y * aspectRatio + 0.5 - 0.5 * aspectRatio));
          float distanceFromSamplePoint = distance(adjustedSamplePos, textureCoordinateToUse);
          float checkForPresenceWithinDot = step(distanceFromSamplePoint, (fractionalWidthOfPixel * 0.5) * dotScaling);
     
          vec4 inputColor = texture2D(textureID, samplePos);
          
          gl_FragColor = vec4(inputColor.rgb * checkForPresenceWithinDot, inputColor.a);
      }
    `;
  }
}
