import { P5ImgFilter } from "../p5imgFilter";

export class P5BlockFilter extends P5ImgFilter{
  constructor() {

    super();

    this.vertexShader = `
      #ifdef GL_ES
      precision mediump float;
      #endif
      
      attribute vec3 aPosition;
      attribute vec2 aTexCoord;
      
      uniform float texelWidth;
      uniform float texelHeight; 
      uniform float flipY;
      
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
        vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
        gl_Position = positionVec4;
        
        vec2 widthStep = vec2(texelWidth, 0.0);
        vec2 heightStep = vec2(0.0, texelHeight);
        vec2 widthHeightStep = vec2(texelWidth, texelHeight);
        vec2 widthNegativeHeightStep = vec2(texelWidth, -texelHeight);
        
        vTexCoord = aTexCoord;
        leftTextureCoordinate = aTexCoord - widthStep;
        rightTextureCoordinate = aTexCoord + widthStep;
        
        topTextureCoordinate = aTexCoord - heightStep;
        topLeftTextureCoordinate = aTexCoord - widthHeightStep;
        topRightTextureCoordinate = aTexCoord + widthNegativeHeightStep;
        
        bottomTextureCoordinate = aTexCoord + heightStep;
        bottomLeftTextureCoordinate = aTexCoord - widthNegativeHeightStep;
        bottomRightTextureCoordinate = aTexCoord + widthHeightStep;
      }
    `;
  }
}

