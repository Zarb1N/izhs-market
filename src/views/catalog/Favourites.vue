<template>
  <!-- <IonContent> -->
    <div class="favourites">
      <div class="status-bar"></div>
      <div class="favourites__header">
        <BackButton/>
      </div>
      <div
        class="favourites--not-empty"
        v-if="favoriteHouses.length"
      >
        <div class="favourites__body">
          <div class="favourites__houses">
            <div
              class="favourites__house"
              v-for="(house, index) in favoriteHouses"
              :key="index"
            >
              <ProductPreview
                :data="house"
                @goToHouse="generalStore.houseInfo = house; $router.push(`/house/${house.id}/overview?subpage=prices`)"
                @openContextMenu="(event) => openContextMenu(event, house.id)"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="favourites__empty"
        v-else
      >
        <div class="favourites__description">Нажмите <b class="favourites__bold-font">Добавить в избранное</b> на карточке дома и проект появится здесь</div>
        <img
          class="favourites__image"
          :src="generalStore.getImageURL('how-to-add-house-to-favourites.png')"
        >
      </div>
      <ContextMenu
        tabindex="0"
        ref="contextMenu"
        :style="{
          'top': `${generalStore.clickCoordinates.y}px`,
          'left': `${generalStore.clickCoordinates.x}px`,
          'transform': `translate(${generalStore.clickCoordinates.x < generalStore.windowWidth() / 2 ? '0' : '-100%'})`
        }"
        v-show="generalStore.isContextMenu"
        :options="generalStore.favouriteHousePreviewContextActions"
        @blur="generalStore.isContextMenu = false"
        @close="generalStore.isContextMenu = false"
      />
    </div>
  <!-- </IonContent> -->
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import ProductPreview from "@/components/ProductPreview.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';
import BackButton from "@/components/BackButton.vue";


export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  methods: {
    openContextMenu(event : any, id : string) {
      this.generalStore.choosedHouseId = Number(id)
      event.preventDefault()
      this.generalStore.clickCoordinates = {
        x: event.x,
        y: event.y
      }
      this.$nextTick( () => {
        // @ts-ignore
        this.$refs.contextMenu.$el.focus()
      })
      this.generalStore.isContextMenu = true
    }
  },
  computed: {
    favoriteHouses() : Array<{[key: string]: any}> {
      const favoriteHouses = [] as Array<{[key: string]: any}>
      this.generalStore.allHouses.forEach( (house : {[key: string]: any}) => {
        if (this.generalStore.deviceState.favourites_houses_id.indexOf(house.id) !== -1) {
          favoriteHouses.push(house)
        }
      })
      return favoriteHouses
    }
  },
  components: {
    ProductPreview,
    ContextMenu,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
    BackButton,
  }
})

</script>

<style scoped>
.favourites {
  width: 100%;
  padding: 0px 14px 100px 14px;

}
.favourites__header {
  margin-bottom: 16px;
}
.favourites__title {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
}
.favourites__body {
  width: 100%;
}
.favourites__houses {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 167px);
  gap: 14px;
}
.favourites__house {
  width: 100%;
}
.favourites__empty {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
}
.favourites__description {
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
}
.favourites__bold-font {
  font-weight: bold;
}
</style>