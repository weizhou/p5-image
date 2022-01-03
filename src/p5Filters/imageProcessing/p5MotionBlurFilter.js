import { P5ImgFilter } from "../p5imgFilter";

export class P5MotionBlurFilter extends P5ImgFilter{
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
      uniform vec2 directionalTexelStep;
 
      varying vec2 textureCoordinate;
      varying vec2 oneStepBackTextureCoordinate;
      varying vec2 twoStepsBackTextureCoordinate;
      varying vec2 threeStepsBackTextureCoordinate;
      varying vec2 fourStepsBackTextureCoordinate;
      varying vec2 oneStepForwardTextureCoordinate;
      varying vec2 twoStepsForwardTextureCoordinate;
      varying vec2 threeStepsForwardTextureCoordinate;
      varying vec2 fourStepsForwardTextureCoordinate;
      
      void main()
      {
        vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
        gl_Position = positionVec4;
          
        textureCoordinate = aTexCoord.xy;
        oneStepBackTextureCoordinate = aTexCoord.xy - directionalTexelStep;
        twoStepsBackTextureCoordinate = aTexCoord.xy - 2.0 * directionalTexelStep;
        threeStepsBackTextureCoordinate = aTexCoord.xy - 3.0 * directionalTexelStep;
        fourStepsBackTextureCoordinate = aTexCoord.xy - 4.0 * directionalTexelStep;
        oneStepForwardTextureCoordinate = aTexCoord.xy + directionalTexelStep;
        twoStepsForwardTextureCoordinate = aTexCoord.xy + 2.0 * directionalTexelStep;
        threeStepsForwardTextureCoordinate = aTexCoord.xy + 3.0 * directionalTexelStep;
        fourStepsForwardTextureCoordinate = aTexCoord.xy + 4.0 * directionalTexelStep;
      }
    `;

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform sampler2D textureID;
 
    varying vec2 textureCoordinate;
    varying vec2 oneStepBackTextureCoordinate;
    varying vec2 twoStepsBackTextureCoordinate;
    varying vec2 threeStepsBackTextureCoordinate;
    varying vec2 fourStepsBackTextureCoordinate;
    varying vec2 oneStepForwardTextureCoordinate;
    varying vec2 twoStepsForwardTextureCoordinate;
    varying vec2 threeStepsForwardTextureCoordinate;
    varying vec2 fourStepsForwardTextureCoordinate;
    
    void main()
    {
        vec4 fragmentColor = texture2D(textureID, textureCoordinate) * 0.18;
        fragmentColor += texture2D(textureID, oneStepBackTextureCoordinate) * 0.15;
        fragmentColor += texture2D(textureID, twoStepsBackTextureCoordinate) *  0.12;
        fragmentColor += texture2D(textureID, threeStepsBackTextureCoordinate) * 0.09;
        fragmentColor += texture2D(textureID, fourStepsBackTextureCoordinate) * 0.05;
        fragmentColor += texture2D(textureID, oneStepForwardTextureCoordinate) * 0.15;
        fragmentColor += texture2D(textureID, twoStepsForwardTextureCoordinate) *  0.12;
        fragmentColor += texture2D(textureID, threeStepsForwardTextureCoordinate) * 0.09;
        fragmentColor += texture2D(textureID, fourStepsForwardTextureCoordinate) * 0.05;
   
        gl_FragColor = fragmentColor;
    }
    `;
  }
}

