import { P5BoxBlurFilter } from './p5BoxBlurFilter';
import { P5ColourFASTSamplingFilter } from './p5ColourFASTSamplingFilter';

export class P5ColourFASTFeatureDetectorFilter {
  constructor() {
    this.boxBlurFilter = new P5BoxBlurFilter();
    this.colourFASTSamplingFilter = new P5ColourFASTSamplingFilter();

    this.createShader = (sk) => {
      this.boxBlurFilter.shader = sk.createShader(this.boxBlurFilter.vertexShader, this.boxBlurFilter.fragmentShader);
      this.boxBlurFilter.param = {"radius": this.param.radius};

      this.colourFASTSamplingFilter.shader = sk.createShader(this.colourFASTSamplingFilter.vertexShader, this.colourFASTSamplingFilter.fragmentShader);
      this.colourFASTSamplingFilter.param = {};
    }

    this.apply = (img, sk, canvasSize) => {
      this.boxBlurFilter.apply(sk.get(), sk, canvasSize);
      this.colourFASTSamplingFilter.apply(img, sk, canvasSize);
    }
  }
}

