import { P5RadiusFilter } from "./p5RadiusFilter";

export class P5GaussianBlurFilter extends P5RadiusFilter{
  constructor() {
    super();

    this.moreUniforms = `
    uniform float sigma;
    uniform float weightSum;
    `;
    
    this.weightFunction = `
    float weight(int i, int j, float radius, float sigma, float weightSum){
      float size = 2.0*radius + 1.0;
      float w = exp(-((float(i)-radius)*(float(i)-radius)+(float(j)-radius)*(float(j)-radius)) / (2.0*sigma*sigma));
      return w/weightSum;
    }  
    `;

    this.invokeWeightFunc = `
    float weight = weight(i, j, inputRadius, sigma, weightSum); 
    `

    this.generateFragmentShader();

    this.apply = (img, sk, canvasSize) => {
      this.shader.setUniform('flipY', -1.0);
      this.shader.setUniform('texelWidth', 1.0/canvasSize.w);
      this.shader.setUniform('texelHeight', 1.0/canvasSize.h);
      this.shader.setUniform('textureID', img);
      let radius = this.param.radius;
      let sigma = this.param.sigma;
      this.shader.setUniform('weightSum', this.gaussianKernelSum(radius, sigma));//how do i get this??
  
      for(const [key, value] of Object.entries(this.param)){
          this.shader.setUniform(''+key, value);                
      }
      sk.shader(this.shader);
      sk.rect(0,0,1,1);   
    }

    this.gaussianKernelSum = (radius, sigma) => {
      let sum = 0;
      for (let i=-radius; i<=radius; ++i){
        for(let j=-radius; j<=radius; ++j){
          let hg = Math.exp(- (i*i+j*j) / (2*sigma*sigma));
          sum += hg;
        }
      }
      return sum;
    }
  }
}