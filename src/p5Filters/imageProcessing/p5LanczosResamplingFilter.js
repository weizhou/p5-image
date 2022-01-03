import { P5ImgFilter } from "../p5imgFilter";

export class P5LanczosResamplingFilter extends P5ImgFilter{
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
      
      varying vec2 centerTextureCoordinate;
      varying vec2 oneStepLeftTextureCoordinate;
      varying vec2 twoStepsLeftTextureCoordinate;
      varying vec2 threeStepsLeftTextureCoordinate;
      varying vec2 fourStepsLeftTextureCoordinate;
      varying vec2 oneStepRightTextureCoordinate;
      varying vec2 twoStepsRightTextureCoordinate;
      varying vec2 threeStepsRightTextureCoordinate;
      varying vec2 fourStepsRightTextureCoordinate;
     
      void main()
      {
        vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
        gl_Position = positionVec4;
          
        vec2 firstOffset = vec2(texelWidth, texelHeight);
        vec2 secondOffset = vec2(2.0 * texelWidth, 2.0 * texelHeight);
        vec2 thirdOffset = vec2(3.0 * texelWidth, 3.0 * texelHeight);
        vec2 fourthOffset = vec2(4.0 * texelWidth, 4.0 * texelHeight);
        
        centerTextureCoordinate = aTexCoord;
        oneStepLeftTextureCoordinate = aTexCoord - firstOffset;
        twoStepsLeftTextureCoordinate = aTexCoord - secondOffset;
        threeStepsLeftTextureCoordinate = aTexCoord - thirdOffset;
        fourStepsLeftTextureCoordinate = aTexCoord - fourthOffset;
        oneStepRightTextureCoordinate = aTexCoord + firstOffset;
        twoStepsRightTextureCoordinate = aTexCoord + secondOffset;
        threeStepsRightTextureCoordinate = aTexCoord + thirdOffset;
        fourStepsRightTextureCoordinate = aTexCoord + fourthOffset;
      }
    `;

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform sampler2D textureID;
 
    varying vec2 centerTextureCoordinate;
    varying vec2 oneStepLeftTextureCoordinate;
    varying vec2 twoStepsLeftTextureCoordinate;
    varying vec2 threeStepsLeftTextureCoordinate;
    varying vec2 fourStepsLeftTextureCoordinate;
    varying vec2 oneStepRightTextureCoordinate;
    varying vec2 twoStepsRightTextureCoordinate;
    varying vec2 threeStepsRightTextureCoordinate;
    varying vec2 fourStepsRightTextureCoordinate;
       
    void main()
    {
      lowp vec4 fragmentColor = texture2D(textureID, centerTextureCoordinate) * 0.38026;
      
      fragmentColor += texture2D(textureID, oneStepLeftTextureCoordinate) * 0.27667;
      fragmentColor += texture2D(textureID, oneStepRightTextureCoordinate) * 0.27667;
      
      fragmentColor += texture2D(textureID, twoStepsLeftTextureCoordinate) * 0.08074;
      fragmentColor += texture2D(textureID, twoStepsRightTextureCoordinate) * 0.08074;
  
      fragmentColor += texture2D(textureID, threeStepsLeftTextureCoordinate) * -0.02612;
      fragmentColor += texture2D(textureID, threeStepsRightTextureCoordinate) * -0.02612;
  
      fragmentColor += texture2D(textureID, fourStepsLeftTextureCoordinate) * -0.02143;
      fragmentColor += texture2D(textureID, fourStepsRightTextureCoordinate) * -0.02143;
  
      gl_FragColor = fragmentColor;
    }    
    `;
  }
}

