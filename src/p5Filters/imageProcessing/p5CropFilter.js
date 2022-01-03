import { P5ImgFilter } from "../p5imgFilter";

export class P5CropFilter extends P5ImgFilter{
  constructor() {

    super();

    this.apply = (img, sk, canvasSize) => {
      this.param.width = this.param.x + this.param.width > img.width ? img.width - this.param.x : this.param.width;
      this.param.height = this.param.y + this.param.height > img.height ? img.height - this.param.y : this.param.height;

      sk.resizeCanvas(this.param.width, this.param.height);
      let cropImg = sk.createImage(this.param.width, this.param.height);
      cropImg.copy(img, this.param.x, this.param.y, this.param.width, this.param.height, 0, 0, this.param.width, this.param.height);

      this.shader.setUniform('flipY', -1.0);
      this.shader.setUniform('textureID', cropImg);
  
      for(const [key, value] of Object.entries(this.param)){
          this.shader.setUniform(''+key, value);                
      }
      sk.shader(this.shader);
      sk.rect(0,0,1,1);
    }
  }
}

