<template>
  <div
    class="error"
    :class="isActive ? 'error--active' : 'error--disactive'"
  >
    <img
      class="error__icon"
      :src="generalStore.getImageURL('emojis/man-mechanic.svg')"
    />
    <div class="error__text">Произошла ошибка, исправляем</div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'isActive'
  ],
  data: () => ({
    generalStore: useStore(),
  })
})
</script>

<style scoped>
.error {
  position: absolute;
  width: 100%;
  z-index: 300;
  min-height: 60px;
  background: #DF4343;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
}
.error--active {
  top: 0px;
  opacity: 1;
}
.error--disactive {
  top: -60px;
  opacity: 0;
}
.error__text {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 1px;
}
</style>