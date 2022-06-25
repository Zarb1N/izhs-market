<template>
  <IonContent>
    <div class="set">
      <div class="set__header">
        <div 
          class="set__back-btn"
          @click="() => {$router.push('/home')}"
        >
          <img :src="generalStore.getImageURL('icons/back-arrow.svg')">
          <div>Главная</div>
        </div>
        
      </div>
      <div class="set__body">
          <div class="set__houses">
            <div 
              class="set__house"
              v-for="house in generalStore.housesWithoutPrice"
              :key="house.id"
            >
              <ProductPreview
                :data="house"
                :isFavorite="generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.indexOf(house.id) !== -1"
                @goToHouse="generalStore.houseInfo = house; $router.push(`/house/${house.id}/overview`)"
              />
            </div>
          </div> 
        </div>
    </div>
  </IonContent>
  
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import ProductPreview from "@/components/ProductPreview.vue";
import { IonContent } from "@ionic/vue";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  components: {
    ProductPreview,
    IonContent,
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