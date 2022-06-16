<template>
  <div class="controls">
    <div class="controls__sections">
      <div class="controls__section">
        <div class="controls__header">
          <div class="controls__title">Архитектура</div>
        </div>
        <div class="controls__items">
          <div 
            class="controls__item controls__item--unchoosed"
            v-for="item in data.architecture"
            :key="item.id"
          >
            <span class="controls__item-name">{{item.style}}</span>
            <span> — </span>
            <span class="controls__item-quantity"></span>
          </div>
        </div>
      </div>
      <div class="controls__section">
        <div class="controls__header">
          <div class="controls__title">Подборки</div>
        </div>
        <div class="controls__items">
          <div 
            class="controls__item controls__item--unchoosed"
            v-for="item in data.compilations"
            :key="item.id"
          >
            <span class="controls__item-name">{{item.name}}</span>
            <span> — </span>
            <span class="controls__item-quantity"></span>
          </div>
        </div>
      </div>
      <div 
        class="controls__section"
        v-if="isSortingSection"
      >
        <div class="controls__header">
          <div class="controls__title">Сортировать</div>
        </div>
        <div class="controls__items">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  props: [
    'data',
    'isSortingSection'
  ]
})
</script>

<style scoped>
.controls__title {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.controls__sections {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.controls__items {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 5px;
}
.controls__item {
  height: 28px; 
  padding: 6px 8px;
  border-radius: 11px;
  font-size: 11px;
  font-weight: 400;
  white-space: nowrap;
  transition: .4s all;
  line-height: 20px;
}
.controls__item--unchoosed {
  border: 1px solid #D7D7D7;
}
</style>