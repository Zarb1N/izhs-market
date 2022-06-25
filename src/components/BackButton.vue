<template>
  <div 
    class="back-btn"
    @click="goTo ? $router.push(goTo) : $router.go(-1)"
  >
    <img 
      class="back-btn__icon"
      :src="generalStore.getImageURL('icons/back-arrow.svg')"
    />
    <div class="back-btn__text">
      {{text || 'Назад'}}
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'goTo',
    'text'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  })
})
</script>

<style scoped>
.back-btn {
  display: grid;
  grid-template-columns: 18px min-content;
  gap: 5px;
  align-items: center;
}
.back-btn__icon {
  justify-self: center;
}
.back-btn__text {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
}
</style>