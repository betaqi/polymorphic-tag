
<template>
  <custom-polymorphic-tag :type="'img'" :src="img">
  </custom-polymorphic-tag>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { CustomTag } from './views/polymorphic'
import { onMounted } from 'vue';
import img from './assets/2.jpg'
onMounted(() => {
  window.customElements.define('custom-polymorphic-tag', CustomTag)

})
</script>
