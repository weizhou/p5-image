import { P5BlockFilter } from './p5BlockFilter';

export class P5SobelEdgeFilter extends P5BlockFilter {
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

    const vec3 W = vec3(0.2125, 0.7154, 0.0721);

    void main()
    {
        float bottomColor = dot(texture2D(textureID, bottomTextureCoordinate).rgb, W);
        float bottomLeftColor = dot(texture2D(textureID, bottomLeftTextureCoordinate).rgb, W);
        float bottomRightColor = dot(texture2D(textureID, bottomRightTextureCoordinate).rgb, W);
        float centerColor = dot(texture2D(textureID, vTexCoord).rgb, W);
        float leftColor = dot(texture2D(textureID, leftTextureCoordinate).rgb, W);
        float rightColor = dot(texture2D(textureID, rightTextureCoordinate).rgb, W);
        float topColor = dot(texture2D(textureID, topTextureCoordinate).rgb, W);
        float topRightColor = dot(texture2D(textureID, topRightTextureCoordinate).rgb, W);
        float topLeftColor = dot(texture2D(textureID, topLeftTextureCoordinate).rgb, W);

        float gx = topLeftColor + 2.0*leftColor + bottomLeftColor - topRightColor - 2.0*rightColor - bottomRightColor;
        float gy = topLeftColor + 2.0*topColor + topRightColor - bottomLeftColor - 2.0*bottomColor - bottomRightColor;
        float normal = sqrt(gx*gx+gy*gy)/4.0;
    
        gl_FragColor = vec4(vec3(normal), texture2D(textureID, vTexCoord).a);
    }

    `;

  }

}

