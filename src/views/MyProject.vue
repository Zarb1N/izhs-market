<template>
  <IonPage>
    <IonContent>
      <div class="my-project">
        <div class="my-project__header">
          <div class="my-project__title title--primary">{{generalStore.deviceState.applications_houses_id ? generalStore.applicationHouse.name : 'Мой проект'}}</div>
        </div>
        <div class="my-project__body">
          <RouterView/>
        </div>
      </div>
    </IonContent>
  </IonPage>

</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { useStore } from "@/stores/general"
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  data: () => ({
    generalStore: useStore(),
  }),
  components: {
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})
</script>

<style scoped>
.my-project__header {
  width: 100%;
  background: linear-gradient(273.3deg, #82B9F0 0%, #96C7F9 100%);
  padding: 20px 14px 15px 14px;
  display: flex;
  gap: 10px;
}
.my-project__body {
  padding: 31px 14px 100px 14px;
}
</style>