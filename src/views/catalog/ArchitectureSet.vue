<template>
  <IonContent>
    <div class="set">
      <div class="set__header">
        <div
          class="set__back-btn"
          @click="() => {$router.push('/catalog')}"
        >
          <img :src="generalStore.getImageURL('icons/back-arrow.svg')">
          <div>Каталог</div>
        </div>
        <!-- <div class="set__title">Проектов — {{numberOfHouses}}</div> -->
      </div>
      <div class="set__body">
        <div class="set__houses">
          <div
            class="set__house"
            v-for="(house, index) in generalStore.allHouses"
            :key="index"
            v-show="$route.params.setId === '0' || house.architecture_id.toString() === $route.params.setId"
          >
            <ProductPreview
              v-if="$route.params.setId === '0' || house.architecture_id.toString() === $route.params.setId"
              :data="house"
              :isFavorite="generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.indexOf(house.id) !== -1"
              @goToHouse="generalStore.houseInfo = house; $router.push(`/house/${house.id}/overview?subpage=prices`)"
              @openContextMenu="(event) => openContextMenu(event, house.id)"
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
  </IonContent>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
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
    generalStore: useStore(),
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
    },
    numberOfHouses() {
      let number = 0
      this.generalStore.allHouses.forEach( (house : any) => {
        if (this.$route.params.setId === '0' || house.architecture_id.toString() === this.$route.params.setId) {
          number += 1
        }
      })
      return number
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
  padding: 30px 0px 100px 0px;

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
.set__title {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
}
.set__body {
  margin-top: 83px;
  width: 100%;
  padding: 0px 20px;
}
.set__houses {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 159px);
  gap: 17px;
}
.set__house {
  width: 100%;
}
</style>