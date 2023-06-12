# 动态标签



## 背景

我们经常会在页面上处理 img 或 icon 但想要合理的渲染他们 我们必须使用不同的标签 例如：

```html
<img src='xxx' />  or <i class='xxx' />
```

当我想要渲染的图片有很多个并且 他们掺杂了img 或 icon 例如:

```vue
// 有这样一个JSON
let data = [{src:'xxx', type:'img'},{src:'xxx', type:'icon'}]
<template v-for="item  in data">
	<img :src="item.src" v-if="item.type === 'img'" />
	<i :calss="item.src" v-else-if="item.type === 'icon'" />
	.....
</template>
```

那有没有一种类似动态组件的方法来处理这种需要不同标签渲染的问题呢？于是在经过N天后我看到 Window.customElements 这个方法才解决了这个困惑我很久的问题。

## 实现

简单来说 这里创建了 一个 custom-polymorphic-tag 动态标签然后在浏览器解析到这个标签的时候会自动 new CustomTag 

ps: 如果你也想在vue中使用记得修改下vue的配置不然vue会把 custom-polymorphic-tag 当成一个组件解析 

```javascript
// polymorphicTag.js
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


```

```vue
// App.vue
<template>
  <custom-polymorphic-tag :type="xxx" :src="xx">
</template>
<script setup>
import { CustomTag } from 'polymorphicTag.js'
onMounted(() => {
  window.customElements.define('custom-polymorphic-tag', CustomTag)
})
</script>
```

