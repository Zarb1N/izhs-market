<template>
  <!-- <teleport to="#overlay"> -->
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
  <!-- </teleport> -->
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'isActive',
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  })
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
  padding: 20px;
  position: absolute;
  transition: 0.3s all;
  top: 100%;

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