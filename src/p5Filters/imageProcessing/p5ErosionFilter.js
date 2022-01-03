import { P5RadiusFilter } from "./p5RadiusFilter";

export class P5ErosionFilter extends P5RadiusFilter{
  constructor() {

    super();

    this.fragmentShader = `
    
    #define max_RADIUS 10

    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform sampler2D textureID;
          
    varying vec2 vTexCoord;
    varying float inputRadius;
    varying float inputTexelWidth;
    varying float inputTexelHeight;

    vec2 neighborCord(float texelWidth, float texelHeight, int step) {
      vec2 nCord = vTexCoord + vec2(float(step)*texelWidth, float(step)*texelHeight);
      return nCord;
    }

    void main()
    {
      vec4 textureColor = texture2D(textureID, vTexCoord);
      vec3 resultColor = vec3(0.0, 0.0, 0.0);

      vec4 minColor = vec4(1.0, 1.0, 1.0, 1.0);
      for (int i=1; i<2*max_RADIUS+1; ++i){
        if (inputRadius+0.1 <= float(i)) break;
        vec2 leftCord = neighborCord(inputTexelWidth, inputTexelHeight, -i);
        vec2 rightCord = neighborCord(inputTexelWidth, inputTexelHeight, i);
        vec4 leftColor = texture2D(textureID, leftCord);
        vec4 rightColor = texture2D(textureID, rightCord);

        minColor = min(minColor, leftColor);
        minColor = min(minColor, rightColor);
      }

      minColor = min(minColor, textureColor);

      gl_FragColor = minColor;
    }
  `;
}
}

