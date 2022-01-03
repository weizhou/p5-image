import { P5BlockFilter } from './p5BlockFilter';

export class P5XYDerivativeFilter extends P5BlockFilter {
  constructor() {
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform sampler2D textureID;
    uniform float edgeStrength;
    
    varying vec2 vTexCoord;
    varying vec2 leftTextureCoordinate;
    varying vec2 rightTextureCoordinate;
    
    varying vec2 topTextureCoordinate;
    varying vec2 topLeftTextureCoordinate;
    varying vec2 topRightTextureCoordinate;
    
    varying vec2 bottomTextureCoordinate;
    varying vec2 bottomLeftTextureCoordinate;
    varying vec2 bottomRightTextureCoordinate;

    const vec3 W = vec3(0.2125, 0.7154, 0.0721);

    void main()
    {
        float bottomIntensity = dot(texture2D(textureID, bottomTextureCoordinate).rgb, W);
        float bottomLeftIntensity = dot(texture2D(textureID, bottomLeftTextureCoordinate).rgb, W);
        float bottomRightIntensity = dot(texture2D(textureID, bottomRightTextureCoordinate).rgb, W);
        float centerIntensity = dot(texture2D(textureID, vTexCoord).rgb, W);
        float leftIntensity = dot(texture2D(textureID, leftTextureCoordinate).rgb, W);
        float rightIntensity = dot(texture2D(textureID, rightTextureCoordinate).rgb, W);
        float topIntensity = dot(texture2D(textureID, topTextureCoordinate).rgb, W);
        float topRightIntensity = dot(texture2D(textureID, topRightTextureCoordinate).rgb, W);
        float topLeftIntensity = dot(texture2D(textureID, topLeftTextureCoordinate).rgb, W);

        float verticalDerivative = -topLeftIntensity - topIntensity - topRightIntensity + bottomLeftIntensity + bottomIntensity + bottomRightIntensity;
        float horizontalDerivative = -bottomLeftIntensity - leftIntensity - topLeftIntensity + bottomRightIntensity + rightIntensity + topRightIntensity;
        verticalDerivative = verticalDerivative * edgeStrength;
        horizontalDerivative = horizontalDerivative * edgeStrength;
        
        // Scaling the X * Y operation so that negative numbers are not clipped in the 0..1 range. This will be expanded in the corner detection filter
        gl_FragColor = vec4(horizontalDerivative * horizontalDerivative, verticalDerivative * verticalDerivative, ((verticalDerivative * horizontalDerivative) + 1.0) / 2.0, 1.0);
    }
    `;

  }

}

