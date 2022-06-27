<template>
  <div
    class="notification__wrap"
    :class="isActive ? 'notification__wrap--active' : 'notification__wrap--disactive'"
  >
    <div
      class="notification"
      :class="isActive ? 'notification--active' : 'notification--disactive'"
    >
      <img
        class="notification__icon"
        :src="generalStore.getImageURL('emojis/warning.svg')"
      />
      <div class="notification__text">
        <span>для продолжения — </span>
        <a
          class="notification__link-to-store"
          :href="generalStore.linkToAppInStore"
        >обновите</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'isActive'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  })
})
</script>

<style scoped>
.notification__wrap {
  position: absolute;
  z-index: 400;
  height: 100%;
  width: 100%;
  transition: all 0.3s;
}
.notification__wrap--active {
  background: rgba(0, 0, 0, 0.3);
  pointer-events: all;
}
.notification__wrap--disactive {
  background: rgba(0, 0, 0, 0);
  pointer-events: none;
}
.notification {
  position: fixed;
  width: 100%;
  min-height: 60px;
  background: #EDECF2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
}
.notification--active {
  top: 0px;
  opacity: 1;
}
.notification--disactive {
  top: -60px;
  opacity: 0;
}
.notification__text {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 1px;
}
.notification__link-to-store {
  color: #3B88C3;
}
</style>