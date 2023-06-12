export class CustomTag extends HTMLElement {
  targMap = {
    font: 'i',
    img: 'img',
    Base64: 'img',
  };
  type = '';
  src = '';
  constructor() {
    super();
    this.type = this.getAttribute('type');
    if(!Object.keys(this.targMap).includes(this.type)){
      throw new Error(`type ${this.type} not in the scope of processing`)
    }
    this.src = this.getAttribute('src');
    this.createTag(this.type);
  }

  createTag(type) {
    const node = document.createElement(this.targMap[type]);
    node.className = 'polymorphic-tag';
    this.appendChild(node);

    const el = this.querySelector('.polymorphic-tag');
    this.setTagAttribute(el);
  }
  setTagAttribute(el) {
    switch (this.type) {
      case 'img' || 'Base64':
        el.src = this.src;
        break;
      case 'font':
        el.classList.add(this.src);
        break;
    }
  }
}
