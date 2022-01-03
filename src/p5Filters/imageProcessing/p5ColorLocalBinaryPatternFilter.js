import { P5BlockFilter } from './p5BlockFilter';

export class P5ColorLocalBinaryPatternFilter extends P5BlockFilter {
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
          vec3 bottomColor = texture2D(textureID, bottomTextureCoordinate).rgb;
          vec3 bottomLeftColor = texture2D(textureID, bottomLeftTextureCoordinate).rgb;
          vec3 bottomRightColor = texture2D(textureID, bottomRightTextureCoordinate).rgb;
          vec4 centerColor = texture2D(textureID, vTexCoord);
          vec3 leftColor = texture2D(textureID, leftTextureCoordinate).rgb;
          vec3 rightColor = texture2D(textureID, rightTextureCoordinate).rgb;
          vec3 topColor = texture2D(textureID, topTextureCoordinate).rgb;
          vec3 topRightColor = texture2D(textureID, topRightTextureCoordinate).rgb;
          vec3 topLeftColor = texture2D(textureID, topLeftTextureCoordinate).rgb;
    

          vec3 byteTally;
          for (int i=0; i<3; i++){
            byteTally[i] = 1.0 / 255.0 * step(centerColor[i], topRightColor)[i];
            byteTally[i] += 2.0 / 255.0 * step(centerColor[i], topColor[i]);
            byteTally[i] += 4.0 / 255.0 * step(centerColor[i], topLeftColor[i]);
            byteTally[i] += 8.0 / 255.0 * step(centerColor[i], leftColor[i]);
            byteTally[i] += 16.0 / 255.0 * step(centerColor[i], bottomLeftColor[i]);
            byteTally[i] += 32.0 / 255.0 * step(centerColor[i], bottomColor[i]);
            byteTally[i] += 64.0 / 255.0 * step(centerColor[i], bottomRightColor[i]);
            byteTally[i] += 128.0 / 255.0 * step(centerColor[i], rightColor[i]);  
          }          
          gl_FragColor = vec4(byteTally, 1.0);
      }
    `;
  }

}

