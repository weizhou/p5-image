import { P5ImgFilter } from "./p5Filters/p5imgFilter";

export class P5Img {

    constructor(parent) {
        this.parentNode = parent;
        this.init();
    }

    createFilters(filterStr) {
        this.filters = [];
        if(filterStr==null) {
            //add the default filter...
            let defaultFilter = new P5ImgFilter();
            defaultFilter.param = {};
            this.filters.push(defaultFilter);
            return;
        }
        for(const [filterName, filterParams] of Object.entries(JSON.parse(filterStr))){
            if (filterParams.repeat == null){
                filterParams.repeat = 1;
            }
            for(let i=0; i<filterParams.repeat; i++){
                let filter = eval("new P5"+filterName+"()");
                filter.param = filterParams;
                this.filters.push(filter);    
            }    
        }
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
                this.img = s.loadImage(this.parentNode.src, 
                    ()=>{});                
            }
            s.setup = () => {
              this.styleSize={};
              let imgSize={};
              this.styleSize.w = this.parentNode.width;
              this.styleSize.h = this.parentNode.height;
              imgSize.w = this.img.width;
              imgSize.h = this.img.height;

              this.canvasSize = this.calculateSize(this.styleSize, imgSize);

              this._canvas = s.createCanvas(this.canvasSize.w, this.canvasSize.h, s.WEBGL);

                // keep a reference
              let originParent = this._canvas.parent();  
              this._canvas.parent(this.parentNode);
              originParent.remove();

              this.createFilters(this.parentNode.filters);

              this.filters.forEach(f=>f.createShader(s));

              s.noStroke();

            };
            s.draw = () => {    
                if (this.count > 1) {
                    return;
                } 
                this.count ++;  

                for (let i=0; i<this.filters.length; i++) {                      
                    this.filters[i].apply(i==0?this.img: s.get(), s, this.canvasSize);
                }
            }
          }
      
        this._p5 = new p5(sketch);
    }
}