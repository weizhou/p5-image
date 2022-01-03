import { P5GaussianBlurFilter } from '../..';
import { P5ToonFilter } from './p5ToonFilter';

export class P5SmoothToonFilter {
  constructor() {
    this.gaussianBlurFilter = new P5GaussianBlurFilter();
    this.toonFilter = new P5ToonFilter();

    this.createShader = (sk) => {
      this.gaussianBlurFilter.shader = sk.createShader(this.gaussianBlurFilter.vertexShader, this.gaussianBlurFilter.fragmentShader);
      this.gaussianBlurFilter.param = {"radius": this.param.radius, "sigma": this.param.sigma};

      this.toonFilter.shader = sk.createShader(this.toonFilter.vertexShader, this.toonFilter.fragmentShader);
      this.toonFilter.param = {"threshold": this.param.threshold, "quantizationLevels": this.param.quantizationLevels};
    }

    this.apply = (img, sk, canvasSize) => {
      this.gaussianBlurFilter.apply(img, sk, canvasSize);
      this.toonFilter.apply(sk.get(), sk, canvasSize);
    }
  }
}

