import { P5ImgFilter } from "../p5imgFilter";

export class P5BilateralBlurFilter extends P5ImgFilter{
  constructor() {

    super();

    this.vertexShader = `
      #ifdef GL_ES
      precision mediump float;
      #endif
      
      attribute vec3 aPosition;
      attribute vec2 aTexCoord;

      const int GAUSSIAN_SAMPLES = 9;

      uniform float texelWidth;
      uniform float texelHeight; 
      uniform float flipY;
      
      varying vec2 textureCoordinate;
      varying vec2 blurCoordinates[GAUSSIAN_SAMPLES];
      
      void main()
      {
        vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
        gl_Position = positionVec4;

        textureCoordinate = aTexCoord.xy;
        
        // Calculate the positions for the blur
        int multiplier = 0;
        vec2 blurStep;
        vec2 singleStepOffset = vec2(texelWidth, texelHeight);
        
        for (int i = 0; i < GAUSSIAN_SAMPLES; i++)
        {
            multiplier = (i - ((GAUSSIAN_SAMPLES - 1) / 2));
            // Blur in x (horizontal)
            blurStep = float(multiplier) * singleStepOffset;
            blurCoordinates[i] = aTexCoord.xy + blurStep;
        }
    }

    `;

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform sampler2D textureID;
 
    const lowp int GAUSSIAN_SAMPLES = 9;
    
    varying highp vec2 textureCoordinate;
    varying highp vec2 blurCoordinates[GAUSSIAN_SAMPLES];
    
    uniform float distanceNormalizationFactor;
    
    void main()
    {
        vec4 centralColor;
        float gaussianWeightTotal;
        vec4 sum;
        vec4 sampleColor;
        float distanceFromCentralColor;
        float gaussianWeight;
        
        centralColor = texture2D(textureID, blurCoordinates[4]);
        gaussianWeightTotal = 0.18;
        sum = centralColor * 0.18;
        
        sampleColor = texture2D(textureID, blurCoordinates[0]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.05 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
   
        sampleColor = texture2D(textureID, blurCoordinates[1]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.09 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
   
        sampleColor = texture2D(textureID, blurCoordinates[2]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.12 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
   
        sampleColor = texture2D(textureID, blurCoordinates[3]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.15 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
   
        sampleColor = texture2D(textureID, blurCoordinates[5]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.15 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
   
        sampleColor = texture2D(textureID, blurCoordinates[6]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.12 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
   
        sampleColor = texture2D(textureID, blurCoordinates[7]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.09 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
   
        sampleColor = texture2D(textureID, blurCoordinates[8]);
        distanceFromCentralColor = min(distance(centralColor, sampleColor) * distanceNormalizationFactor, 1.0);
        gaussianWeight = 0.05 * (1.0 - distanceFromCentralColor);
        gaussianWeightTotal += gaussianWeight;
        sum += sampleColor * gaussianWeight;
        
        gl_FragColor = sum / gaussianWeightTotal;
    }

    `;
  }
}

