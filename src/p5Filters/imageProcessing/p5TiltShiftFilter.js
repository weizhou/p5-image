import { P5ImgFilter } from '../p5imgFilter';
import { P5GaussianBlurFilter } from './p5GaussianBlurFilter';

export class P5TiltShiftFilter extends P5ImgFilter {
  constructor() {
    
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    
    uniform sampler2D inputImageTexture;
    uniform sampler2D inputImageTexture2; 
    
    uniform float topFocusLevel;
    uniform float bottomFocusLevel;
    uniform float focusFallOffRate;
    
    void main()
    {
        lowp vec4 sharpImageColor = texture2D(inputImageTexture, vTexCoord);
        lowp vec4 blurredImageColor = texture2D(inputImageTexture2, vTexCoord);
        
        float blurIntensity = 1.0 - smoothstep(topFocusLevel - focusFallOffRate, topFocusLevel, vTexCoord.y);
        blurIntensity = blurIntensity * smoothstep(bottomFocusLevel, bottomFocusLevel + focusFallOffRate, vTexCoord.y);
        
        gl_FragColor = mix(sharpImageColor, blurredImageColor, blurIntensity);
    }
    `;
    
    this.gussianBlurFilter = new P5GaussianBlurFilter();



    this.createShader = (sk) => {
      this.gussianBlurFilter.shader = sk.createShader(this.gussianBlurFilter.vertexShader, this.gussianBlurFilter.fragmentShader);
      this.gussianBlurFilter.param = {"radius": this.param.blurRadius, "sigma": this.param.blurSigma};

      this.shader = sk.createShader(this.vertexShader, this.fragmentShader);

    }

    this.apply = (img, sk, canvasSize) => {
      this.gussianBlurFilter.apply(img, sk, canvasSize);

      this.shader.setUniform('flipY', -1.0);
      this.shader.setUniform('texelWidth', 1.0/canvasSize.w);
      this.shader.setUniform('texelHeight', 1.0/canvasSize.h);
      this.shader.setUniform('inputImageTexture', img);
      this.shader.setUniform('inputImageTexture2', sk.get());

      for(const [key, value] of Object.entries(this.param)){
          this.shader.setUniform(''+key, value);                
      }
      sk.shader(this.shader);
      sk.rect(0,0,1,1);  
    }

  }
}

