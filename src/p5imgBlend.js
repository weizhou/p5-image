export class P5ImgBlend {

    constructor(parent) {
        this.parentNode = parent;
        this.init();
    }

    createBlend(mode, param) {
        let blender = eval("new P5"+mode+"()");
        this.blender = blender;  
        this.blender.param = JSON.parse(param || "{}");  
    }

    calculateSize(styleSize, imgSize){
        let returnSize={};
        if(styleSize.w==null && styleSize.h==null){
            returnSize.w = imgSize.w;
            returnSize.h = imgSize.h;
        }else if(styleSize.w==null){
            returnSize.h = styleSize.h;
            returnSize.w = parseInt(returnSize.h * (imgSize.w/imgSize.h));
        }else if(styleSize.h==null){
            returnSize.w = styleSize.w;
            returnSize.h = parseInt(returnSize.w / (imgSize.w/imgSize.h));
        }else{
            returnSize.w = styleSize.w;
            returnSize.h = styleSize.h;
        }
        return returnSize;
    }

    init() {
        this.count = 0;
        let sketch = (s) => {
            s.preload = () => {
                this.img1 = s.loadImage(this.parentNode.src1, 
                    ()=>{});
                this.img2 = s.loadImage(this.parentNode.src2, 
                    ()=>{});                    
            }
            s.setup = () => {
              this.styleSize={};
              let imgSize={};
              this.styleSize.w = this.parentNode.width;
              this.styleSize.h = this.parentNode.height;
              imgSize.w = this.img1.width;
              imgSize.h = this.img1.height;

              this.canvasSize = this.calculateSize(this.styleSize, imgSize);

              this._canvas = s.createCanvas(this.canvasSize.w, this.canvasSize.h, s.WEBGL);
              this._canvas.parent(this.parentNode);

              this.createBlend(this.parentNode.mode, this.parentNode.param);

              this.blender.createShader(s);

              s.noStroke();

            };
            s.draw = () => {    
                if (this.count > 1) {
                    return;
                } 
                this.count ++;  

                this.blender.apply(s, this.img1, this.img2);
            }
          }
      
        this._p5 = new p5(sketch);
    }
}

export function p5ImageBlend(setting) {
    let targetElement = document.getElementById(setting.target);
    targetElement.src1 = setting.src1;
    targetElement.src2 = setting.src2;
    targetElement.mode = setting.mode;
    targetElement.param = JSON.stringify(setting.param);
    targetElement.width = setting.width;
    targetElement.height = setting.height;
    new P5ImgBlend(targetElement);
}