<template>
  <div class="home-section__carousel">
    <Flicking 
      :options="{
        align: {camera: '20', panel: '0'},
        threshold: 0,
        inputType: ['pointer', 'mouse', 'touch'],
      }"
      @will-change="(event) => {currentIndex = event.index}"
    >
      <div 
        class="services-card"
        :style="{backgroundImage: `url(${generalStore.getImageURL('features-cards/' + card.background + '.png')})`}"
        v-for="(card, index) of cards"
        :key="index"
      >
        <div class="services-card__top-content">
          <div 
            class="services-card__description"
            v-html="card.description"
          ></div>
          <div 
            class="services-card__price"
            v-show="card.price"
          >{{card.price}}</div>
          <div class="services-card__badge">{{card.badge}}</div>
        </div>
        <div 
          class="services-card__details-btn"
          @click="appState.isServiceApplicationPopup = true"
        >Отправить заявку</div>
      </div>
    </Flicking>
    <Pagination 
      :items="cards.length"
      :currentItem="currentIndex"
    />
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import CarouselPagination from "@/components/CarouselPagination.vue";
import { useAppState } from "@/stores/appState";

export default defineComponent({
  data: () => ({
    generalStore: useStore(),
    appState: useAppState(),
    cards: [
      {
        description: 'Проверьте участок перед покупкой',
        goTo: '/menu/my-state',
        background: 'trees-and-field',
        badge: 'Кэшбек 100%',
        price: '5 000 ₽'
      },
      {
        description: 'Получите любую ИЖС услугу с ценой от двух компаний',
        goTo: '/menu/my-state',
        background: 'builder',
        badge: 'до 100% кэшбека',
      },
    ],
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
.services-card {
  width: 335px;
  height: 338px;
  border-radius: 24px;
  margin-right: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.services-card__description {
  height: 72px;
  font-style: normal;
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #F9F9F9;
  margin-bottom: 40px;
}
.services-card__price {
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #F9F9F9;
  margin-bottom: 4px;
}
.services-card__badge {
  padding: 6px 12px;
  background: rgba(249, 249, 249, 0.2);
  backdrop-filter: blur(44px);
  border-radius: 60px;
  width: min-content;
  white-space: nowrap;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #F9F9F9;
}
.services-card__details-btn {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white-text);
  border-radius: 60px;
  font-weight: 750;
  font-size: 14px;
  line-height: 140%;
  color: #2D2D2D;
}

</style>