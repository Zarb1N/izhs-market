<template>
  <div
    class="s-card"
    :style="{
      background: `#56ABFF url(${backgroundImagePath})`
    }"
  >
    <div class="s-card__budge">{{budge}}</div>
    <div class="s-card__title">{{title}}</div>
    <div class="s-card__description" v-html="description"></div>
    <div class="s-card__quantity">{{quantity}}</div>
    <img
      class="s-card__icon"
      :src="generalStore.getImageURL(iconPath)"
    />
    <div 
      v-if="set"
      class="s-card__details-btn"
      @click="$emit('goToSetPage', set.id)"
    >Подробнее</div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  props: [
    'budge',
    'title',
    'description',
    'quantity',
    'iconPath',
    'goTo',
    'backgroundImagePath',
    'set',
  ],
  data: () => ({
    generalStore: useStore(),
  })
})
</script>

<style scoped>
.s-card {
  width: 189px;
  height: 344px;
  border-radius: 18px;
  padding: 20px 20px 24px 20px;
  display: grid;
  grid-template-rows: repeat(2, min-content) auto min-content min-content 40px;
}
.s-card__title {
  font-style: normal;
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #F9F9F9;
  margin-bottom: 121px;
}
.s-card__description {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #F9F9F9;
}
.s-card__icon {
  margin-bottom: 24px;
  margin-top: 24px;
}
.s-card__quantity {
  font-weight: 750;
  font-size: 10px;
  line-height: 120%;
  color: #F9F9F9;
}
.s-card__details-btn {
  height: 40px;
  background: #F9F9F9;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #090909;
  font-stretch: 151;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}
</style>