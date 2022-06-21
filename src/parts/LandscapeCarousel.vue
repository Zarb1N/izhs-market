<template>
  <div class="home-section__carousel">
    <Flicking 
      :options="{
        align: {camera: '20', panel: '0'}, 
        threshold: 0,
      }"
      @will-change="(event) => {currentIndex = event.index}"
    >
      <div 
        class="landscape-card"
      >
        <div class="landscape-card__top-content">
          <div class="landscape-card__budge">Неоклассический под ключ</div>
          <div class="landscape-card__description">Привезем и сделаем - газон, мебель, перголу, освещение </div>
        </div>
        <img 
          class="lanscape-card__bottom-content"
          src="@/assets/temporary/laterns.svg"
        />

      </div>
      <div 
        class="landscape-card"
      >
        <div class="landscape-card__top-content">
          <div class="landscape-card__budge">Неоклассический под ключ</div>
          <div class="landscape-card__description">Отдыхайте под солнечным небом, а в дождливую погоду укройтесь тентом</div>
          <div class="landscape-card__price">1 267 000 ₽</div>
          <div class="landscape-card__hint">Для ровного участка в 10 соток</div>
        </div>
        <div class="lanscape-card__bottom-content">
          <div 
            class="landscape-card__details-btn"
            @click="$router.push('/landscape')"
          >
            <div>Загрузите фото участка</div>
            <img src="@/assets/icons/loading-3-quarters-outlined.svg"/>
          </div>
        </div> 
        
      </div>
    </Flicking>
    <Pagination 
      :items="2"
      :currentItem="currentIndex"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { useGeneralStore } from "@/stores/general";
import CarouselPagination from "@/components/CarouselPagination.vue";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
    currentIndex: 0,
  }),
  components: {
    Flicking,
    Pagination: CarouselPagination,
  },
  methods: {
  }
})
</script>

<style scoped>
.landscape-card {
  width: 335px;
  height: 338px;
  border-radius: 24px;
  margin-right: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.landscape-card:first-child {
  background: #883FFF;
}
.landscape-card:last-child {
  background: #5437FF;
}
.landscape-card__budge {
  width: min-content;
  white-space: nowrap;
  padding: 4px 8px;
  background: #090909;
  border-radius: 60px;
  color: #F9F9F9;
  font-weight: 750;
  font-size: 8px;
  line-height: 120%;
  margin-bottom: 12px;
}
.landscape-card__description {
  font-weight: 750;
  font-size: 14px;
  line-height: 130%;
  color: #E0E0E0;
}
.landscape-card__price {
  margin-top: 48px;
  margin-bottom: 4px;
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #F9F9F9;
}
.landscape-card__hint {
  font-weight: 750;
  font-size: 14px;
  line-height: 130%;
  color: #E0E0E0;
}
.landscape-card__details-btn {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--white-text);
  border-radius: 60px;
  font-weight: 750;
  font-size: 14px;
  line-height: 140%;
  color: #2D2D2D;
}

</style>