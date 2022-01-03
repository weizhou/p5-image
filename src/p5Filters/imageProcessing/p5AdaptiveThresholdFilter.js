import { P5RadiusFilter } from "./p5RadiusFilter";

export class P5AdaptiveThresholdFilter extends P5RadiusFilter{
  constructor() {
    super();

    this.finalAdjustment = `
    vec3 W = vec3(0.2125, 0.7154, 0.0721);
    float thresholdResult = step(dot(resultColor.rgb, W) - 0.05, dot(textureColor.rgb, W));
    
    gl_FragColor = vec4(vec3(thresholdResult), 1.0);
    `;

    this.generateFragmentShader();
  }
}
