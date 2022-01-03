import { P5BlockFilter } from '../imageProcessing/p5BlockFilter';

export class P5ToonFilter extends P5BlockFilter{
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

      varying vec2 leftTextureCoordinate;
      varying vec2 rightTextureCoordinate;
      
      varying vec2 topTextureCoordinate;
      varying vec2 topLeftTextureCoordinate;
      varying vec2 topRightTextureCoordinate;
      
      varying vec2 bottomTextureCoordinate;
      varying vec2 bottomLeftTextureCoordinate;
      varying vec2 bottomRightTextureCoordinate;
      
      uniform highp float threshold;
      uniform highp float quantizationLevels;
      
      void main()
      {
          vec4 textureColor = texture2D(textureID, vTexCoord);

          float bottomLeftIntensity = texture2D(textureID, bottomLeftTextureCoordinate).r;
          float topRightIntensity = texture2D(textureID, topRightTextureCoordinate).r;
          float topLeftIntensity = texture2D(textureID, topLeftTextureCoordinate).r;
          float bottomRightIntensity = texture2D(textureID, bottomRightTextureCoordinate).r;
          float leftIntensity = texture2D(textureID, leftTextureCoordinate).r;
          float rightIntensity = texture2D(textureID, rightTextureCoordinate).r;
          float bottomIntensity = texture2D(textureID, bottomTextureCoordinate).r;
          float topIntensity = texture2D(textureID, topTextureCoordinate).r;
          float h = -topLeftIntensity - 2.0 * topIntensity - topRightIntensity + bottomLeftIntensity + 2.0 * bottomIntensity + bottomRightIntensity;
          float v = -bottomLeftIntensity - 2.0 * leftIntensity - topLeftIntensity + bottomRightIntensity + 2.0 * rightIntensity + topRightIntensity;
          
          float mag = length(vec2(h, v));

          vec3 posterizedImageColor = floor((textureColor.rgb * quantizationLevels) + 0.5) / quantizationLevels;
          
          float thresholdTest = 1.0 - step(threshold, mag);
          
          gl_FragColor = vec4(posterizedImageColor * thresholdTest, textureColor.a);      }    `;
  }
}
