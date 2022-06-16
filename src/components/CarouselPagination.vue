<template>
  <div 
    class="pagination"
    :style="{
      gridTemplateColumns: `repeat(${items}, 1fr)`,
    }"
  >
      <div 
        class="pagination__point"
        :class="index === currentItem ? 'pagination__point--choosed' : 'pagination__point--unchoosed'"
        v-for="(item, index) in items"
        :key="index"
      ></div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'items',
    'currentItem'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  }),
})
</script>

<style>
.pagination {
  margin: 16px 20px;
  height: 3px;
  width: calc(100% - 2 * 20px);
  border-radius: 2px;
  display: grid;
  gap: 8px;
}
.pagination__point {
  height: 100%;
  border-radius: 2px;
  transition: background .3s;
}
.pagination__point--choosed {
  background: #1B1B1B;
}
.pagination__point--unchoosed {
  background: #BABABA;
}
</style>