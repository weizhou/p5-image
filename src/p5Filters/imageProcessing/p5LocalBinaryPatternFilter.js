import { P5BlockFilter } from './p5BlockFilter';

export class P5LocalBinaryPatternFilter extends P5BlockFilter {
  constructor() {
    super();

    this.fragmentShader = `
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

      void main()
      {
          float bottomIntensity = texture2D(textureID, bottomTextureCoordinate).r;
          float bottomLeftIntensity = texture2D(textureID, bottomLeftTextureCoordinate).r;
          float bottomRightIntensity = texture2D(textureID, bottomRightTextureCoordinate).r;
          float centerIntensity = texture2D(textureID, vTexCoord).r;
          float leftIntensity = texture2D(textureID, leftTextureCoordinate).r;
          float rightIntensity = texture2D(textureID, rightTextureCoordinate).r;
          float topIntensity = texture2D(textureID, topTextureCoordinate).r;
          float topRightIntensity = texture2D(textureID, topRightTextureCoordinate).r;
          float topLeftIntensity = texture2D(textureID, topLeftTextureCoordinate).r;
    

          float byteTally = 1.0 / 255.0 * step(centerIntensity, topRightIntensity);
          byteTally += 2.0 / 255.0 * step(centerIntensity, topIntensity);
          byteTally += 4.0 / 255.0 * step(centerIntensity, topLeftIntensity);
          byteTally += 8.0 / 255.0 * step(centerIntensity, leftIntensity);
          byteTally += 16.0 / 255.0 * step(centerIntensity, bottomLeftIntensity);
          byteTally += 32.0 / 255.0 * step(centerIntensity, bottomIntensity);
          byteTally += 64.0 / 255.0 * step(centerIntensity, bottomRightIntensity);
          byteTally += 128.0 / 255.0 * step(centerIntensity, rightIntensity);
               
          gl_FragColor = vec4(byteTally, byteTally, byteTally, 1.0);
      }
    `;
  }
}

