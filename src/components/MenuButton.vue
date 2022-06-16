<template>
  <div class="m-btn">
    <img 
      class="m-btn__icon"
      :src="data.icon && getImageURL(data.icon)"
    />
    <div class="m-btn__text">{{data.name}}</div>
    <slot class="m-btn__slot"></slot>
    <img src="" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: ['data'],
  methods: {
    getImageURL(iconName : string) {
      const path = new URL(
        `../assets/emojis/${iconName}.svg`,
        import.meta.url
      ).href
      return path
    }
  }
})

</script>

<style>
.m-btn {
  display: grid;
  height: 64px;
  grid-template-columns: 32px auto 24px;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid #E0E0E0;
}
.m-btn__text {
  font-style: 'normal';
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #2D2D2D;
  font-stretch: 151;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}
</style>