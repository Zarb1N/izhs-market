<template>
  <div class="gallery">
    <div class="gallery__header header">
      <img 
        class="gallery__back-btn"
        :src="generalStore.getImageURL('icons/arrow-left--black.svg')"
        @click="() => {$router.go(-1)}"
      />
      <div class="gallery__title title--primary">Галлерея</div>
    </div>
    <div class="gallery__body">
      <div class="gallery__house-info" v-if="house">
        <div class="gallery__house-name">{{house.name}}</div>
        <div class="gallery__house-info-row">
          <span class="gallery__house-area">{{house.square}} м2</span> | <span class="gallery__house-prices">
            <span class="ruble-character">{{generalStore.formatNumber(prices.min)}}</span> 
            — 
            <span class="ruble-character">{{generalStore.formatNumber(prices.max)}}</span>
          </span>
        </div>
      </div>
      <div class="gallery__images">
        <img 
          class="gallery__image"
          v-for="(image, index) in house.images"
          :key="index"
          :src="image.url"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'house',
    'prices'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  mounted() {
    console.log(this.house)
  },
})
</script>

<style scoped>
.gallery {
}
.gallery__body {
  padding: 28px 0px 0px 0px;
}
.gallery__house-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0px 14px;
  margin-bottom: 15px;
}
.gallery__house-name {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.gallery__house-info-row {
  font-size: 12px;
  line-height: 140%;
}
.gallery__images {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

