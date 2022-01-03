import { P5BlockFilter } from '../imageProcessing/p5BlockFilter';

export class P5SketchFilter extends P5BlockFilter{
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
      
      uniform float edgeStrength;
      
      void main()
      {
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
          
          float mag = 1.0 - (length(vec2(h, v)) * edgeStrength);
          
          gl_FragColor = vec4(vec3(mag), 1.0);
      }    `;
  }
}
