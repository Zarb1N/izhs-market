<template>
  <div class="c-menu">
    <div class="c-menu__options">
      <div 
        class="c-menu__option"
        v-for="option in options"
        :key="option.text"
        @click="() => {option.action(), $emit('close')}"
      >
        {{option.text}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from '@/stores/general'
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  props: [
    'options'
  ],
  mounted() {
  }
})
</script>


<style>
  .c-menu {
    position: fixed;
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    padding: 20px;
    z-index: 50;
    outline: none;
  }
  .c-menu__options {
    display: flex;
    flex-direction: column;
    gap: 17px;
  }
  .c-menu__option {
    font-weight: normal;
    font-size: 12px;
    line-height: 15px; 
    white-space: nowrap;
  }
</style>