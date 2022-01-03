import { P5ImgFilter } from '../p5imgFilter';
import { P5XYDerivativeFilter } from './p5XYDerivativeFilter';
import { P5GaussianBlurFilter } from './p5GaussianBlurFilter';
import { P5NonMaximumSuppressionFilter } from './p5NonMaximumSuppressionFilter';

export class P5HarrisCornerDetectionFilter extends P5ImgFilter {
  constructor() {
    
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;   
    uniform sampler2D inputImageTexture;

    uniform float sensitivity;
 
    const float harrisConstant = 0.04;
    
    void main()
    {
      vec3 derivativeElements = texture2D(inputImageTexture, vTexCoord).rgb;
      
      float derivativeSum = derivativeElements.x + derivativeElements.y;
      
      float zElement = (derivativeElements.z * 2.0) - 1.0;
  
      // R = Ix^2 * Iy^2 - Ixy * Ixy - k * (Ix^2 + Iy^2)^2
      float cornerness = derivativeElements.x * derivativeElements.y - (zElement * zElement) - harrisConstant * derivativeSum * derivativeSum;
      
      gl_FragColor = vec4(vec3(cornerness * sensitivity), 1.0);
    }    
    `;
    
    this.xyDerivativeFilter = new P5XYDerivativeFilter();
    this.gussianBlurFilter = new P5GaussianBlurFilter();
    this.nonMaximumSuppressionFilter = new P5NonMaximumSuppressionFilter();


    this.createShader = (sk) => {

      this.xyDerivativeFilter.shader = sk.createShader(this.xyDerivativeFilter.vertexShader, this.xyDerivativeFilter.fragmentShader);
      this.xyDerivativeFilter.param = {"edgeStrength": 2.0};

      this.gussianBlurFilter.shader = sk.createShader(this.gussianBlurFilter.vertexShader, this.gussianBlurFilter.fragmentShader);
      this.gussianBlurFilter.param = {"radius": this.param.blurRadius, "sigma": this.param.blurSigma};

      this.nonMaximumSuppressionFilter.shader = sk.createShader(this.nonMaximumSuppressionFilter.vertexShader, this.nonMaximumSuppressionFilter.fragmentShader);
      this.nonMaximumSuppressionFilter.param = {};

      this.shader = sk.createShader(this.vertexShader, this.fragmentShader);

    }

    this.apply = (img, sk, canvasSize) => {
      this.xyDerivativeFilter.apply(img, sk, canvasSize);
      this.gussianBlurFilter.apply(sk.get(), sk, canvasSize);

      this.shader.setUniform('flipY', -1.0);
      this.shader.setUniform('texelWidth', 1.0/canvasSize.w);
      this.shader.setUniform('texelHeight', 1.0/canvasSize.h);
      this.shader.setUniform('inputImageTexture', sk.get());

      for(const [key, value] of Object.entries(this.param)){
          this.shader.setUniform(''+key, value);                
      }
      sk.shader(this.shader);
      sk.rect(0,0,1,1);  

      this.nonMaximumSuppressionFilter.apply(sk.get(), sk, canvasSize);
    }

  }
}

