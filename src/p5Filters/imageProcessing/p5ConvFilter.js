import { P5BlockFilter } from './p5BlockFilter';

export class P5ConvFilter extends P5BlockFilter {
  constructor() {
    super();

    this.fragmentShaderTemplate = `
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
      
      mat3 convolutionMatrix = <convolutionMatrixValue>;

      void main()
      {
          mediump vec3 bottomColor = texture2D(textureID, bottomTextureCoordinate).rgb;
          mediump vec3 bottomLeftColor = texture2D(textureID, bottomLeftTextureCoordinate).rgb;
          mediump vec3 bottomRightColor = texture2D(textureID, bottomRightTextureCoordinate).rgb;
          mediump vec4 centerColor = texture2D(textureID, vTexCoord);
          mediump vec3 leftColor = texture2D(textureID, leftTextureCoordinate).rgb;
          mediump vec3 rightColor = texture2D(textureID, rightTextureCoordinate).rgb;
          mediump vec3 topColor = texture2D(textureID, topTextureCoordinate).rgb;
          mediump vec3 topRightColor = texture2D(textureID, topRightTextureCoordinate).rgb;
          mediump vec3 topLeftColor = texture2D(textureID, topLeftTextureCoordinate).rgb;
    
          mediump vec3 resultColor = topLeftColor * convolutionMatrix[0][0] + topColor * convolutionMatrix[0][1] + topRightColor * convolutionMatrix[0][2];
          resultColor += leftColor * convolutionMatrix[1][0] + centerColor.rgb * convolutionMatrix[1][1] + rightColor * convolutionMatrix[1][2];
          resultColor += bottomLeftColor * convolutionMatrix[2][0] + bottomColor * convolutionMatrix[2][1] + bottomRightColor * convolutionMatrix[2][2];
    
          gl_FragColor = vec4(resultColor, centerColor.a);
      }
    `;
    this.convMatrixValue =  `mat3(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)`;

    this.generateFragmentShader();
  }

  generateFragmentShader() {
    this.fragmentShader = this.fragmentShaderTemplate.replace("<convolutionMatrixValue>", this.convMatrixValue);
  }
}

