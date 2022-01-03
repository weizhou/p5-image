export class P5ImgFilter {
  constructor() {
    this.vertexShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    uniform float flipY;
    varying vec2 vTexCoord;
    uniform float texelWidth;
    uniform float texelHeight; 
    
    void main() {
      vec4 positionVec4 = vec4(aPosition * vec3(1.0, flipY, 1.0), 1.0);
      positionVec4.xy = positionVec4.xy * 2.0 + vec2(-1.0, 1.0);
      gl_Position = positionVec4;
      vTexCoord = aTexCoord;
    }
    `;


    this.fragmentShader = `
    #ifdef GL_ES
      precision mediump float;
    #endif
      
    varying vec2 vTexCoord;
    uniform sampler2D textureID;

    void main() {
      gl_FragColor = texture2D(textureID, vTexCoord);
    }
    `;

    this.createShader = (sk) => {
      this.shader = sk.createShader(this.vertexShader, this.fragmentShader);
    }

    this.apply = (img, sk, canvasSize) => {
      this.shader.setUniform('flipY', -1.0);
      this.shader.setUniform('texelWidth', 1.0/canvasSize.w);
      this.shader.setUniform('texelHeight', 1.0/canvasSize.h);
      this.shader.setUniform('textureID', img);
  
      for(const [key, value] of Object.entries(this.param)){
          this.shader.setUniform(''+key, value);                
      }
      sk.shader(this.shader);
      sk.rect(0,0,1,1);   
    }
  }
}