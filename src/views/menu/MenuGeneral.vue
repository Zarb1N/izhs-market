<template>
  <IonContent>
    <div class="menu__general">
      <div class="menu__profile">
        <div class="menu__user-info">
          <div class="menu__user-name">
          skdfjlskjdf
          </div>
          <div class="menu__phone-number">

          </div>
          <div class="menu__genius-state">

          </div>
        </div>
      </div>
      <div class="menu__buttons">
        <Button 
          v-for="(btn, index) in buttons"
          :key="index"
          :data="btn"
          @click="() => {$router.push(`/menu/${btn.goTo}`)}"
        >
        </Button>
      </div>
    </div>
  </IonContent>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MenuButton from "@/components/MenuButton.vue";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  props: [
    'buttons'
  ],
  data: () => ({}),
  components: {
    Button: MenuButton,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})

</script>

<style scoped>
.menu__general {
  display: grid;
  grid-template-rows: minmax(120px, 400px) auto;
}
.menu__profile {
  position: fixed;
  height: 400px;
  background: #593DFF;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
}
.menu__buttons {
  position: relative;
  margin-top: -24px;
  background: #F5F5F5;
  border-radius: 24px 24px 0px 0px;
  height: 100%;
  padding: 8px 20px 0px 20px;
  z-index: 100;
  grid-row: 2 / 3;
  height: calc(100% - 120px) !important;
}
</style>