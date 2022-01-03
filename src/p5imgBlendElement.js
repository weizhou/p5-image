import { P5ImgBlend } from './p5imgBlend';

export class P5ImgBlendElement extends HTMLElement {

  static get observedAttributes() { return ['src1', 'src2', 'mode', 'param', 'width', 'height']; }
  
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name + " " + oldValue + " " + newValue);
    switch (name) {
      case 'src1':
        break;
      case 'src2':
        break;  
      case 'mode':
        break;
      case 'param':
        break;
      case 'width':
        console.log(`width changed from ${oldValue} to ${newValue}`);
        break;
      case 'height':
        console.log(`height changed from ${oldValue} to ${newValue}`);
        break;
    }
  }

  constructor() {
    console.log("p5imgblendElement constructor");
    super();
    this.p5ImageBlend = new P5ImgBlend(this);
  }

  get src1() {
    return this.getAttribute('src1');
  }
  
  set src1(newValue) {
    this.setAttribute('src1', newValue);
  }

  get src2() {
    return this.getAttribute('src2');
  }
  
  set src2(newValue) {
    this.setAttribute('src2', newValue);
  }

  get mode() {
    return this.getAttribute('mode');
  }
  
  set mode(newValue) {
    this.setAttribute('mode', newValue);
  }

  get param() {
    return this.getAttribute('param');
  }
  
  set param(newValue) {
    this.setAttribute('param', newValue);
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


customElements.define('p5-img-blend', P5ImgBlendElement);