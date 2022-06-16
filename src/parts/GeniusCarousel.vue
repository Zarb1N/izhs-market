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
        class="genius-card"
        :style="{background: card.color}"
        v-for="(card, index) of cards"
        :key="index"
      >
        <div class="genius-card__top-content">
          <div 
            class="genius-card__description"
            v-html="card.description"
          ></div>
          <div class="genius-card__price">
            <svg width="76" height="73" viewBox="0 0 76 73" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.216 70.536C25.264 70.536 19.984 69.16 15.376 66.408C10.832 63.656 7.248 59.656 4.624 54.408C2.064 49.16 0.784 42.824 0.784 35.4C0.784 27.976 2.064 21.64 4.624 16.392C7.248 11.144 10.832 7.144 15.376 4.392C19.984 1.64 25.264 0.263998 31.216 0.263998C37.168 0.263998 42.416 1.64 46.96 4.392C51.568 7.144 55.152 11.144 57.712 16.392C60.336 21.64 61.648 27.976 61.648 35.4C61.648 42.824 60.336 49.16 57.712 54.408C55.152 59.656 51.568 63.656 46.96 66.408C42.416 69.16 37.168 70.536 31.216 70.536ZM31.216 52.392C32.688 52.392 34 51.88 35.152 50.856C36.304 49.832 37.2 48.072 37.84 45.576C38.544 43.08 38.896 39.688 38.896 35.4C38.896 31.048 38.544 27.656 37.84 25.224C37.2 22.728 36.304 20.968 35.152 19.944C34 18.92 32.688 18.408 31.216 18.408C29.744 18.408 28.432 18.92 27.28 19.944C26.128 20.968 25.2 22.728 24.496 25.224C23.856 27.656 23.536 31.048 23.536 35.4C23.536 39.688 23.856 43.08 24.496 45.576C25.2 48.072 26.128 49.832 27.28 50.856C28.432 51.88 29.744 52.392 31.216 52.392ZM71.1568 69.16C70.3994 69.16 69.7701 69 69.2688 68.68C68.7781 68.3493 68.4154 67.8533 68.1808 67.192C67.9461 66.52 67.8288 65.6667 67.8288 64.632C67.8288 63.576 67.9354 62.7173 68.1488 62.056C68.3728 61.384 68.7301 60.888 69.2208 60.568C69.7114 60.248 70.3568 60.088 71.1568 60.088C71.9248 60.088 72.6288 60.2747 73.2688 60.648C73.9088 61.0107 74.4208 61.5333 74.8048 62.216C75.1888 62.888 75.3808 63.6933 75.3808 64.632C75.3808 65.5707 75.1888 66.3813 74.8048 67.064C74.4208 67.736 73.9088 68.2533 73.2688 68.616C72.6288 68.9787 71.9248 69.16 71.1568 69.16ZM65.3168 72.104V60.248H68.7568V61.432L68.7728 64.632L68.9328 67.832V72.104H65.3168ZM70.2928 66.344C70.5594 66.344 70.7994 66.28 71.0128 66.152C71.2261 66.024 71.3968 65.832 71.5248 65.576C71.6528 65.32 71.7168 65.0053 71.7168 64.632C71.7168 64.248 71.6528 63.928 71.5248 63.672C71.3968 63.416 71.2261 63.224 71.0128 63.096C70.7994 62.968 70.5594 62.904 70.2928 62.904C70.0261 62.904 69.7861 62.968 69.5728 63.096C69.3594 63.224 69.1888 63.416 69.0608 63.672C68.9328 63.928 68.8688 64.248 68.8688 64.632C68.8688 65.0053 68.9328 65.32 69.0608 65.576C69.1888 65.832 69.3594 66.024 69.5728 66.152C69.7861 66.28 70.0261 66.344 70.2928 66.344Z" fill="#E0E0E0"/>
            </svg>
          </div>
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
        description: 'Занимайтесь семьей <br/> и делами, пока <br/> строится дом вашей <br/> мечты',
        goTo: '/menu/my-state',
        color: '#1B1B1B'
      },
      {
        description: 'Росреестр и все <br/> инженеры в одном <br/> окне',
        goTo: '/menu/my-state',
        color: '#5337FF'
      },
      {
        description: 'Успейте сохранить <br/> 218 000 Р и 380 часов - <br/> активируйте Genius за <br/> 0 Р',
        goTo: '/menu/my-state',
        color: '#8A41FD'
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
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: var(--white-text);
  margin-bottom: 4px;
}
.genius-card__price {
  display: flex;
  justify-content: center;
}
.genius-card__details-btn {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white-text);
  border-radius: 60px;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  color: var(--dark-text);
}

</style>