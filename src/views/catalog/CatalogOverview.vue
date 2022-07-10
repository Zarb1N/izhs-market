<template>
  <IonContent>
    <div class="catalog-overview">
      <div class="catalog-overview__sets">
        <section class="catalog-overview__set">
          <div class="catalog-overview__sets-name">
            {{ projectOfWeekData?.budge_card }}
            <p class="catalog-overview__sets-count">{{ projectOfWeekData?.count_houses }}</p>
          </div>
          <h2 class="catalog-overview__sets-description">
            {{ projectOfWeekData?.budge }}
          </h2>
          <section class="slider">
            <Flicking :options="{
              align: { camera: '20', panel: '0' },
              threshold: 0,
              inputType: ['pointer', 'mouse', 'touch'],
            }">
              <div class="catalog-overview__sets-card" v-for="item in projectOfWeekData?.houses_in_sets" :key="item.id">
                <section class="catalog-overview__sets-card-header">
                  <h2 class="catalog-overview__sets-card-title">Проект недели</h2>
                  <p class="catalog-overview__sets-card-subtitle">{{ item.name }}</p>
                </section>
                <img class="catalog-overview__sets-card-background" :src="item.image_preview.url">
                <section class="catalog-overview__sets-card-footer">
                  <section class="catalog-overview__sets-card-icons">
                    <section class="catalog-overview__sets-card-builders-icons">
                      <img class="catalog-overview__sets-card-builders-icon" v-for="history in item.price_history"
                        :key="history.builders_id" :src="getBuilderIcon(history.builders_id)" alt="">
                    </section>
                    <img class="catalog-overview__sets-card-country-icon" v-if="item.country_id"
                      :src="getCountryIcon(item.country_id)" alt="">
                  </section>
                  <p>{{ item.square }} м2</p>
                  <p>{{ getPriceRange(item.price_history) }}</p>
                </section>
              </div>
            </Flicking>
          </section>
          <button class="button">Посмотреть подборку</button>
        </section>
        <section class="catalog-overview__set" v-for="selection in selections" :key="selection.id">
          <div class="catalog-overview__sets-name">
            {{ selection.budge_card }}
            <p class="catalog-overview__sets-count"></p>
          </div>
          <section class="catalog-overview__sets-description">
            <h2>{{ selection.budge }}</h2>
            <img src="@/assets/circle-avatar.png" alt="circle-avatar" />
          </section>
          <section class="slider">
            <Flicking :options="{
              align: { camera: '20', panel: '0' },
              threshold: 0,
              inputType: ['pointer', 'mouse', 'touch'],
            }">
              <div class="catalog-overview__sets-card catalog-overview__sets-card--small"
                v-for="item in selection.houses_in_sets" :key="item.id">
                <section class="catalog-overview__sets-card-header">
                  <p class="catalog-overview__sets-card-subtitle">{{ item.name }}</p>
                  <p class="catalog-overview__sets-card-count">{{ selection.count_houses }}</p>
                </section>
                <img class="catalog-overview__sets-card-background" :src="item.image_preview.url">
                <section class="catalog-overview__sets-card-footer">
                  <button class="button button--small">
                    Посмотреть
                  </button>
                </section>
              </div>
            </Flicking>
          </section>
        </section>
        <section class="catalog-overview__set" v-for="selection in otherSelections" :key="selection.id">
          <div class="catalog-overview__sets-name">
            {{ selection?.budge_card }}
            <p class="catalog-overview__sets-count">{{ selection?.count_houses }}</p>
          </div>
          <h2 class="catalog-overview__sets-description">
            {{ selection?.budge }}
          </h2>
          <section class="slider">
            <Flicking :options="{
              align: { camera: '20', panel: '0' },
              threshold: 0,
              inputType: ['pointer', 'mouse', 'touch'],
            }">
              <div class="catalog-overview__sets-card" v-for="item in selection?.houses_in_sets" :key="item.id">
                <section class="catalog-overview__sets-card-header">
                  <h2 class="catalog-overview__sets-card-title">Проект недели</h2>
                  <p class="catalog-overview__sets-card-subtitle">{{ item.name }}</p>
                </section>
                <img class="catalog-overview__sets-card-background" :src="item.image_preview.url">
                <section class="catalog-overview__sets-card-footer">
                  <section class="catalog-overview__sets-card-icons">
                    <section class="catalog-overview__sets-card-builders-icons">
                      <img class="catalog-overview__sets-card-builders-icon" v-for="history in item.price_history"
                        :key="history.builders_id" :src="getBuilderIcon(history.builders_id)" alt="">
                    </section>
                    <img class="catalog-overview__sets-card-country-icon" v-if="item.country_id"
                      :src="getCountryIcon(item.country_id)" alt="">
                  </section>
                  <p>{{ item.square }} м2</p>
                  <p>{{ getPriceRange(item.price_history) }}</p>
                </section>
              </div>
            </Flicking>
          </section>
          <button class="button">Посмотреть подборку</button>
        </section>
        <section class="catalog-overview__set">
          <div class="catalog-overview__sets-name">
            Архитектура
            <p class="catalog-overview__sets-count">{{ getArchitecture.length }}</p>
          </div>
          <section class="catalog-overview__sets-description">
            <h2>Следите за обновлениями — каждый день новые проекты со всего мира</h2>
          </section>
          <section class="slider">
            <Flicking :options="{
              align: { camera: '20', panel: '0' },
              threshold: 0,
              inputType: ['pointer', 'mouse', 'touch'],
            }">
              <div class="catalog-overview__sets-card" v-for="item in getArchitecture" :key="item.id">
                <section class="catalog-overview__sets-card-header">
                  <p class="catalog-overview__sets-card-subtitle">{{ item.style }}</p>
                </section>
                <img class="catalog-overview__sets-card-background" :src="item.image.url">
                <section class="catalog-overview__sets-card-footer">
                  <p class="catalog-overview__sets-card-house-count">{{ item.count_houses }}</p>
                  <button class="button button--small button--white">
                    Посмотреть
                  </button>
                </section>
              </div>
            </Flicking>
          </section>
        </section>
        <section class="catalog-overview__set">
          <div class="catalog-overview__sets-name">
            По странам мира
            <p class="catalog-overview__sets-count">{{ countries.length }}</p>
          </div>
          <section class="catalog-overview__sets-description">
            <h2>Приобщайтесь к работам архитекторов со всего мира</h2>
          </section>
          <section class="slider">
            <Flicking :options="{
              align: { camera: '20', panel: '0' },
              threshold: 0,
              inputType: ['pointer', 'mouse', 'touch'],
            }">
              <div class="catalog-overview__sets-card" v-for="item in countries" :key="item.id">
                <section class="catalog-overview__sets-card-header">
                  <p class="catalog-overview__sets-card-subtitle">{{ item.name }}</p>
                </section>
                <img class="catalog-overview__sets-card-background" :src="item.image.url">
                <section class="catalog-overview__sets-card-footer">
                  <section class="catalog-overview__sets-card-footer-content">
                    <p>{{ item.description }}</p>
                    <p class="catalog-overview__sets-card-house-count">{{ item.country_count }}</p>
                    <section class="catalog-overview__sets-card-country-icons">
                      <img class="catalog-overview__sets-card-country-icon" :src="item.image.url" alt="">
                    </section>
                  </section>
                  <button class="button button--small button--white">
                    Посмотреть
                  </button>
                </section>
              </div>
            </Flicking>
          </section>
        </section>
        <section class="catalog-overview__set">
          <div class="catalog-overview__sets-name">
            По застройщикам
            <p class="catalog-overview__sets-count">{{ builders.length }}</p>
          </div>
          <section class="catalog-overview__sets-description">
            <h2>Найти проект дома по застройщикам</h2>
          </section>
          <section class="slider">
            <Flicking :options="{
              align: { camera: '20', panel: '0' },
              threshold: 0,
              inputType: ['pointer', 'mouse', 'touch'],
            }">
              <div class="catalog-overview__sets-card" v-for="item in builders" :key="item.id">
                <section class="catalog-overview__sets-card-header">
                  <p class="catalog-overview__sets-card-subtitle">{{ item.name }}</p>
                </section>
                <img class="catalog-overview__sets-card-background" :src="item.image?.url">
                <section class="catalog-overview__sets-card-footer">
                  <section class="catalog-overview__sets-card-footer-content">
                    <p class="catalog-overview__sets-card-house-count">{{ item.builders_count }}</p>
                    <section class="catalog-overview__sets-card-country-icons">
                      <img class="catalog-overview__sets-card-country-icon" :src="item.image?.url" alt="">
                    </section>
                  </section>
                  <button class="button button--small button--white">
                    Посмотреть
                  </button>
                </section>
              </div>
            </Flicking>
          </section>
        </section>
        <section class="catalog-overview__set">
          <div class="catalog-overview__sets-name">
            Свежайшие без цен
            <p class="catalog-overview__sets-count">{{ allHouses.length }}</p>
          </div>
          <section class="catalog-overview__sets-description">
            <h2>Оставьте заявку и получите цены от двух застройщиков с высоким рейтингом</h2>
          </section>
          <section class="slider">
            <Flicking :options="{
              align: { camera: '20', panel: '0' },
              threshold: 0,
              inputType: ['pointer', 'mouse', 'touch'],
            }">
              <div class="catalog-overview__sets-card" v-for="item in allHouses" :key="item.id">
                <section class="catalog-overview__sets-card-header">
                  <p class="catalog-overview__sets-card-subtitle">{{ item.name }}</p>
                </section>
                <img class="catalog-overview__sets-card-background" :src="item.image_preview?.url">
                <section class="catalog-overview__sets-card-footer">
                  <section class="catalog-overview__sets-card-footer-content">
                    <section class="catalog-overview__sets-card-country-icons catalog-overview__sets-card-country-icons--no-margin">
                      <img class="catalog-overview__sets-card-country-icon" :src="item.image_preview?.url" alt="">
                    </section>
                  </section>
                </section>
              </div>
            </Flicking>
          </section>
        </section>
        <button class="button">Посмотреть подборку</button>
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
import type { IPriceHistory } from '@/types/IHouse';

const store = useGeneralStore()

const { fetchSets, fetchArchitecture } = store
const { getSets, countries, builders, isPreloaderShown, getArchitecture, allHouses } = storeToRefs(store)

onMounted(async () => {
  try {
    isPreloaderShown.value = true
    await Promise.all([fetchSets(), fetchArchitecture()])
  } catch (error) {
    console.error(error);
  } finally {
    isPreloaderShown.value = false
  }
})

const projectOfWeekData = computed(() => getSets.value.find(set => set.name === 'Проекты недели'))

const selections = computed(() => getSets.value.filter(el => !el.preview_main))

const otherSelections = computed(() => getSets.value.filter(el => el.preview_main && el.name !== 'Проекты недели'))

const getPriceRange = (arr: IPriceHistory[]) => {
  const prices = arr.map(e => e.price)
  const formatPrice = (prices: number[]) => ({ min: (Math.min(...prices) / 1000000).toFixed(1), max: (Math.max(...prices) / 1000000).toFixed(1) })
  const price = formatPrice(prices)
  return `${price.min} - ${price.max} млн ₽`
}

const getBuilderIcon = (builderId: number) => builders.value.find(el => el.id === builderId)?.image.url

const getCountryIcon = (countryId: number) => countries.value.find(el => el.id === countryId)?.image.url

</script>

<style scoped>
.catalog-overview__sets-card-footer-content {
  display: grid;
  width: 142px;
  gap: 8px;
}

.catalog-overview__sets-card-country-icons {
  padding: 3px 0;
  display: flex;
  margin-bottom: 20px;
}

.catalog-overview__sets-card-country-icons--no-margin {
  margin: 0;
}

.catalog-overview__sets-card-house-count {
  margin-bottom: 16px;
  font-size: 10px;
  line-height: 12px;
}

.catalog-overview__sets-card-count {
  font-weight: 750;
  font-size: 12px;
  line-height: 14px;
  color: #E0E0E0;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.catalog-overview__set:not(:last-of-type) {
  margin-bottom: 64px;
}

.button {
  background: #090909;
  font-family: 'Roboto Flex';
  border: 1px solid #090909;
  border-radius: 60px;
  width: 100%;
  padding: 15px;
  font-weight: 750;
  font-size: 14px;
  line-height: 20px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.button--small {
  padding: 12px 30px;
  font-size: 12px;
  line-height: 14px;
}

.button--white {
  background: #F9F9F9;
  border: 1px solid #F9F9F9;
  color: #090909;
}

.catalog-overview__sets-card-builders-icons {
  display: flex;
}

.catalog-overview__sets-card-builders-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.catalog-overview__sets-card-builders-icon:not(:first-of-type) {
  margin-left: -4px;
}

.catalog-overview__sets-card-country-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.catalog-overview__sets-card-icons {
  margin-bottom: 15px;
  display: flex;
  gap: 8px;
}

.catalog-overview__sets-card-footer {
  position: absolute;
  bottom: 24px;
  z-index: 1;
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  display: grid;
  gap: 4px;
}

.slider {
  margin: 0 -20px;
}

.catalog-overview__sets-card-header {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 8px;
}

.catalog-overview__sets-card-subtitle {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
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

.catalog-overview__sets-card--small {
  padding: 20px;
  height: 276px;
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
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.catalog-overview__sets-description>img {
  width: 32px;
  height: 32px;
}
</style>