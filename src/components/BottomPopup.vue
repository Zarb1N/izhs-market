<template>
  <teleport v-if="isMounted" to="#overlay">
    <div class="popup" :class="isActive ? 'popup--active' : 'popup--disactive'">
      <div class="popup__wrapper" @click="$emit('close')"></div>
      <div class="popup__card">
        <div class="popup__header">
          <slot name="title" class="popup__title"></slot>
          <img class="popup__close-btn" src="@/assets/icons/x-mark-in-circle.svg" @click="$emit('close')" />
        </div>
        <div class="popup__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
    }
  },
  data() {
    return {
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true
  },
  emits: ["close"],
})
</script>

<style scoped>
.popup {
  position: absolute;
  width: 375px;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  padding: 0;
  transition: all 0.3s;
  overflow: hidden;
  top: 0;
}

.popup--active {
  pointer-events: all;
}

.popup--disactive {
  pointer-events: none;
}

.popup__wrapper {
  position: absolute;
  width: 375px;
  height: 100%;
  background: rgba(9, 9, 9, 0.6);
  transition: all 0.3s;
}

.popup--active .popup__wrapper {
  opacity: 1;
}

.popup--disactive .popup__wrapper {
  opacity: 0;
}

.popup--disactive .popup__card {
  transform: translateY(0%);
}

.popup--active .popup__card {
  transform: translateY(-100%);
}

.popup__card {
  background: #F9F9F9;
  backdrop-filter: blur(80px);
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  padding: 0px 20px 40px 20px;
  position: absolute;
  transition: 0.3s all;
  top: 100%;
  max-height: calc(100% - 100px);
  overflow: auto;

}
.popup__body {
  height: 100%;
  position: relative;
  bottom: 0;
}
.popup__header {
  background: #F9F9F9;
  display: grid;
  grid-template-columns: auto 32px;
  align-items: center;
  position: sticky;
  top: 0px;
  margin-left: -20px;
  margin-right: -20px;
  padding: 20px 20px 0px 20px;
}

.popup__close-btn {
  grid-column: 2 / 3;
}
.popup__gestures-area {
  height: 34px;
  width: 100%;
}
</style>