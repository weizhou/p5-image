import { P5ImgFilter } from "../p5imgFilter";

export class P5VignetteFilter extends P5ImgFilter{
  constructor() {

    super();

    this.fragmentShader = 
     `
      #define MAX_RADIUS 10

      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform sampler2D textureID;
      varying vec2 vTexCoord;

      uniform vec2 vignetteCenter;
      uniform vec3 vignetteColor;
      uniform float vignetteStart;
      uniform float vignetteEnd;
      
      void main()
      {
          vec4 sourceImageColor = texture2D(textureID, vTexCoord);
          float d = distance(vTexCoord, vec2(vignetteCenter.x, vignetteCenter.y));
          float percent = smoothstep(vignetteStart, vignetteEnd, d);
          gl_FragColor = vec4(mix(sourceImageColor.rgb, vignetteColor, percent), sourceImageColor.a);
      }
      `;
  }
}
