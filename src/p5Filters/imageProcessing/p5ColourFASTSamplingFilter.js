import { P5ImgFilter } from "../p5imgFilter";

export class P5ColourFASTSamplingFilter extends P5ImgFilter{
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
    
    uniform sampler2D textureID;
    
    varying vec2 textureCoordinate;
    varying vec2 pointATextureCoordinate;
    varying vec2 pointBTextureCoordinate;
    varying vec2 pointCTextureCoordinate;
    varying vec2 pointDTextureCoordinate;
    varying vec2 pointETextureCoordinate;
    varying vec2 pointFTextureCoordinate;
    varying vec2 pointGTextureCoordinate;
    varying vec2 pointHTextureCoordinate;
   
    void main()
    {
        vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
        gl_Position = positionVec4;
        
        float tripleTexelWidth = 3.0 * texelWidth;
        float tripleTexelHeight = 3.0 * texelHeight;
        
        textureCoordinate = aTexCoord.xy;
        
        pointATextureCoordinate = vec2(textureCoordinate.x + tripleTexelWidth, textureCoordinate.y + texelHeight);
        pointBTextureCoordinate = vec2(textureCoordinate.x + texelWidth, textureCoordinate.y + tripleTexelHeight);
        pointCTextureCoordinate = vec2(textureCoordinate.x - texelWidth, textureCoordinate.y + tripleTexelHeight);
        pointDTextureCoordinate = vec2(textureCoordinate.x - tripleTexelWidth, textureCoordinate.y + texelHeight);
        pointETextureCoordinate = vec2(textureCoordinate.x - tripleTexelWidth, textureCoordinate.y - texelHeight);
        pointFTextureCoordinate = vec2(textureCoordinate.x - texelWidth, textureCoordinate.y - tripleTexelHeight);
        pointGTextureCoordinate = vec2(textureCoordinate.x + texelWidth, textureCoordinate.y - tripleTexelHeight);
        pointHTextureCoordinate = vec2(textureCoordinate.x + tripleTexelWidth, textureCoordinate.y - texelHeight);
    }
    
    `;

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform sampler2D textureID;

    varying vec2 textureCoordinate;
    varying vec2 pointATextureCoordinate;
    varying vec2 pointBTextureCoordinate;
    varying vec2 pointCTextureCoordinate;
    varying vec2 pointDTextureCoordinate;
    varying vec2 pointETextureCoordinate;
    varying vec2 pointFTextureCoordinate;
    varying vec2 pointGTextureCoordinate;
    varying vec2 pointHTextureCoordinate;  

    const float PITwo = 6.2832;
    const float PI = 3.1416;
    void main()
    {
        vec3 centerColor = texture2D(textureID, textureCoordinate).rgb;
        
        vec3 pointAColor = texture2D(textureID, pointATextureCoordinate).rgb;
        vec3 pointBColor = texture2D(textureID, pointBTextureCoordinate).rgb;
        vec3 pointCColor = texture2D(textureID, pointCTextureCoordinate).rgb;
        vec3 pointDColor = texture2D(textureID, pointDTextureCoordinate).rgb;
        vec3 pointEColor = texture2D(textureID, pointETextureCoordinate).rgb;
        vec3 pointFColor = texture2D(textureID, pointFTextureCoordinate).rgb;
        vec3 pointGColor = texture2D(textureID, pointGTextureCoordinate).rgb;
        vec3 pointHColor = texture2D(textureID, pointHTextureCoordinate).rgb;
        
        vec3 colorComparison = ((pointAColor + pointBColor + pointCColor + pointDColor + pointEColor + pointFColor + pointGColor + pointHColor) * 0.125) - centerColor;
        
        // Direction calculation drawn from Appendix B of Seth Hall's Ph.D. thesis
        
        vec3 dirX = (pointAColor*0.94868) + (pointBColor*0.316227) - (pointCColor*0.316227) - (pointDColor*0.94868) - (pointEColor*0.94868) - (pointFColor*0.316227) + (pointGColor*0.316227) + (pointHColor*0.94868);
        vec3 dirY = (pointAColor*0.316227) + (pointBColor*0.94868) + (pointCColor*0.94868) + (pointDColor*0.316227) - (pointEColor*0.316227) - (pointFColor*0.94868) - (pointGColor*0.94868) - (pointHColor*0.316227);
        vec3 absoluteDifference = abs(colorComparison);
        float componentLength = length(colorComparison);
        float avgX = dot(absoluteDifference, dirX) / componentLength;
        float avgY = dot(absoluteDifference, dirY) / componentLength;
        float angle = atan(avgY, avgX);
        
        vec3 normalizedColorComparison = (colorComparison + 1.0) * 0.5;
        
        gl_FragColor = vec4(normalizedColorComparison, (angle+PI)/PITwo);
    }
    `;
  }
}

