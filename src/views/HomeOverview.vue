<template>
  <IonPage class="no-scroll">
    <IonContent class="without-scrollbar">
      <div class="home">
        <div class="home__status-bar status-bar"></div>
        <div class="home__top-actions-row">
          <div class="home__add-us-to-your-projects" @click="appState.isAddingProjectApplication = true">+ Добавьте нас
            в свой проект</div>
          <div class="home__fixed-action-buttons">
            <img class="home__add-btn" :src="generalStore.getImageURL('icons/dialog-cloud.svg')"
              @click="appState.isContactsPopup = true" />
            <FavouritesButton class="home__favourites-btn" />
          </div>
        </div>
        <div class="home__stories without-scrollbar">
          <StoryPreview v-for="(story, index) in general.allStories"
            :isUnread="generalStore.deviceState.stories_id && generalStore.deviceState.stories_id.indexOf(story.id) === -1"
            :data="story" :key="index" @click="$router.push(`/story/${story.id}`)" />
        </div>

        <div class="home__section home-section">
          <div class="home-section__header">
            <div class="main-title">Строительство<br> через приложение проходит быстрее<br> и легче</div>
            <div class="home-section__header-slot geo-pin" @click="appState.isRegionChoosing = true">
              <img src="@/assets/geo-icon.svg" />
            </div>
          </div>
          <Flicking class="flicking" :options="{
            align: { camera: '20', panel: '0' },
            threshold: 0,
            inputType: ['pointer', 'mouse', 'touch'],
          }">
            <div class="genius-card" :style="{ background: card.background_color }" v-for="(card, index) of mainSlides"
              :key="index">
              <div class="genius-card__top-content">
                <div :class="['genius-card__blur', { [card.content_postition]: Boolean(card.content_postition) }]"
                  :style="{ background: card.blur }">
                  <h2 v-if="card.title" class="genius-card__description">{{ card.title }}</h2>
                  <h3 v-if="card.subtitle" class="genius-card__subtitle">{{ card.subtitle }}</h3>
                </div>
                <img :src="generalStore.getImageURL(card.img)">
              </div>
            </div>
          </Flicking>
          <button class="button">
            <p class="emoji">🤔</p>Как это работает?
          </button>
        </div>

        <!-- <div class="home__section home-section" v-if="weekProjects">
          <div class="home-section__header">
            <div class="home-section__title">Проекты недели</div>
            <div class="home-section__header-slot">{{ weekProjects.houses_in_sets.length }}</div>
          </div>
          <div class="home-section__description" v-html="weekProjects.budge">
          </div>
          <div class="home-section__horizontal-scroll">
            <Product v-for="house in weekProjects.houses_in_sets.slice(0, 6)" :key="house.id" :data="house"
              :cardBudge="weekProjects.budge_card"
              :isFavorite="generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.indexOf(house.id) !== -1"
              style="width: 189px" @goToHouse="$router.push(`/house/${house.id}/overview`)" />
          </div>
          <div class="home-section__button"
            @click="(event) => { $router.push(`/catalog/custom-set/${weekProjects.id}`) }">Посмотреть подборку</div>
        </div>

        <div class="home__section home-section">
          <div class="home-section__header">
            <div class="home-section__title">Genius</div>
            <div class="home-section__header-slot"></div>
          </div>
          <div class="home-section__description">
            Занимайтесь семьей и делами, пока строится дом вашей мечты
          </div>
          <GeniusCarousel />
        </div> -->

        <div class="home__section home-section">
          <div class="home-section__header">
            <div class="home-section__title">Landscape</div>
            <div class="home-section__header-slot"></div>
          </div>
          <div class="home-section__description">
            Создайте европейскую красоту на вашем участке
          </div>
          <LandscapeCarousel />
        </div>

        <div class="home__section home-section">
          <div class="home-section__header">
            <div class="home-section__title">Сервисы</div>
            <div class="home-section__header-slot"></div>
          </div>
          <div class="home-section__description">
            Воспользуйтесь сервисами с кэшбеком до 100%
          </div>
          <ServicesCarousel />
        </div>

        <!-- <div class="home__section home-section" v-if="generalStore.viewedHouses.length">
          <div class="home-section__header">
            <div class="home-section__title">Вы смотрели</div>
            <div class="home-section__header-slot"></div>
          </div>
          <div class="home-section__description">
            Найдите проект в истории просмотров
          </div>
          <div class="home-section__horizontal-scroll">
            <Product v-for="house in generalStore.viewedHouses" :key="house.id" :data="house"
              :cardBudge="weekProjects.budge_card"
              :isFavorite="generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.indexOf(house.id) !== -1"
              style="width: 189px" @goToHouse="$router.push(`/house/${house.id}/overview`)" />
          </div>
        </div> -->
        <!-- <div class="home__section home-section">
          <div class="home-section__header">
            <div class="home-section__title">Подборки </div>
          </div>
          <div class="home-section__description"
            style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              Обновляет и курирует архитектор Екатерина Шувалова
            </div>
            <img class="home-section__person-image" src="@/assets/default-woman-3.png" />
          </div>
          <div class="home-section__horizontal-scroll">
            <SetSmallCard class="home-section__set-preview-small" v-for="set in generalStore.filters.compilations"
              :key="set.id" v-show="!set.preview_main && set.name !== 'Проекты недели'" :set="set"
              @openSetPage="(setId) => { $router.push(`/catalog/custom-set/${setId}`) }" />
          </div>
        </div> -->

        <!-- <div class="home__section home-section" v-for="(set, index) in generalStore.filters.compilations" :key="index"
          v-show="set.preview_main && set.houses_in_sets.length">
          <div class="home-section__header">
            <div class="home-section__title">{{ set.name }}</div>
            <div class="home-section__header-slot">{{ set.count_houses }}</div>
          </div>
          <div class="home-section__description">{{ set.budge }}</div>
          <div class="home-section__horizontal-scroll">
            <Product v-for="house in set.houses_in_sets.slice(0, 6)" :key="house.id" :data="house"
              :cardBudge="set.budge_card"
              :isFavorite="generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.indexOf(house.id) !== -1"
              style="width: 200px" @goToHouse="$router.push(`/house/${house.id}/overview`)" />
          </div>
          <div class="home-section__button" @click="(event) => { $router.push(`/catalog/custom-set/${set.id}`) }">
            Просмотреть подборку</div>
        </div>

        <div class="home__section home-section" v-if="generalStore.countries">
          <div class="home-section__header">
            <div class="home-section__title">По странам мира</div>
            <div class="home-section__header-slot"></div>
          </div>
          <div class="home-section__description">
            Приобщайтесь к работам архитекторов со всего мира
          </div>
          <div class="home-section__horizontal-scroll">
            <SetCard v-for="set in generalStore.countries" :key="set.id" :set="set" style="width: 200px"
              :iconPath="set.image && set.image.url" :isCoveredIcon="true" :title="set.name"
              :quantity="set.country_count" :description="set.description"
              :backgroundImagePath="set.image_preview && set.image_preview.url" v-show="set.country_count"
              @goToSetPage="(countryId) => { $router.push(`/catalog/countries-set/${countryId}`) }" />
          </div>
        </div>

        <div class="home__section home-section" v-if="generalStore.builders">
          <div class="home-section__header">
            <div class="home-section__title">По застройщикам</div>
            <div class="home-section__header-slot"></div>
          </div>
          <div class="home-section__description">
            Найти проект дома по застройщикам
          </div>
          <div class="home-section__horizontal-scroll">
            <SetCard v-for="set in generalStore.builders" :key="set.id" style="width: 200px"
              :iconPath="set.image && set.image.url" :title="set.name" :quantity="set.builders_count"
              :backgroundImagePath="set.image_preview && set.image_preview.url" :set="set" v-show="set.builders_count"
              @goToSetPage="(countryId) => { $router.push(`/catalog/builders-set/${countryId}`) }" />
          </div>
        </div>

        <div class="home__section home-section" v-if="housesWithoutPrices.length">
          <div class="home-section__header">
            <div class="home-section__title">Свежайшие без цен</div>
            <div class="home-section__header-slot">{{ housesWithoutPrices.length }}</div>
          </div>
          <div class="home-section__description">
            Оставьте заявку и получите цены от двух застройщиков с высоким рейтингом
          </div>
          <div class="home-section__horizontal-scroll">
            <Product v-for="house in housesWithoutPrices" :key="house.id" :data="house"
              :isFavorite="generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.indexOf(house.id) !== -1"
              style="width: 189px" />
          </div>
          <div class="home-section__button" @click="(event) => { $router.push(`/catalog/without-price`) }">Просмотреть
            подборку</div>
        </div> -->
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StoryPreview from '@/components/StoryPreview.vue'
import ProductPreview from '@/components/ProductPreview.vue'
import { useGeneralStore } from '@/stores/general'
import { StatusBar } from '@capacitor/status-bar';
import { IonContent, IonPage } from '@ionic/vue';
import FavouritesButton from '../components/FavouritesButton.vue'
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
// import MyIzsCarousel from '../parts/MyIzsCarousel.vue'
import GeniusCarousel from '../parts/GeniusCarousel.vue'
import SetCard from '@/components/SetCard.vue'
import { useAppState } from '@/stores/appState'
import LandscapeCarousel from '@/parts/LandscapeCarousel.vue'
import ServicesCarousel from '@/parts/ServicesCarousel.vue'
import SetSmallCard from '@/components/SetSmallCard.vue'

declare interface IHouse {
  readonly id: string | number
  [key: string]: string | number | object
}

export default defineComponent({
  name: 'HomeOverview',
  data: () => ({
    allHouses: [] as Array<IHouse>,
    selectedHouses: [] as Array<{ [key: string]: any }>,
    general: useGeneralStore(),
    generalStore: useGeneralStore(),
    appState: useAppState(),
    choosedStyle: {} as { [key: string]: any },
    allStories: [] as Array<{ [key: string]: string }>,
    partnersHouses: [] as Array<{ [key: string]: string }>,
    compilations: [] as Array<{ [key: string]: string }>,
    isChoosingRegion: false,
    isContextMenu: false,
    clickCoordinates: { x: 0, y: 0 },
    mainSlides: [
      {
        title: 'Genius',
        subtitle: 'Начать стройку можно с участком или без него',
        button_text: 'Активировать',
        background_color: '#090909',
        blur: 'linear-gradient(180deg, rgba(9, 9, 9, 0) 44.79%, rgba(9, 9, 9, 0.9) 100%)',
        content_postition: 'bottom',
        img: 'genius-background.png'
      },
      {
        title: 'Каталог домов',
        button_text: 'Смотреть все',
        background_color: '#883FFF',
        content_postition: 'top',
        img: 'catalog-background.png'
      },
    ],
    isWdigetSelectingPopup: false,

  }),
  methods: {
    async getPartnersHouses() {
      const res = await fetch(`${this.general.server}/partners`)
      const data = await res.json()
      this.partnersHouses = data
    },
    chooseStyle(style: { [key: string]: any }) {
      this.choosedStyle = style
      if (style.id === 0) {
        this.selectedHouses = this.general.allHouses
      }
      else {
        this.selectedHouses = this.general.allHouses.filter((house: any) => {
          return style.id === house.architecture_id
        })
      }
    },
    openContextMenu(event: any, id: string) {
      this.generalStore.choosedHouseId = Number(id)
      event.preventDefault()
      this.clickCoordinates = {
        x: event.clientX,
        y: event.clientY
      }
      this.$nextTick(() => {
        // @ts-ignore
        this.$refs.contextMenu.$el.focus()
      })
      this.isContextMenu = true
    }
  },
  computed: {
    windowWidth() {
      return window.innerWidth
    },
    weekProjects() {
      if (this.generalStore.filters.compilations.filter(item => item.name === 'Проекты недели').length !== 0) {
        return this.generalStore.filters.compilations.filter(item => item.name === 'Проекты недели')[0]
      }
      return false
    },
    housesWithoutPrices() {
      const houses: Array<{}> = []
      this.generalStore.allHouses.forEach(house => {
        if (!house.price_history) {
          houses.push(house)
        }
        else if (house.price_history.reduce((acc, curr) => acc.price + curr.price) === 0) {
          houses.push(house)
        }
      })
      this.generalStore.housesWithoutPrice = houses
      return houses
    }
  },
  created() {
    this.chooseStyle({ id: 0, style: 'Все' })
  },
  watch: {
    'general.allHouses': {
      handler() {
        this.chooseStyle({ id: 0, style: 'Все' })
      },
      deep: true
    }
  },
  mounted() {
    // StatusBar.setBackgroundColor({color: '#227164'})
    // StatusBar.setOverlaysWebView({overlay: true})
    StatusBar.show()
  },
  components: {
    StoryPreview,
    Product: ProductPreview,
    IonPage,
    IonContent,
    FavouritesButton,
    // MyIzsCarousel,
    Flicking,
    GeniusCarousel,
    SetCard,
    LandscapeCarousel,
    ServicesCarousel,
    SetSmallCard,
  }
})
</script>

<style scoped>
.main-title {
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.emoji {
  font-size: 18px;
  line-height: 25px;
  margin-right: 8px;
}

.button {
  background: #090909;
  font-family: 'Roboto Flex';
  border: 1px solid #090909;
  border-radius: 60px;
  width: 100%;
  padding: 13px 0 12px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  display: flex;
  align-items: center;
  justify-content: center;
}

.genius-card__subtitle {
  font-weight: 750;
  font-size: 12px;
  line-height: 14px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.genius-card__description {
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 8px;
}

.flicking {
  margin: 0 -20px;
}

.genius-card__top-content {
  position: relative;
}

.genius-card__blur.top {
  place-content: flex-start;
}

.genius-card__blur.bottom {
  place-content: flex-end;
}

.genius-card__blur {
  position: absolute;
  padding: 20px 20px 24px;
  display: grid;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.genius-card img {
  width: 100%;
}

.genius-card {
  width: 189px;
  height: 322px;
  display: flex;
  border-radius: 18px;
  box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  margin: 24px 16px 24px 0;
}

.without-scrollbar::-webkit-scrollbar {
  display: none;
}

/* */
.home {
  background: #F5F5F5;
  backdrop-filter: blur(26px);
  padding: 0px 20px;
}

.home__add-us-to-your-projects {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 6px 12px 7px;
}

.home__top-actions-row {
  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: space-between;
  align-items: center;
}

.home__add-us-to-your-projects {
  white-space: nowrap;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  text-align: center;
  color: #090909;
}

.home__fixed-action-buttons {
  right: 20px;
  position: fixed;
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 32px);
  grid-template-rows: 32px;
  height: 32px;
  gap: 8px;
  z-index: 10;
}

.home__stories {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 96px;
  overflow-x: auto;
  gap: 7px;
  margin-top: 16px;
  margin-bottom: 36px;
}

.home__section {
  margin-bottom: 64px;
}

.home-section__header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.home-section__title {
  font-weight: 950;
  font-size: 26px;
  line-height: 31px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 16px;
}

.home-section__header-slot {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
}

.home-section__description {
  margin-bottom: 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
}

.home-section__button {
  background: #090909;
  width: 100%;
  padding: 16px;
  font-weight: 750;
  font-size: 14px;
  line-height: 140%;
  color: #F9F9F9;
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  border-radius: 60px;
}

.home-section__carousel {
  margin-left: -20px;
  margin-right: -20px;
}

/* ---- */
.my-izs__card {
  height: 322px;
  width: 182px;
  border-radius: 16px;
  box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-right: 16px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.my-izs__card:first-child {
  margin-left: 20px;
}

.my-izs__button {
  width: 100%;
  height: 40px;
  background: var(--white-text);
  border-radius: 20px;
  display: grid;
  align-items: center;
  justify-content: center;
  color: var(--dark-text);
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
}

.my-izs__card--my-state {
  background: #121212;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--white-text);
}

.my-izs__card--my-state div:nth-child(1) {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
}

.my-izs__card--my-state>div:nth-child(3)>div:nth-child(1) {
  display: grid;
  grid-template-columns: auto min-content;
  margin-bottom: 8px;

}

.my-izs__card--my-state>div:nth-child(3)>div:nth-child(1)>div:nth-child(1) {
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
}

.my-izs__card--my-state div:nth-child(3) div:nth-child(2) {
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  color: var(--lightgray-text);
}

.my-izs__card--construction,
.my-izs__card--landscape {
  background: #787878;
}

.my-izs__card--construction>div:nth-child(1),
.my-izs__card--landscape>div:nth-child(1) {
  display: flex;
  flex-direction: column;
}

.my-izs__card--construction>div:nth-child(1)>div:nth-child(1),
.my-izs__card--landscape>div:nth-child(1)>div:nth-child(1) {
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: var(--white-text);
  margin-bottom: 8px;
}

.my-izs__card--construction div:nth-child(1) div:nth-child(2),
.my-izs__card--landscape div:nth-child(1) div:nth-child(2) {
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  color: var(--lightgray-text);
  margin-bottom: 34px;
}

.my-izs__card--construction div:nth-child(1) img,
.my-izs__card--landscape div:nth-child(1) img {
  align-self: center;
  height: 94px;
  width: 94px;
}

.home-section__houses-carousel {
  margin: 0 -20px;
}

.home-section__houses-carousel-item {
  margin-right: 16px;
  width: 189px;
}

.geo-pin {
  width: 100%;
  max-width: 40px;
  height: 28px;
  background: #FFFFFF;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-section__horizontal-scroll {
  margin-left: -20px;
  margin-right: -20px;
  padding: 0px 20px;
  display: grid;
  overflow-x: auto;
  grid-auto-flow: column;
  gap: 16px;
}
</style>