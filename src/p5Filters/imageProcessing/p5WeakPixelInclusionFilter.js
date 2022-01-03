import { P5BlockFilter } from './p5BlockFilter';

export class P5WeakPixelInclusionFilter extends P5BlockFilter {
  constructor() {
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform sampler2D textureID;
    uniform float sumTest;
    uniform float pixelTest;
    
    varying vec2 vTexCoord;
    varying vec2 leftTextureCoordinate;
    varying vec2 rightTextureCoordinate;
    
    varying vec2 topTextureCoordinate;
    varying vec2 topLeftTextureCoordinate;
    varying vec2 topRightTextureCoordinate;
    
    varying vec2 bottomTextureCoordinate;
    varying vec2 bottomLeftTextureCoordinate;
    varying vec2 bottomRightTextureCoordinate;

    void main()
    {
      highp vec3 v[6];

      highp vec3 bottomColor = texture2D(textureID, bottomTextureCoordinate).rgb;
      highp vec3 bottomLeftColor = texture2D(textureID, bottomLeftTextureCoordinate).rgb;
      highp vec3 bottomRightColor = texture2D(textureID, bottomRightTextureCoordinate).rgb;
      highp vec4 centerColor = texture2D(textureID, vTexCoord);
      highp vec3 leftColor = texture2D(textureID, leftTextureCoordinate).rgb;
      highp vec3 rightColor = texture2D(textureID, rightTextureCoordinate).rgb;
      highp vec3 topColor = texture2D(textureID, topTextureCoordinate).rgb;
      highp vec3 topRightColor = texture2D(textureID, topRightTextureCoordinate).rgb;
      highp vec3 topLeftColor = texture2D(textureID, topLeftTextureCoordinate).rgb;

      float pixelIntensitySum = bottomLeftColor.r + topRightColor.r + topLeftColor.r + bottomRightColor.r + leftColor.r + rightColor.r + bottomColor.r + topColor.r + centerColor.r;
      // float sumTest = step(1.5, pixelIntensitySum);
      float sumTestColor = step(sumTest, pixelIntensitySum);
      float pixelTestColor = step(pixelTest, centerColor.r);
           
      gl_FragColor = vec4(vec3(sumTestColor * pixelTestColor), 1.0);    
    }
    `;  
  }
}

