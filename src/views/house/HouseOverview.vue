<template>
  <div class="house without-scrollbar">
    <div class="house__header">
      <div class="status-bar"></div>
      <div class="house__actions">
        <BackButton/>
        <div 
          class="house__live-btn"
          @click="openBottomPopup(
            'Live',
            `Застройщик разместит камеру и можно наблюдать за стройкой`
          )"
        >Live</div>
        <FavouritesButton/>
      </div>
    </div>
    <div 
      class="house__body"
    >
      <div class="house__summary">
          <Flicking
            class="house__header-carousel"
            v-if="house.images"
            :options="{
              threshold: 0,
              interruptable: false,
              align: 'center',
              bound: true,
              panelsPerView: 1,
              inputType: ['pointer', 'mouse', 'touch'],
            }"
            @will-change="(event) => {currentSlide = event.index}"
          >
            <div
              class="house__header-carousel-slide"
              v-for="(image, index) in house.images.filter(image => image)"
              :key="index"
            >
              <!-- @click="() => {$router.push(`/house/${$route.params.id}/gallery`)}" -->

              <div
                class="house__header-carousel-image"
                v-if="image"
                :style="{backgroundImage: `url(${image.url})`}" 
              ></div>
            </div>
          </Flicking>
          <div class="house__running-line">
            <span>
              {{house.name}} 
              {{house.square}} 
              м<span class="sup">2</span>
              за {{generalStore.formatNumber(prices.min)}}
              - {{generalStore.formatNumber(prices.max)}} ₽
            </span>
          </div>
          <Flicking
            class="house__header-information-cards"
            v-if="house.images"
            :options="{
              threshold: 0,
              interruptable: false,
              bound: true,
              inputType: ['pointer', 'mouse', 'touch'],
            }"
            @will-change="(event) => {currentSlide = event.index}"
          >
            <div 
              class="house__header-information-card house__header-builder-card"
              v-for="(sellerId, index) in Object.keys(builders)"
              :key="index"
            >
              <div class="house__header-builder-card-rate-zone">
                <div class="house__header-builder-card-rate-stars">
                  <img
                    class="review__star-icon--orange"
                    v-for="star in Math.floor(sellersRates.filter(seller => seller.sellerId == sellerId)[0].rate)"
                    :key="star"
                    :src="generalStore.getImageURL('icons/star--orange.svg')"
                  />
                  <img
                    class="review__star-icon--gray"
                    v-for="star in (5 - Math.floor(sellersRates.filter(seller => seller.sellerId == sellerId)[0].rate))"
                    :key="star"
                    :src="generalStore.getImageURL('icons/star--gray.svg')"
                  />
                </div>
                <div class="house__header-builder-card-rate">{{sellersRates.filter(seller => seller.sellerId == sellerId)[0].rate}}</div>
                
              </div>
              <div class="house__header-builder-card-image">
                <img 
                  :src="builders[sellerId][0].builder_info.image && builders[sellerId][0].builder_info.image.url"
                />
              </div>
              <div class="house__header-builder-card-name">{{builders[sellerId][0].builder_info.name}}</div>
            </div>
            
            <div 
              class="house__header-information-card house__header-country-card"
              :key="'country'"
            >
              <div class="house__header-country-card-title">Архитектура</div>
              <div 
                class="house__header-country-card-image"
                :style="{backgroundImage: `url(${country.image && country.image.url})`}"
              >
              
              </div>
              <div class="house__header-country-card-name">{{country.name}}</div>
            </div>
            
            <div 
              class="house__header-information-card house__header-genius-card"
              :key="'genius'"
            >
              <div class="house__header-genius-card-title">Genius - <br/> все инженеры <br/> и Росреестр <br/> за 0 ₽</div>
              <div 
                class="house__header-genius-card-description"
              >
                Успейте <br/> активировать <br/> до 25 августа
              </div>
              <img 
                class="house__header-genius-card-image"
                :src="generalStore.getImageURL('genius.svg')"
              />
            </div>
          </Flicking>
        </div>
      <div class="house__navigation-items without-scrollbar">
        <div
          class="house__navigation-item"
          v-for="button in navigationItems"
          :key="button.goTo"
          :class="
            button.goTo === subpage
              ? 'house__navigation-item--choosed'
              : 'house__navigation-item--unchoosed'
          "
          @click="subpage = button.goTo"
        >
          <span class="house__navigation-item-text">{{button.text}}</span>
          <!-- <span 
            class="house__navigation-item-quantity"
            v-if="button.text === 'Обсуждения'"
          >{{house.discussions && house.discussions.length}}</span> -->
          <span 
            class="house__navigation-item-quantity"
            v-show="button.quantity"
          >
            {{button.quantity}}
          </span>
        </div>
      </div>

      <div class="house__scrollable">
      <div class="house__general-features">
        <div class="house__house-name-and-genius-row">
          <div class="house__house-name">{{house.name || 'Загружается'}}</div>
          <img
            class="house__genius-feature"
            :src="generalStore.getImageURL('genius-feature.svg')"
            @click="$router.push('/menu/my-state')"
          />
        </div>
        
        <div class="house__area-and-price-row">
          <div class="house__area">{{house.square}} м<span class="sup">2</span></div> •
          <div class="house__price">
            <span>{{generalStore.formatNumber(prices.min)}}</span>
            –
            <span class="ruble-character">{{generalStore.formatNumber(prices.max)}}</span></div>
        </div>
        <!-- <div class="house__description">{{house.description}}</div> -->
      </div>
        <Prices
          v-show="subpage === 'prices'"
          :data="house"
          :sellers="builders"
          @openBottomPopup="(title, content) => openBottomPopup(title, content)"
        />
        <!-- <ConstructionStages
          v-show="subpage === 'construction-stages'"
          :data="house"
          :sellers="builders"
        /> -->
        <Genius
          v-show="subpage === 'genius'"
        />
        <Information
          v-show="subpage === 'information'"
          :data="house"
          :sellers="builders"
        />
        <Discussion
          v-show="subpage === 'discussion'"
          :data="house"
          :sellers="builders"
        />
        <Reviews
          v-show="subpage === 'reviews'"
          :data="house"
          :sellers="builders"
           @openBottomPopup="(title, content) => openBottomPopup(title, content)"
        />
    </div>
    </div>
    <div
      class="house__primary-button"
      v-show="!isApplicationHouse"
      @click="isHouseApplicationPopup = true"
    >Продолжить с экономией {{finalProfit ? generalStore.formatNumber(finalProfit).replace('-', '') : 0}} ₽</div>


    <BottomPopup 
      :isActive="isBottomPopup"
      @close="isBottomPopup = false"
    >
      <template v-slot:title><div class="house__popup-title">{{bottomPopupTitle}}</div></template>
      <div class="house__popup-paragraph">{{bottomPopupContent}}</div>
    </BottomPopup>
    <HouseApplicationPopup
      :cashback="cashback"
      :finalProfit="finalProfit"
      :isActive="isHouseApplicationPopup"
      :house="house"
      @close="isHouseApplicationPopup = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import { useGeneralStore } from '@/stores/general'
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import ContextMenu from "@/components/ContextMenu.vue";
import Prices from "./Prices.vue";
import ConstructionStages from "./ConstructionStages.vue";
import Information from "./Information.vue";
import Discussion from "./Discussion.vue";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';
import FavouritesButton from "@/components/FavouritesButton.vue";
import BackButton from "@/components/BackButton.vue";
import BottomPopup from "@/components/BottomPopup.vue";
import Genius from "./Genius.vue";
import Reviews from "./Reviews.vue";
import HouseApplicationPopup from "@/parts/HouseApplicationPopup.vue";

export default defineComponent({
  props: [
    'house',
    'prices',
    'builders',
    'sellers',
    'cashback'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    isExpandedHeader: false,
    clickCoordinates: {x: 0, y: 0},
    isContextMenu: false,
    height: 180,
    navigationItems: [
      {
        text: 'История цен',
        goTo: 'prices',
      },
      {
        text: 'Genius',
        goTo: 'genius',
      },
      {
        text: 'Информация',
        goTo: 'information',
      },
      {
        text: 'Обсуждения',
        goTo: 'discussion',
        quantity: 0,
      },
      {
        text: 'Отзывы',
        goTo: 'reviews',
        quantity: 0 as number,
      }
    ] as Array<{[key: string]: string}>,
    currentSlide: 0,
    subpage: 'prices',
    isBottomPopup: false,
    bottomPopupContent: '',
    bottomPopupTitle: '',
    finalProfit: 0,
    isHouseApplicationPopup: false,
    sellersRates: [] as Array<{}>,
  }),
  methods: {
    openContextMenu(event : any, id : string) {
      this.generalStore.choosedHouseId = Number(id)
      event.preventDefault()
      this.clickCoordinates = {
        x: event.x,
        y: event.y
      }
      this.$nextTick( () => {
        // @ts-ignore
        this.$refs.contextMenu.$el.focus()
      })
      this.isContextMenu = true
    },
    dragging(event) {
      if (event.y) {
        this.height = event.y
      }
    },
    dragEnd(event) {
      console.log('heh')
      if (event.y < 400) {
        this.height = 0
        this.isExpandedHeader = false
      }
      else {
        this.height = 1000
        this.isExpandedHeader = true
      }
    },
    switchState(event) {
      if (event.y > 400) {
        this.height = 0
        this.isExpandedHeader = false
      }
      else {
        this.height = 1000
        this.isExpandedHeader = true
      }
    },
    scroll(event) {
      this.isExpandedHeader = !this.isExpandedHeader
    },
    openBottomPopup(title: string, content: string) {
      this.isBottomPopup = true
      this.bottomPopupContent = content
      this.bottomPopupTitle = title
    },

    
  },
  computed: {
    windowWidth() {
      return window.innerWidth
    },
    isApplicationHouse() {
      if (
        this.generalStore.deviceState.applications_houses_id
        && this.$route.params.id === this.generalStore.deviceState.applications_houses_id.toString()
      ) {
        return true
      }
      return false
    },
    country() {
      return this.generalStore.countries.filter(country => country.id === this.house.country_id)[0]
    },

  },
  mounted() {
    if (this.house.discussions) {
      this.navigationItems.filter(item => item.goTo === 'discussion')[0].quantity = this.house.discussions.length
    }
  },

  watch: {
    'this.house.discussions': {
      handler(newValue) {
        if (this.house.discussions) {
          this.navigationItems.filter(item => item.goTo === 'discussion')[0].quantity = this.house.discussions.length
        }
      },
      deep: true
    },
    'cashback': {
      handler(newValue) {
        this.finalProfit = this.cashback.map(benefit => benefit.cashback).reduce((acc, curr) => acc += curr)
      },
      deep: true
    },
    sellers: {
      handler(newValue) {
        this.navigationItems.filter(item => item.goTo === 'reviews')[0].quantity = 0
        Object.keys(this.sellers).forEach( sellerId => {
          let seller = this.sellers[sellerId]
          let rateInfo = {sellerId, rate: 0}
          let rates = [] as Array<number>
          console.log(seller[0].builder_info)
          seller[0].builder_info.feedbacks.customers.forEach(review => {
            rates.push(review.estimation_customer)
          })
          if (rates.length) {
            rateInfo.rate = rates.reduce((acc, curr) => acc += curr) / rates.length
            this.navigationItems.filter(item => item.goTo === 'reviews')[0].quantity += rates.length
          }
          this.sellersRates.push(rateInfo)
        })
      },
      deep: true
    }
  },
  components: {
    Flicking,
    ContextMenu,
    Prices,
    ConstructionStages,
    Information,
    Discussion,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
    FavouritesButton,
    BackButton,
    BottomPopup,
    Genius,
    Reviews,
    HouseApplicationPopup,
  },
})

</script>

<style scoped>
.house {
  height: 100%;
  background: rgba(245, 245, 245, 0.94);
  transition: all 0.3s;
  overflow-y: auto;
  display: grid;
}
.house__header {
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;
  transition: all 1s ease;
  min-height: 100px;  
  max-height: calc(100% - 180px);
  background: rgba(245, 245, 245, 1);
  /* max-height: 100%; */
}

.house__summary {
  overflow: hidden;
  margin-left: -20px;
  margin-right: -20px;
  padding: 0px 20px;
}
.house__header-carousel {
  height: 384px;
  padding: 0px 20px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 24px;
}
.house__header-carousel-slide {
  height: 384px;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  margin-right: 8px;
}
.house__header-carousel-image {
  width: 100%;
  height: 384px;
  background-position: center;
  background-size: cover;
}
.house__running-line {
  width: min-content;
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #090909;
  white-space: nowrap;
  animation: running-line 10s linear infinite;
  margin-bottom: 40px;
  position: relative;
}
@keyframes running-line {
  0% {
    transform: translateX(calc(100% + 20px));
  }
  100% {
    transform: translateX(calc(-100% - 20px));
  }
}
.house__header-information-cards {
  margin-left: -20px;
  margin-right: -20px;
  padding: 0px 20px;
  margin-bottom: 48px;
}
.house__header-information-card {
  width: 167px;
  height: 257px;
  border-radius: 16px;
  padding: 16px;
  margin-right: 1px;
}
.house__header-builder-card, .house__header-country-card {
  background: #FFFFFF;
  display: grid;
  grid-template-rows: min-content auto min-content;
  gap: 16px;
  font-weight: 750;
  font-size: 14px;
  line-height: 130%;
  color: #090909;
}
.house__header-builder-card-rate-zone {
  display: flex;
  align-items: center;
}
.house__header-builder-card-rate-stars {
  display: grid;
  grid-template-columns: repeat(5, 16px);
  gap: 4px;
}
.house__header-builder-card-rate {
  padding-top: 1px;
  margin-left: 8px;
}
.house__header-builder-card-image {
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
} 
.house__header-builder-card-image img {
  max-height: 80px;
  max-width: 80px;
}
.house__header-country-card-image {
  height: 80px;
  width: 80px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  align-self: flex-end;
}
.house__header-genius-card {
  background: #090909;
  display: grid;
  grid-template-rows: min-content min-content auto;
}
.house__header-genius-card-title {
  font-weight: 750;
  font-size: 14px;
  line-height: 130%;
  color: #F9F9F9;
  margin-bottom: 20px;
}
.house__header-genius-card-description {
  font-weight: 750;
  font-size: 10px;
  line-height: 120%;
  color: #E0E0E0;
}
.house__header-genius-card-image {
  align-self: flex-end;
}
.house__collapsed-header {
  height: 100px;
  padding: 16px 20px;
}
.house__gallery-items {
  margin-left: -20px;
  margin-right: -20px;
  padding: 0px 20px;
  display: grid;
  gap: 8px;
  overflow-x: auto;
  grid-auto-flow: column;
  justify-content: start;
}
.house__gallery-item {
  height: 68px;
  width: 68px;
  border-radius: 12px;
  overflow: hidden;
}
.house__gallery-image {
  background-position: center;
  background-size: cover;
  height: 100%;
}


.house__actions {
  display: grid;
  grid-template-columns: auto 60px 32px;
  align-items: center;
  padding: 0px 9px;
  gap: 8px;
}
.house__live-btn {
  width: 60px;
  height: 24px;
  background: #FFFFFF;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.house__body {
  position: relative;
  border-radius: 16px 16px 0px 0px;
  padding: 100px 20px 0px 20px;
  width: 100%;
  z-index: 10;
  max-height: calc(100% - 180px);
  display: grid;
  grid-template-rows: repeat(2, min-content) 1fr;
  height: 100%;
  max-width: 100%;
}
.house__primary-button {
  position: fixed;
  bottom: 40px;
  left: 20px;
  background: #090909;
  border-radius: 60px;
  width: calc(100% - 2 * 20px);
  z-index: 20;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 750;
  font-size: 14px;
  line-height: 120%;
  color: #F9F9F9;
}
.house__scrollable {
  max-width: 100%;
  height: 100%;
  padding-top: calc(48px - 16px);
  padding-bottom: calc(40px + 49px + 48px);
}
.house__general-features {
  margin-bottom: 30px;
}
.house__house-name-and-genius-row {
  display: flex;
  margin-bottom: 4px;
  gap: 4px;
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #090909;
}
.house__genius-feature {
  height: 28px;
  position: relative;
  margin-top: -12px;
}
.house__area-and-price-row {
  height: 23px;
  line-height: 23px;
  font-size: 18px;
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #6A6A6A;
}
.house__area-and-price-row > div {
  display: inline-block;
}
.house__area-and-price-row sup {
  font-size: 12px;
}
.house__navigation-items {
  height: 32px;
  margin: 0px -14px;
  padding: 0px 14px;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 32px;
  overflow: auto;
  gap: 10px;
  margin-bottom: 16px;
  position: sticky;
  top: 99px;
  z-index: 100;
  background: rgba(245, 245, 245, 1);
}
.house__navigation-item {
  height: 32px;
  white-space: nowrap;
  padding: 0px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  transition: .4s all;
}
.house__navigation-item-quantity {
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background: #F9F9F9;
  font-weight: 750;
  font-size: 10px;
  line-height: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  margin-left: 8px;
  padding-top: 1px;
}
.house__navigation-item--unchoosed {
  color: #090909;
  background: #F9F9F9;
}
.house__navigation-item--choosed {
  color: #F9F9F9;
  background: #080808;
}
.house__subpages {
  max-width: 100%;
}
</style>

<style>
.house__popup-title {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
}
.house__popup-paragraph {
  margin-top: 12px;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #2D2D2D;
}
</style>