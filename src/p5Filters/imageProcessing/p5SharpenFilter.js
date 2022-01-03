import { P5ImgFilter } from "../p5imgFilter";

export class P5SharpenFilter extends P5ImgFilter{
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
      
      uniform float sharpness;
      
      varying vec2 textureCoordinate;
      varying vec2 leftTextureCoordinate;
      varying vec2 rightTextureCoordinate; 
      varying vec2 topTextureCoordinate;
      varying vec2 bottomTextureCoordinate;
      
      varying float centerMultiplier;
      varying float edgeMultiplier;
      
      void main()
      {
        vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
        gl_Position = positionVec4;
          
        vec2 widthStep = vec2(texelWidth, 0.0);
        vec2 heightStep = vec2(0.0, texelHeight);

        textureCoordinate = aTexCoord.xy;
        leftTextureCoordinate = aTexCoord.xy - widthStep;
        rightTextureCoordinate = aTexCoord.xy + widthStep;
        topTextureCoordinate = aTexCoord.xy + heightStep;     
        bottomTextureCoordinate = aTexCoord.xy - heightStep;
        
        centerMultiplier = 1.0 + 4.0 * sharpness;
        edgeMultiplier = sharpness;
      }
    `;

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying highp vec2 textureCoordinate;
    varying highp vec2 leftTextureCoordinate;
    varying highp vec2 rightTextureCoordinate; 
    varying highp vec2 topTextureCoordinate;
    varying highp vec2 bottomTextureCoordinate;
    
    varying highp float centerMultiplier;
    varying highp float edgeMultiplier;
   
    uniform sampler2D textureID;
    
    void main()
    {
        mediump vec3 textureColor = texture2D(textureID, textureCoordinate).rgb;
        mediump vec3 leftTextureColor = texture2D(textureID, leftTextureCoordinate).rgb;
        mediump vec3 rightTextureColor = texture2D(textureID, rightTextureCoordinate).rgb;
        mediump vec3 topTextureColor = texture2D(textureID, topTextureCoordinate).rgb;
        mediump vec3 bottomTextureColor = texture2D(textureID, bottomTextureCoordinate).rgb;
   
        gl_FragColor = vec4((textureColor * centerMultiplier - (leftTextureColor * edgeMultiplier + rightTextureColor * edgeMultiplier + topTextureColor * edgeMultiplier + bottomTextureColor * edgeMultiplier)), texture2D(textureID, bottomTextureCoordinate).w);
    }
    `;
  }
}

