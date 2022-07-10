<template>
  <IonPage>
    <IonContent>
      <div class="catalog">
        <div class="catalog__body">
          <RouterView />
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import { IonContent, IonPage } from "@ionic/vue";

export default defineComponent({
  name: 'CatalogView',
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  components: {
    IonPage,
    IonContent,
  },
});
</script>

<style scoped>
.catalog {
  height: 100%;
  display: grid;
  grid-template-rows: auto;
}
.catalog__header {
  width: 100%;
  background: linear-gradient(273.3deg, #82b9f0 0%, #96c7f9 100%);
  padding: 20px 14px 15px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.catalog__header-left-group {
  display: flex;
  gap: 10px;
  align-items: center;
}
.catalog__header-right-group {
  display: flex;
  align-items: center;
}
.catalog__body {
}
.catalog__number-of-quantity-wrapper {
  height: 0;
  position: relative;
  left: 11px;
  bottom: 31px;
}
.catalog__open-favourites-btn {
  height: 24px;
  position: absolute;
  top: 20px;
  right: 14px;
  z-index: 100;
}
.catalog__number-of-quantity {
  height: 13px;
  width: 13px;
  background: #e06363;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
.catalog__number-of-quantity-text {
  position: relative;
  top: 1px;
}
.catalog__controls {
  position: fixed;
  bottom: calc(52px);
  display: flex;
  padding: 15px 14px;
  justify-content: space-between;
  width: 100%;
  gap: 14px;
  z-index: 1;
}
.catalog__control-btn {
  background: #439a86;
  box-shadow: 0px 0px 1px rgba(26, 32, 36, 0.32),
    0px 40px 64px rgba(91, 104, 113, 0.24);
  border-radius: 12px;
  height: 27px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.catalog__control-btn:first-child {
  max-width: 143px;
}
.catalog__control-btn-text {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #151918;
}
.catalog__control-btn-icon {
  height: 20px;
  width: 20px;
}
</style>