<template>
  <IonContent>
    <div
      class="catalog-overview"
      v-if="generalStore.filters"
    >
      <div
        class="catalog-overview__sets"
        v-if="generalStore.filters.architecture"
      >
        <div class="catalog-overview__sets-name">Архитектура</div>
        <div class="catalog-overview__sets-description">Следите за обновлениями — каждый день новые проекты со всего мира</div>
        <div class="catalog-overview__sets-items">
          <div
            class="catalog-overview__set"
            v-for="(set, index) in generalStore.filters.architecture.slice(1)"
            :key="index"
            @click="(event) => {$router.push(`/catalog/architecture-set/${set.id}`)}"
            v-show="set.count_houses"
          >
            <img
              class="catalog-overview__set-image"
              :src="set.image && set.image.url"
            />
            <div class="catalog-overview__set-text-info">
              <div class="catalog-overview__set-name">{{set.style}}</div>
              <div class="catalog-overview__set-items-quantity">{{set.count_houses}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--
      <div
        class="catalog-overview__sets"
        v-if="generalStore.filters.compilations"
      >
        <div class="catalog-overview__sets-name">Подборки</div>
        <div class="catalog-overview__sets-items">
          <div
          class="catalog-overview__set"
          v-for="(set, index) in generalStore.filters.compilations"
          :key="index"
          @click="(event) => {$router.push(`/catalog/custom-set/${set.id}`)}"
          v-show="set.count_houses"
          >
            <img
              class="catalog-overview__set-image"
              :src="set.image && set.image.url"
            />
            <div class="catalog-overview__set-text-info">
              <div class="catalog-overview__set-name">{{set.name}} — </div>
              <div class="catalog-overview__set-items-quantity">{{set.count_houses}}</div>
            </div>
          </div>
        </div>
      </div>
      -->
    </div>
  </IonContent>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import Controls from '@/components/Controls.vue'
import ProductPreview from '@/components/ProductPreview.vue'
import ContextMenu from '@/components/ContextMenu.vue'
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
    openContextMenu(event : any) {
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
}
.catalog-overview__sets-description {
  font-weight: 750;
  font-size: 14px;
  line-height: 130%;
  margin-bottom: 24px;
}
.catalog-overview__sets-items {
  display: grid;
  grid-template-columns: repeat(2, 160px);
  gap: 16px;
}
.catalog-overview__set {

}
.catalog-overview__set-name {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
}
.catalog-overview__set-items-quantity {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #6A6A6A;
}
.catalog-overview__set-image {
  overflow: hidden;
  justify-self: center;
  width: 100%;
  height: 280px;
  border-radius: 16px;
  margin-bottom: 8px;
  object-fit: cover;
}
.catalog-overview__set-text-info > div {
  display: inline;
}
.catalog-overview__set-text-info {
  display: grid;
  grid-template-rows: repeat(2, min-content);
  gap: 4px;
}
</style>
<!-- For all catalog subpages -->
<style>
.set {
  width: 100%;
  padding: 30px 0px 20px 0px;

}
.set__header {
  width: 100%;
  position: fixed;
  top: 0;
  background: white;
  z-index: 100;
  height: 42px;
  box-sizing: content-box;
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