import { P5ImgFilter } from "../p5imgFilter";

export class P5TemperatureFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform lowp float temperature;

    float normTemperature = (temperature < 5000.0) ? (0.0004*(temperature-5000.0)) : (0.00006*(temperature-5000.0));
    const vec3 warmFilter = vec3(0.93, 0.54, 0.0);

    void main() {
      lowp vec4 textureColor = texture2D(textureID, vTexCoord);

      lowp vec3 processed = vec3(
        (textureColor.r < 0.5 ? (2.0 * textureColor.r * warmFilter.r) : (1.0 - 2.0 * (1.0 - textureColor.r) * (1.0 - warmFilter.r))), //adjusting temperature
        (textureColor.g < 0.5 ? (2.0 * textureColor.g * warmFilter.g) : (1.0 - 2.0 * (1.0 - textureColor.g) * (1.0 - warmFilter.g))), 
        (textureColor.b < 0.5 ? (2.0 * textureColor.b * warmFilter.b) : (1.0 - 2.0 * (1.0 - textureColor.b) * (1.0 - warmFilter.b))));
    
      gl_FragColor = vec4(mix(textureColor.rgb, processed, normTemperature), textureColor.a);
    
    }
    `;
  }
}