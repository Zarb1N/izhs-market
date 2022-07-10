<template>
  <div class="home-section__carousel">
    <Flicking :options="{
      align: { camera: '20', panel: '0' },
      threshold: 0,
      inputType: ['pointer', 'mouse', 'touch'],
    }" @will-change="(event) => { currentIndex = event.index }">
      <div class="services-card" :style="{ backgroundColor: card.backgroundColor }" v-for="(card, index) of cards"
        :key="index">
        <img class="services-card__image" :src="generalStore.getImageURL('features-cards/' + card.background + '.png')">
        <div class="services-card__description" :style="{ color: card.textColor }" v-html="card.description"></div>
        <section class="services-card__price-badge" :style="card.badgeLayer">
          <div class="services-card__price" v-show="card.price">{{ card.price }}</div>
          <div class="services-card__badge" :style="card.badgeStyle" v-html="card.badge" />
        </section>
        <div class="services-card__details-btn" @click="appState.isServiceApplicationPopup = true">Отправить заявку
        </div>
      </div>
    </Flicking>
    <Pagination :items="cards.length" :currentItem="currentIndex" />
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import CarouselPagination from "@/components/CarouselPagination.vue";
import { useAppState } from "@/stores/appState";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
    appState: useAppState(),
    cards: [
      {
        description: 'Получите любую ИЖС услугу с ценой от двух компаний',
        textColor: '#090909',
        backgroundColor: '#D3C1DE',
        goTo: '/menu/my-state',
        background: 'pink-hair-girl',
        badge: 'до 100%<br> кэшбека',
        badgeStyle: { background: '#5437FF', borderRadius: '12px', width: '110px' },
      },
      {
        description: 'Проверьте участок перед покупкой',
        textColor: '#F9F9F9',
        backgroundColor: '#5437FF',
        goTo: '/menu/my-state',
        background: 'green-land',
        badge: 'Кэшбек 100%',
        badgeStyle: { background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(26px)', borderRadius: '24px', width: '121px' },
        badgeLayer: { zIndex: 2 },
        price: '5 000 ₽'
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
.services-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  border-radius: 24px;
}

.services-card__price-badge {
  position: absolute;
  bottom: 160px;
  left: 20px;
}

.services-card {
  position: relative;
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
  z-index: 2;
}

.services-card__price {
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 6px;
}

.services-card__badge {
  white-space: nowrap;
  padding: 6px 12px 7px;
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
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
  z-index: 2;
}
</style>