<template>
  <IonPage>
    <IonContent :scroll-y="false">
      <IonRouterOutlet />
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})


</script>

<style scoped>
.home {
  min-height: 100%;
}
</style>