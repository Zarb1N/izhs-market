<template>
  <IonContent>
    <div class="catalog-overview">
      <div class="catalog-overview__sets">
        <div class="catalog-overview__sets-name">
          Проекты недели
          <p class="catalog-overview__sets-count">4</p>
        </div>
        <h2 class="catalog-overview__sets-description">
          На этой неделе ищите проект своей мечты в RED — дома с кэшбеком 500 000 ₽ на комплектацию
        </h2>
        <Flicking :options="{
          align: { camera: '20', panel: '0' },
          threshold: 0,
          inputType: ['pointer', 'mouse', 'touch'],
        }">
          <div class="catalog-overview__sets-card" v-for="item in projectOfWeekData" :key="item.id">
            <section class="catalog-overview__sets-card-header">
              <h2 class="catalog-overview__sets-card-title">Проект недели</h2>
              <p class="catalog-overview__sets-card-subtitle">{{ item.name }}</p>
            </section>
            <img class="catalog-overview__sets-card-background" :src="item.image_preview.url" alt="">
          </div>
        </Flicking>
      </div>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { IonContent } from '@ionic/vue';
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { useGeneralStore } from '@/stores/general';
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const store = useGeneralStore()

const { fetchSets } = store
const { getSets } = storeToRefs(store)

onMounted(async () => {
  await fetchSets()
})

const projectOfWeek = 'Проекты недели'

const projectOfWeekData = computed(() => getSets.value.find(set => set.name === projectOfWeek)?.houses_in_sets)

</script>

<style scoped>
.catalog-overview__sets-card-header {
  position: relative;
  z-index: 1;
}

.catalog-overview__sets-card-subtitle {
}

.catalog-overview__sets-card-title {
  padding: 4px 8px;
  background: #F9F9F9;
  border-radius: 60px;
  width: fit-content;
  font-weight: 750;
  font-size: 8px;
  line-height: 10px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.catalog-overview__sets-card-background {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  height: 100%;
}

.catalog-overview__sets-card {
  box-shadow: 8px 8px 24px rgba(202, 180, 168, 0.19);
  position: relative;
  border-radius: 18px;
  width: 189px;
  height: 344px;
  padding: 20px 20px 24px;
  margin: 24px 16px 24px 0;
  overflow: hidden;
}

.catalog-overview__sets-count {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-top: 12px;
}

.catalog-overview {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 68px 20px 20px 20px;

}

.catalog-overview__sets-name {
  font-weight: 950;
  font-size: 26px;
  line-height: 120%;
  color: #222127;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.catalog-overview__sets-description {
  font-weight: 750;
  font-size: 14px;
  line-height: 18px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}
</style>