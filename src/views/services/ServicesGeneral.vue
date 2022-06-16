<template>
  <IonPage>
    <IonContent style="position: static;">
      <div class="g-services">
        <div class="services__body">
          <div class="services__groups">
            <div 
              class="services__group"
              :class="group === 'Пока недоступные' && 'services__group--disabled'"
              v-for="(group, index) in generalStore.servicesGroups"
              :key="index"
            >
              <div class="services__group-title">
                {{group}}
              </div>
              <div class="services__group-items">
                <div 
                  class="services__group-item service-button"
                  v-for="(service, index) in generalStore.services"
                  :key="index"
                  v-show="service.groupName === group"
                  @click="() => {service && $router.push(service.goTo)}"
                >
                  <div 
                    class="service-button__name"
                    v-html="service.name"
                  ></div>
                  <img 
                    class="service-button__image"
                    :src="generalStore.getImageURL(`${service.image}.png`)"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';


export default defineComponent({
  props: [
    'servicesGroups',
    'services',
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
})

</script>

<style scoped>
.g-services {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 31px 14px 30px 14px;
}
.services__groups {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.services__group-title {
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 15px;
}
.services__group-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.service-button {
  background: #EDECF2;
  border-radius: 12px;
  height: 58px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}
.service-button__image {
  height: 100%;
}
.service-button__name {
  padding-left: 20px;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.services__group--disabled .service-button {
  background: #F2F2F2;
}
.services__group--disabled .service-button__name {
  color: #89888E;
}

</style>