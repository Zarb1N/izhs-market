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
        class="genius-card"
        :style="{backgroundImage: `url(${generalStore.getImageURL('features-cards/' + card.background + '.png')})`}"
        v-for="(card, index) of cards"
        :key="index"
      >
        <div class="genius-card__top-content">
          <div
            class="genius-card__description"
            v-html="card.description"
          ></div>
          <div class="genius-card__price">0 ₽</div>
        </div>
        <div
          class="genius-card__details-btn"
          @click="$router.push(card.goTo)"
        >Подробнее</div>
      </div>
    </Flicking>
    <Pagination
      :items="cards.length"
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
    cards: [
      {
        description: 'Росреестр и все <br/> инженеры в одном <br/> окне',
        goTo: '/menu/my-state',
        background: 'zero--black',
      },
      {
        description: 'Успейте сохранить <br/> 218 000 Р и 380 часов - <br/> активируйте Genius за <br/> 0 Р',
        goTo: '/menu/my-state',
        background: 'zero--violet',
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
.genius-card {
  width: 335px;
  height: 338px;
  border-radius: 24px;
  margin-right: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.genius-card__description {
  height: 96px;
  font-style: normal;
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #F9F9F9;
  margin-bottom: 16px;
}
.genius-card__price {
  width: 44px;
  height: 28px;
  background: #F9F9F9;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #090909;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
}
.genius-card__details-btn {
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