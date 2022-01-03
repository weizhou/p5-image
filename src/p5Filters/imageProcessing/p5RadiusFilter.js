import { P5ImgFilter } from "../p5imgFilter";

export class P5RadiusFilter extends P5ImgFilter{
  constructor() {

    super();
    this.vertexShader = `
      #ifdef GL_ES
      precision mediump float;
      #endif

      attribute vec3 aPosition;
      attribute vec2 aTexCoord;
      
      uniform int radius;
      uniform float texelWidth;
      uniform float texelHeight; 

      uniform float flipY;
      
      varying vec2 vTexCoord;
      varying float inputRadius;
      varying float inputTexelWidth;
      varying float inputTexelHeight;
      
      void main()
      {
        vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
        gl_Position = positionVec4;

        vTexCoord = aTexCoord;
        inputRadius = float(radius);
        inputTexelWidth = texelWidth;
        inputTexelHeight = texelHeight;
      }
    `;

    this.fragmentShaderTemplate = 
     `
      #define MAX_RADIUS 10

      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform sampler2D textureID;
      <more uniforms>
            
      varying vec2 vTexCoord;
      varying float inputRadius;
      varying float inputTexelWidth;
      varying float inputTexelHeight;

      <weight function> 

      vec2 neighborCord(vec2 upleftCord, float texelWidth, float texelHeight, int row, int col) {
        vec2 nCord = upleftCord + vec2(float(col)*texelWidth, float(row)*texelHeight);
        return nCord;
      }

      void main()
      {
        vec4 textureColor = texture2D(textureID, vTexCoord);
        vec3 resultColor = vec3(0.0, 0.0, 0.0);

        float size = 2.0*inputRadius + 1.0;

        for (int i=0; i<2*MAX_RADIUS+1; ++i){
          if (size-0.1 <= float(i)) break;
          for (int j=0; j<2*MAX_RADIUS+1; ++j){
            if (size-0.1 <= float(j)) break;
            vec2 upleftCord = vTexCoord - vec2(inputRadius*inputTexelWidth, inputRadius*inputTexelHeight);
            vec2 nCord = neighborCord(upleftCord, inputTexelWidth, inputTexelHeight, i, j);
            vec4 nColor = texture2D(textureID, nCord);

            <invoke weight function>

            resultColor =  resultColor + nColor.rgb * weight;
          }        
        }

        <final adjustment>
        
      }
    `;

    this.moreUniforms = '';
    this.weightFunction = `
    float weight(int i, int j, float radius){
      return 1.0 / ((2.0*radius +1.0)*(2.0*radius + 1.0));
    }    
    `;
    this.invokeWeightFunc = `
    float weight = weight(i, j, inputRadius);    
    `;
    this.finalAdjustment = `
    gl_FragColor = vec4(resultColor, textureColor.a);
    `;

    this.generateFragmentShader();
  }


  generateFragmentShader() {
    this.fragmentShader = this.fragmentShaderTemplate.replace("<more uniforms>", this.moreUniforms)
                              .replace("<weight function>", this.weightFunction)
                              .replace("<invoke weight function>", this.invokeWeightFunc)
                              .replace("<final adjustment>", this.finalAdjustment);
  }
}
