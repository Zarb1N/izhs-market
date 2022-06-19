<template>
  <div class="house without-scrollbar">
      <div class="house__header">
        <div class="house__header-overlay-wrapper">
          <!-- <div class="house__header-overlay">
          <div
            class="house__header-back-btn"
            @click="$router.go(-1)"
          >
            <img :src="generalStore.getImageURL('icons/arrow-left--black.svg')"/>
          </div>
          <div class="house__header-overlay-right-group">
            <div class="house__header-open-stream-btn">
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#222127"/>
              </svg>
              <div>Live</div>
            </div>
            <div class="house__header-carousel-pagination">{{currentSlide + 1}}/{{(house && house.images) ? house.images.length : 0}}</div>
            <div
              class="house__header-additional-actions-btn"
              @click="(event) => {openContextMenu(event, $route.params.id.toString())}"
            >
              <img :src="generalStore.getImageURL('icons/vertical-three-dots--black.svg')"/>
            </div>
          </div>
        </div> -->
        </div>
        <div class="house__header-carousel">
          <Flicking
            v-if="house.images"
            :options="{
              circular: true,
              threshold: 0,
              interruptable: false,
            }"
            @will-change="(event) => {currentSlide = event.index}"
          >
            <div
              class="house__header-carousel-slide"
              v-for="index in Array(house.images.length).keys()"
              :key="index"
              @click="() => {$router.push(`/house/${$route.params.id}/gallery`)}"
            >
              <img
                class="house__header-carousel-image"
                :src="house.images[index].url"
              >
            </div>
          </Flicking>
        </div>
    </div>


    <div class="house__body">
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
        >{{button.text}}</div>
      </div>

      <div class="house__general-features">
        <div class="house__house-name-and-genius-row">
          <div class="house__house-name title--primary">{{house.name || 'Загружается'}}</div>
          <img
            class="house__genius-feature"
            :src="generalStore.getImageURL('genius-feature.svg')"
            @click="$router.push('/menu/my-state')"
          />
        </div>
        <div class="house__area-and-price-row">
          <div class="house__area">{{house.square}} м2</div> |
          <div class="house__price">
            <span class="ruble-character">{{generalStore.formatNumber(prices.min)}}</span>
            —
            <span class="ruble-character">{{generalStore.formatNumber(prices.max)}}</span></div>
        </div>
      </div>

      <Prices
        v-show="subpage === 'prices'"
        :data="house"
        :sellers="builders"
      />
      <ConstructionStages
        v-show="subpage === 'construction-stages'"
        :data="house"
        :sellers="builders"
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
    </div>
    <div
      class="house__primary-button"
      v-show="!isApplicationHouse"
      @click="$router.push(`/house/${$route.params.id}/application`)"
    >Продолжить</div>
    <ContextMenu
      tabindex="0"
      ref="contextMenu"
      :style="{
        'top': `${clickCoordinates.y}px`,
        'left': `${clickCoordinates.x}px`,
        'transform': `translate(${clickCoordinates.x < windowWidth / 2 ? '0' : '-100%'})`
      }"
      v-show="isContextMenu"
      :options="
        generalStore.deviceState.favourites_houses_id.indexOf(Number($route.params.id)) === -1
          ? generalStore.housePreviewContextActions
          : generalStore.favouriteHousePreviewContextActions
      "
      @blur="isContextMenu = false"
      @close="isContextMenu = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from '@/stores/general'
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import ContextMenu from "@/components/ContextMenu.vue";
import Prices from "./Prices.vue";
import ConstructionStages from "./ConstructionStages.vue";
import Information from "./Information.vue";
import Discussion from "./Discussion.vue";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';


export default defineComponent({
  props: [
    'house',
    'prices',
    'builders'
  ],
  data: () => ({
    generalStore: useStore(),
    clickCoordinates: {x: 0, y: 0},
    isContextMenu: false,
    navigationItems: [
      {
        text: 'История цен',
        goTo: 'prices',
      },
      {
        text: 'Этапы проекта',
        goTo: 'construction-stages',
      },
      {
        text: 'Информация',
        goTo: 'information',
      },
      {
        text: 'Обсуждения',
        goTo: 'discussion',
      },
    ] as Array<{[key: string]: string}>,
    currentSlide: 0,
    subpage: 'prices'
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
    }
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
  },
})

</script>

<style scoped>
.house {
  height: 100%;
  display: grid;
  grid-template-rows: calc(225px + 20px) auto;
  grid-template-columns: 100%;
  overflow: auto;
}
.house__header {
  height: calc(225px + 20px);
  background: lightblue;
  width: 100%;
}
.house__header-carousel {
  height: 100%;
  width: 100%;
  z-index: -1;
  padding: 20px;
}
.house__header-carousel-slide {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
}
.house__header-carousel-image {
  height: calc(225px + 20px);
  width: 100%;
}
.house__header-overlay-wrapper {
  height: 0px;
  position: relative;
  z-index: 2;
}
.house__header-overlay {
  padding: 14px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.house__header-overlay-right-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
.house__header-back-btn, .house__header-carousel-pagination, .house__header-additional-actions-btn {
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 13px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 10px;
}
.house__header-back-btn img {
  height: 22px;
  width: 22px;
}
.house__header-open-stream-btn {
  width: 47px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 13px;
  text-transform: uppercase;
  gap: 2px;
}
.house__header-open-stream-btn > div {
  margin-bottom: -2px;

}
.house__body {
  height: 100%;
  background: #FFFFFF;
  border-radius: 20px 20px 0px 0px;
  position: relative;
  margin-top: -20px;
  padding: 30px 14px calc(56px + 14px) 14px;
  width: 100%;
  z-index: 1;
}
.house__primary-button {
  position: fixed;
  bottom: 0px;
  z-index: 10;
  width: 100%;
  min-height: 56px;
  background: var(--green);
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
}
.house__general-features {
  margin-bottom: 30px;
}
.house__house-name-and-genius-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  min-height: 31px;
}
.house__area-and-price-row {
  height: 23px;
  line-height: 23px;
  font-size: 18px;
}
.house__area-and-price-row > div {
  display: inline-block;
}
.house__area-and-price-row sup {
  font-size: 12px;
}
.house__navigation-items {
  margin: 0px -14px;
  padding: 0px 14px;
  display: flex;
  overflow: auto;
  gap: 10px;
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
  margin-bottom: 20px;
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