import { P5RadiusFilter } from "./p5RadiusFilter";

export class P5BlockBlurFilter extends P5RadiusFilter{
  constructor() {
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform sampler2D textureID;
          
    varying vec2 vTexCoord;
    varying float inputRadius;
    varying float inputTexelWidth;
    varying float inputTexelHeight;

    void main()
    {

      vec2 blockSize = vec2(inputRadius * inputTexelWidth, inputRadius * inputTexelHeight);
      vec2 block = floor(vTexCoord / blockSize);
      vec2 blockStartCoordinate = block * blockSize;

      gl_FragColor = texture2D(textureID, blockStartCoordinate);
    }
    `;

  }

}