<template>
  <IonPage>
    <IonContent>
      <div class="catalog">
        <!-- <div class="catalog__header">
          <div class="catalog__header-left-group">
            <img
              class="catalog-subpage__back-btn"
              src="../assets/icons/arrow-left--black.svg"
              @click="
                () => {
                  $router.go(-1);
                }
              "
              v-if="$route.matched.map((item) => item.name)[1] !== 'Каталог'"
            />
            <div
              class="catalog__title title--primary"
              v-if="$route.matched.map((item) => item.name)[1] === 'Каталог'"
            >
              Каталог
            </div>
            <div
              class="catalog__title title--primary"
              v-if="$route.matched.map((item) => item.name)[1] === 'Избранное'"
            >
              Избранное
            </div>
            <div
              class="catalog__title title--primary"
              v-else-if="
                $route.matched.map((item) => item.name)[1] ===
                'Архитектурный набор'
              "
            >
              {{
                generalStore.filters.architecture.length &&
                generalStore.filters.architecture.filter(
                  (set) => set.id == $route.params.setId
                )[0].style
              }}
            </div>
            <div
              class="catalog__title title--primary"
              v-else-if="
                $route.matched.map((item) => item.name)[1] === 'Подборка'
              "
            >
              {{
                generalStore.filters.compilations.filter(
                  (set) => set.id == $route.params.setId
                )[0] &&
                generalStore.filters.compilations.filter(
                  (set) => set.id == $route.params.setId
                )[0].name
              }}
            </div>
          </div>
          <div class="catalog__header-right-group">
            <div
              class="catalog__open-favourites-btn"
              v-if="
                ['Каталог', 'Избранное'].indexOf(
                  $route.matched.map((item) => item.name)[1]
                ) === -1
              "
              @click="$router.push('/catalog/favourites')"
            >
              <img
                :src="generalStore.getImageURL('icons/bookmark-simple.svg')"
              />
              <div
                class="catalog__number-of-quantity-wrapper"
                v-if="
                  generalStore.deviceState.favourites_houses_id &&
                  generalStore.deviceState.favourites_houses_id.length
                "
              >
                <div class="catalog__number-of-quantity">
                  <div class="catalog__number-of-quantity-text">
                    {{ generalStore.deviceState.favourites_houses_id.length }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="catalog__body">
          <!-- <IonRouterOutlet style="position: static; min-height: 100px; min-width: 100px;"/> -->
          <RouterView />
        </div>
        <!--
        <div
          class="catalog__controls"
          v-show="
            ['Каталог', 'Избранное'].indexOf(
              $route.matched.map((item) => item.name)[1]
            ) === -1
          "
        >
          <div class="catalog__control-btn">
            <img
              class="catalog__control-btn-icon"
              :src="generalStore.getImageURL('icons/open-book--black.svg')"
            />
            <div
              class="catalog__control-btn-text"
              @click="$router.push('/catalog')"
            >
              Каталог
            </div>
          </div>
          <div class="catalog__control-btn">
            <img
              class="catalog__control-btn-icon"
              :src="
                generalStore.getImageURL('icons/arrows-left-right--black.svg')
              "
            />
            <div class="catalog__control-btn-text">больше - меньше</div>
          </div>
        </div>
        -->
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from "@ionic/vue";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  methods: {},
  mounted() {},
  components: {
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
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