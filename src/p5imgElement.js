import { P5Img } from './p5img';

export class P5ImgElement extends HTMLElement {

  static get observedAttributes() { return ['src', 'filters', 'width', 'height']; }
  
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + " " + oldValue + " " + newValue);
    switch (name) {
      case 'src':
        break;
      case 'filters':
        break;
      case 'width':
        console.log(`width changed from ${oldValue} to ${newValue}`);
        // this.updateCanvasStyle();
        break;
      case 'height':
        console.log(`height changed from ${oldValue} to ${newValue}`);
        // this.updateCanvasStyle();
        break;
    }
  }

  constructor() {
    console.log("p5img constructor");
    super();

    console.log(this.src);
    console.log(this.filters);
    console.log(this.height);

    this.p5Image = new P5Img(this);
  }

  get src() {
    return this.getAttribute('src');
  }
  
  set src(newValue) {
    this.setAttribute('src', newValue);
  }

  get filters() {
    return this.getAttribute('filters');
  }
  
  set filters(newValue) {
    this.setAttribute('filters', newValue);
  }

  get width() {
    return this.getAttribute('width');
  }
  
  set width(newValue) {
    this.setAttribute('width', newValue);
  }

  get height() {
    return this.getAttribute('height');
  }

  set height(newValue) {
    this.setAttribute('height', newValue);
  }
}


customElements.define('p5-img', P5ImgElement);