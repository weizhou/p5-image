import { P5ImgFilter } from "../p5imgFilter";

export class P5NonMaximumSuppressionFilter extends P5ImgFilter {
  constructor() {
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    
    uniform sampler2D textureID;
    uniform float texelWidth; 
    uniform float texelHeight; 
    uniform float upperThreshold; 
    uniform float lowerThreshold; 
   
    void main()
    {
        vec3 currentGradientAndDirection = texture2D(textureID, vTexCoord).rgb;
        vec2 gradientDirection = ((currentGradientAndDirection.gb * 2.0) - 1.0) * vec2(texelWidth, texelHeight);
        
        float firstSampledGradientMagnitude = texture2D(textureID, vTexCoord + gradientDirection).r;
        float secondSampledGradientMagnitude = texture2D(textureID, vTexCoord - gradientDirection).r;
        
        float multiplier = step(firstSampledGradientMagnitude, currentGradientAndDirection.r);
        multiplier = multiplier * step(secondSampledGradientMagnitude, currentGradientAndDirection.r);
        
        float thresholdCompliance = smoothstep(lowerThreshold, upperThreshold, currentGradientAndDirection.r);
        multiplier = multiplier * thresholdCompliance;
        
        gl_FragColor = vec4(multiplier, multiplier, multiplier, 1.0);
    }
    `;

  }

}

