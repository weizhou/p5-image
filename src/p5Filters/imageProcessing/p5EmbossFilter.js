import { P5ConvFilter } from './p5ConvFilter';

export class P5EmbossFilter extends P5ConvFilter {
  constructor() {
    super();
    this.convMatrixValue =  `mat3(-2.0, -1.0, 0.0, -1.0, 1.0, 1.0, 0.0, 1.0, 2.0)`; 
    this.generateFragmentShader();   
  }
}

