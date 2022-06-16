<template>
  <div 
    class="c-card"
    :class="color ? `c-card--${color}` : 'c-card--white'"
  >
    <div class="c-card__header">
      <div class="c-card__title">{{title}}</div>
    </div>
    <div class="c-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'color' as string,
    'title' as string,

  ]
})
</script>

<style>
.c-card {
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
  padding: 20px;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 15px;
}
.c-card--gray {
  background: var(--gray-background);
}
.c-card--white {
  background: var(--white);
}
.c-card__header {}
.c-card__title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
}



</style>