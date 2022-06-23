<template>
  <IonTabBar class="tabbar" slot="bottom">
    <div class="tabbar__items">
      <router-link 
        class="tabbar__item"
        v-for="(item) in items"
        :key="item.goTo"
        :class="$route.matched.map(route => route.name).includes(item.title) ? 'tabbar__item--choosed' : 'tabbar__item--unchoosed'"
        :to="item.goTo"
      >
        <img 
          class="tabbar__item-icon"
          :src="getImageURL(item.iconName, item.goTo)"
        /> 
        <!-- <img 
          class="tabbar__item-icon"
          src="'../assets/icons/bookmark--gray.svg'"
        />  -->
        <div class="tabbar__item-name">{{item.title}}</div>
      </router-link>
    </div>
  </IonTabBar>
</template>

<script lang="ts">
import { computed, defineComponent} from "@vue/runtime-core";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue';

export default defineComponent({
  props: [
    'items', /* Array */
  ],
  methods: {
    getImageURL(iconName : string, goTo : string) {
      const path = new URL(
        `../assets/icons/${iconName}--${this.$route.matched.map(route => route.path).includes(goTo) ? 'pink' : 'black'}.svg`,
        import.meta.url
      ).href
      return path
    }
  },
  components: {
    IonTabBar,
  }
})
</script>

<style lang="css">
  .tabbar {
    width: 100%;
    height: 90px;
    background: #9B9B9B;
    border-radius: 16px 16px 0px 0px;
    padding: 22px 12.5px;
    box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    z-index: 50;
  }
  .tabbar__items {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .tabbar__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #707982;
    text-decoration: none;
    gap: 1px;
  }
  .tabbar__item--choosed {
    background: linear-gradient(90deg, #C5ACFF 0%, #FBC2EB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .tabbar__item-icon {
    height: 26px;
    width: 26px;
  }
  .tabbar__item-name {
    font-weight: 600;
    font-size: 10px;
  }
</style>