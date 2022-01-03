import { P5ConvFilter } from "./p5ConvFilter";

export class P5AverageColorFilter extends P5ConvFilter{
  constructor() {
    super();
    this.convMatrixValue =  `mat3(0.0, 0.25, 0.0, 0.25, 0.0, 0.25, 0.0, 0.25, 0.0)`; 
    this.generateFragmentShader();   
  }

}