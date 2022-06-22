<template>
  <div class="set">
    <div class="set__header">
      <div 
        class="set__back-btn"
        @click="() => {$router.go(-1)}"
      >
        <img :src="generalStore.getImageURL('icons/back-arrow.svg')">
        <div>Каталог</div>
      </div>
    </div>
    <div class="set__body">
      <div class="set__houses">
        <div 
          class="set__house"
          v-for="(house, index) in generalStore.allHouses"
          :key="index"
          v-show="house.sets_id.toString() === $route.params.setId"
        >
          <ProductPreview
            v-if="house.sets_id.toString() === $route.params.setId"
            :data="house"
            @goToHouse="generalStore.houseInfo = house; $router.push(`/house/${house.id}/overview?subpage=prices`)"
            @openContextMenu="(event) => openContextMenu(event, house.id)"
            :cardBudge="generalStore.filters.compilations.filter(set => set.id == $route.params.setId)[0].budge_card"
            style="width: 160px"
          />
        </div>
      </div>
    </div>
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
        generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.indexOf(generalStore.choosedHouseId) === -1 
          ? generalStore.housePreviewContextActions
          : generalStore.favouriteHousePreviewContextActions
      "
      @blur="isContextMenu = false"
      @close="isContextMenu = false"
    />
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import ProductPreview from "../../components/ProductPreview.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  name: 'Catalog',
  props: [
    'filters'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    clickCoordinates: {x: 0, y: 0},
    isContextMenu: false,
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
    }
  },
  mounted() {
    this.generalStore.isTabbar = true
  },
  components: {
    ProductPreview,
    ContextMenu,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})
</script>

<style scoped>
.set {
  width: 100%;
  margin-bottom: 100px;
}
.set__back-btn {
  display: grid;
  grid-template-columns: repeat(2, min-content);
  align-items: center;
  gap: 5px;
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
  font-stretch: 151;
  padding: 9px;
}
.set__header {
  width: 100%;
  position: fixed;
  top: 0;
  background: white;
  z-index: 100;
  height: 42px;
  padding-top: 44px;
  box-sizing: content-box;
  display: grid;
  grid-template-columns: min-content;
}
.set__title {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
}
.set__body {
  margin-top: 90px;
  width: 100%;
  padding: 0px 20px;
}
.set__houses {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 160px);
  gap: 14px;
}
.set__house {
  width: 100%;
}
</style>