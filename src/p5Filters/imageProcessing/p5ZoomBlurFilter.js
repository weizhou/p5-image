import { P5ImgFilter } from "../p5imgFilter";

export class P5ZoomBlurFilter extends P5ImgFilter{
  constructor() {
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform sampler2D textureID;
    varying vec2 vTexCoord;
    
    uniform highp vec2 blurCenter;
    uniform highp float blurSize;
    
    void main()
    {
        // TODO: Do a more intelligent scaling based on resolution here
        highp vec2 samplingOffset = 1.0/100.0 * (blurCenter - vTexCoord) * blurSize;
        
        lowp vec4 fragmentColor = texture2D(textureID, vTexCoord) * 0.18;
        fragmentColor += texture2D(textureID, vTexCoord + samplingOffset) * 0.15;
        fragmentColor += texture2D(textureID, vTexCoord + (2.0 * samplingOffset)) *  0.12;
        fragmentColor += texture2D(textureID, vTexCoord + (3.0 * samplingOffset)) * 0.09;
        fragmentColor += texture2D(textureID, vTexCoord + (4.0 * samplingOffset)) * 0.05;
        fragmentColor += texture2D(textureID, vTexCoord - samplingOffset) * 0.15;
        fragmentColor += texture2D(textureID, vTexCoord - (2.0 * samplingOffset)) *  0.12;
        fragmentColor += texture2D(textureID, vTexCoord - (3.0 * samplingOffset)) * 0.09;
        fragmentColor += texture2D(textureID, vTexCoord - (4.0 * samplingOffset)) * 0.05;
        
        gl_FragColor = fragmentColor;
    }
    `;
  }
}

