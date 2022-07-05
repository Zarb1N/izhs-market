<template>
  <IonPage>
    <IonContent :scroll-y="false">
      <IonRouterOutlet />
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { IonRouterOutlet, IonContent, IonPage } from '@ionic/vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    IonPage,
    IonContent,
    IonRouterOutlet,
  }
})


</script>

<style scoped>
.home {
  min-height: 100%;
}
</style>