<template>
  <div 
    class="notification"
    :class="isActive ? 'notification--active' : 'notification--disactive'"
    @click="() => {$emit('close')}"
  >
    <img 
      class="notification__icon"
      :src="generalStore.getImageURL('emojis/repeat-button.svg')"
    />
    <div class="notification__text">
      <span>доступна новая версия — </span>
      <a
        class="notification__link-to-store"
        :href="generalStore.linkToAppInStore"
      >обновить</a>
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
  }),
  methods: {
  }
})
</script>

<style scoped>
.notification {
  position: fixed;
  width: 100%;
  z-index: 400;
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