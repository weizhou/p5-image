import { P5ImgFilter } from "../p5imgFilter";

export class P5HighlightShadowFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float shadows;
    uniform float highlights;

    const mediump vec3 luminanceWeighting = vec3(0.3, 0.3, 0.3);

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      float luminance = dot(textureColor.rgb, luminanceWeighting);
  
      float shadow = clamp((pow(luminance, 1.0/(shadows+1.0)) + (-0.76)*pow(luminance, 2.0/(shadows+1.0))) - luminance, 0.0, 1.0);
      float highlight = clamp((1.0 - (pow(1.0-luminance, 1.0/(2.0-highlights)) + (-0.8)*pow(1.0-luminance, 2.0/(2.0-highlights)))) - luminance, -1.0, 0.0);
      vec3 result = vec3(0.0, 0.0, 0.0) + ((luminance + shadow + highlight) - 0.0) * ((textureColor.rgb - vec3(0.0, 0.0, 0.0))/(luminance - 0.0));
    
      gl_FragColor = vec4(result, textureColor.a);
      
    }
    `;
  }
}