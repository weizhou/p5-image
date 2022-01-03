import { P5DilationFilter } from './p5DilationFilter';
import { P5ErosionFilter } from './p5ErosionFilter';

export class P5ClosingFilter {
  constructor() {
    this.dilationFilter = new P5DilationFilter();
    this.erosionFilter = new P5ErosionFilter();

    this.createShader = (sk) => {
      this.dilationFilter.shader = sk.createShader(this.dilationFilter.vertexShader, this.dilationFilter.fragmentShader);
      this.dilationFilter.param = {"radius": this.param.radius};

      this.erosionFilter.shader = sk.createShader(this.erosionFilter.vertexShader, this.erosionFilter.fragmentShader);
      this.erosionFilter.param = {"radius": this.param.radius};
    }

    this.apply = (img, sk, canvasSize) => {
      this.dilationFilter.apply(sk.get(), sk, canvasSize);
      this.erosionFilter.apply(img, sk, canvasSize);
    }
  }
}

