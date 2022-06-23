<template>
  <div class="services">
    <div class="services__features without-scrollbar">
      <div
        class="services__feature"
        v-for="(service, index) in services"
        :key="index"
        :style="{background: `url(${generalStore.getImageURL('services-background/' + service.backgroud + '.svg')}) center no-repeat `}"
        @click="$router.push(service.goTo)"
      >

        <div class="services__feature-name">{{service.name}}</div>
        <div
          class="services__feature-description"
          v-html="service.description"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';


export default defineComponent({
  data: () => ({
    generalStore: useStore(),
    services: [
      {
        name: 'Genius',
        description: 'Одно окно <br/> для строительства',
        backgroud: 'genius',
        goTo: '/menu/my-state'
      },
      {
        name: 'РОСРЕЕСТР',
        description: 'Регистрация <br/> участка и дома',
        backgroud: 'ros-registry',
        goTo: '/menu/ros-registry'
      },
      {
        name: 'Landscape',
        description: 'Участок <br/> под ключ',
        backgroud: 'landscape',
        goTo: '/landscape'
      },
      {
        name: 'Сервисы',
        description: 'Спроектировать <br/> дом и другое',
        backgroud: 'services',
        goTo: '/home/services'
      },
      {
        name: 'ДЕНЬГИ',
        description: 'Сравнить <br/> время и деньги',
        backgroud: 'money',
        goTo: '/menu/comparison'
      },
      {
        name: 'ЗАЯВКА',
        description: 'Как это <br/> работает',
        backgroud: 'application',
        goTo: '/menu/how-it-works'
      },
    ],
  }),
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
})
</script>

<style scoped>
.services {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.services__features {
  position: relative;
  margin: -3px -14px;
  padding: 3px 14px;
  display: grid;
  grid-template-columns: repeat(3, 152px);
  grid-template-rows: repeat(2, 146px);
  gap: 14px;
  overflow-x: auto;
}
.services__feature {
  border-radius: 12px;
  padding: 45px 14px 38px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  justify-content: space-between;
}

.services__feature-name {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.02em;
  color: #439A86;
}
.services__feature-description {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;

}
.services__subpages {
  display: grid;
  grid-template-rows: repeat(2, 161px);
  gap: 14px;
}
.services__subpage {
  background: #EFF0C3;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 12px;
  display: grid;
  grid-template-columns: auto 166px;
}
.services__subpage-text-info {
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
}
.services__subpage-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}
.services__feature-description {
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
}
.services__subpage-image-wrapper {
  width: 166px;
  height: 161px;
  background: #CED080;
  border-radius: 12px;
}
.services__subpage-image {
  height: 100%;
  width: 100%;
}
</style>