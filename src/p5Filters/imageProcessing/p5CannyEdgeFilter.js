import { P5ContrastFilter } from '../colorFilters/p5ContrastFilter';
import { P5GrayscaleFilter } from '../colorFilters/p5GrayscaleFilter';
import { P5ImgFilter } from '../p5imgFilter';
import { P5GaussianBlurFilter } from './p5GaussianBlurFilter';
import { P5NonMaximumSuppressionFilter } from './p5NonMaximumSuppressionFilter';
import { P5SobelEdgeFilter } from './p5SobelEdgeFilter';
import { P5WeakPixelInclusionFilter } from './p5WeakPixelInclusionFilter';

export class P5CannyEdgeFilter {
  constructor() {
    this.grayscaleFilter = new P5GrayscaleFilter();
    this.gussianBlurFilter = new P5GaussianBlurFilter();
    this.sobelEdgeFilter = new P5SobelEdgeFilter();
    this.nonMaximumSuppressionFilter = new P5NonMaximumSuppressionFilter();
    this.weakPixelInclusionFilter = new P5WeakPixelInclusionFilter();

    this.createShader = (sk) => {
      this.grayscaleFilter.shader = sk.createShader(this.grayscaleFilter.vertexShader, this.grayscaleFilter.fragmentShader);
      this.grayscaleFilter.param = {};

      this.gussianBlurFilter.shader = sk.createShader(this.gussianBlurFilter.vertexShader, this.gussianBlurFilter.fragmentShader);
      this.gussianBlurFilter.param = {"radius": 2.0, "sigma": 1.0};

      this.sobelEdgeFilter.shader = sk.createShader(this.sobelEdgeFilter.vertexShader, this.sobelEdgeFilter.fragmentShader);
      this.sobelEdgeFilter.param = {};

      this.nonMaximumSuppressionFilter.shader = sk.createShader(this.nonMaximumSuppressionFilter.vertexShader, this.nonMaximumSuppressionFilter.fragmentShader);
      this.nonMaximumSuppressionFilter.param = {"lowerThreshold": 0.1, "upperThreshold": 0.11};

      this.weakPixelInclusionFilter.shader = sk.createShader(this.weakPixelInclusionFilter.vertexShader, this.weakPixelInclusionFilter.fragmentShader);
      this.weakPixelInclusionFilter.param = {"sumTest": 0.8, "pixelTest": 0.01};


    }

    this.apply = (img, sk, canvasSize) => {
      this.grayscaleFilter.apply(img, sk, canvasSize);
      this.gussianBlurFilter.apply(sk.get(), sk, canvasSize);
      this.sobelEdgeFilter.apply(sk.get(), sk, canvasSize);
      this.nonMaximumSuppressionFilter.apply(sk.get(), sk, canvasSize);
      this.weakPixelInclusionFilter.apply(sk.get(), sk, canvasSize);
    }

  }
}

