<template>
  <div 
    class="card"
    :style="{backgroundImage: `url(${set.image && set.image.url})`}"
  >
    <div class="card__header">
      <div class="card__title">{{set.name}}</div>
      <div class="card__subtitle">{{set.houses_in_sets.length}}</div>
    </div>
    <div class="card__footer">
      <div 
        class="card__details-btn"
        @click="$emit('openSetPage', set.id)"
      >Посмотреть</div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: ['set']
})
</script>

<style scoped>
.card {
  width: 189px;
  height: 276px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #56ABFF;
}
.card__title {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #F9F9F9;
  margin-bottom: 8px;
}
.card__subtitle {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #E0E0E0;
}
.card__details-btn {
  width: 149px;
  height: 40px;
  background: #090909;
  border-radius: 60px;
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #F9F9F9;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>