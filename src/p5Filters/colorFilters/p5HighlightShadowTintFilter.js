import { P5ImgFilter } from "../p5imgFilter";

export class P5HighlightShadowTintFilter extends P5ImgFilter {
  constructor() {

    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;
    uniform sampler2D textureID;
    uniform float shadowTintIntensity;
    uniform float highlightTintIntensity;
    uniform vec3 shadowTintColor;
    uniform vec3 highlightTintColor;

    const vec3 luminanceWeighting = vec3(0.2125, 0.7154, 0.0721);

    void main() {
      vec4 textureColor = texture2D(textureID, vTexCoord);

      float luminance = dot(textureColor.rgb, luminanceWeighting);
      
      highp vec4 shadowResult = mix(textureColor, max(textureColor, vec4( mix(shadowTintColor, textureColor.rgb, luminance), textureColor.a)), shadowTintIntensity);
      highp vec4 highlightResult = mix(textureColor, min(shadowResult, vec4( mix(shadowResult.rgb, highlightTintColor, luminance), textureColor.a)), highlightTintIntensity);
  
      gl_FragColor = vec4( mix(shadowResult.rgb, highlightResult.rgb, luminance), textureColor.a);     
    }
    `;
  }
}