<template>
  <div class="popup" :class="isActive ? 'popup--active' : 'popup--disactive'">
    <div class="popup__wrapper" @click="$emit('close')"></div>
    <div class="popup__card">
      <div class="popup__header" v-show="showHeader">
        <slot name="title" class="popup__title"></slot>
        <img class="popup__close-btn" src="@/assets/icons/x-mark-in-circle.svg" @click="$emit('close')" />
      </div>
      <div class="popup__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'isActive',
    'isHeader', /* true by default */
  ],
  computed: {
    showHeader() {
      if (this.isHeader || this.isHeader === undefined) {
        return true
      }
      return false
    }
  }
})
</script>

<style scoped>
.popup {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0;
  transition: all 0.3s;
  overflow: hidden;
  padding: 8px;
}

.popup--active {
  opacity: 1;
  pointer-events: all;
}

.popup--disactive {
  opacity: 0;
  pointer-events: none;
}

.popup__wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(9, 9, 9, 0.6);
  transition: all 0.3s;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.popup__card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px 16px 20px 16px;
  z-index: 200;
  width: 100%;
  height: auto;
  transition: height .3s;
}

.popup__header {
  display: grid;
  grid-template-columns: auto 32px;
  align-items: center;
}

.popup__close-btn {
  grid-column: 2 / 3;
}
</style>