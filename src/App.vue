<template>
  <IonApp id="vue-app">
    <IonContent id="vue-app__content" scroll-y="false">
      <ErrorNotification :isActive="generalStore.errorNotification" />
      <FullscreenLoader v-show="generalStore.isLoading" />
      <UpdateNotification :isActive="isUpdate" @close="isUpdate = false" />
      <RequiredUpdateNotification :isActive="isMandatoryUpdate" />
      <BottomPopup :isActive="appState.isContactsPopup" @close="appState.isContactsPopup = false">
        <template v-slot:title>
          <div style="font-size: 20px; font-weight: 750">Связаться в мессенжерах</div>
        </template>
        <HelpContacts />
      </BottomPopup>
      <RequestPopup :is-active="appState.isRequestPopup" />
      <AddUsToProjectPopups :isActive="appState.isAddingProjectApplication"
        @close="appState.isAddingProjectApplication = false" />
      <RegionChoosing :isActive="appState.isRegionChoosing" @close="appState.isRegionChoosing = false" />
      <ServiceApplication :isActive="appState.isServiceApplicationPopup"
        @close="appState.isServiceApplicationPopup = false" />
      <SelectingWidgetsPopup :isActive="appState.isSelectingWidgetsPopup" :data="generalStore.widgetsList"
        @close="appState.isSelectingWidgetsPopup = false" />
      <IonTabs>
        <IonRouterOutlet />
        <div id="overlay"></div>
        <Tabbar id="app__tabbar" :items="navigationItems" v-show="isTabbar" />
      </IonTabs>
    </IonContent>
  </IonApp>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Tabbar from '@/components/Tabbar.vue';
import { useGeneralStore } from '@/stores/general'
import { useAppState } from '@/stores/appState'
import {
  IonTabs,
  IonContent,
  IonRouterOutlet,
  IonApp,
} from '@ionic/vue';

import { App } from '@capacitor/app'
import { Device } from '@capacitor/device'
import FullscreenLoader from './components/FullscreenLoader.vue'

import { StatusBar } from '@capacitor/status-bar';
import router from './router'

import ErrorNotification from './components/ErrorNotification.vue'
import UpdateNotification from './components/UpdateNotification.vue'
import RequiredUpdateNotification from './components/RequiredUpdateNotification.vue'
import BottomPopup from '@/components/BottomPopup.vue'
import HelpContacts from '@/components/HelpContacts.vue'
import AddUsToProject from '@/parts/AddUsToProject.vue'
import RegionChoosing from '@/parts/RegionChoosing.vue'
import ServiceApplication from '@/parts/ServiceApplication.vue'
import SelectingWidgetsPopup from '@/parts/SelectingWidgetsPopup.vue'
import RequestPopup from './parts/RequestPopup.vue'


App.addListener('backButton', () => {
  router.back()
});
export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
    appState: useAppState(),
    isUpdate: false,
    isMandatoryUpdate: false,
    navigationItems: [
      {
        iconName: 'house',
        title: 'Главная',
        goTo: '/home'
      },
      {
        iconName: 'open-book',
        title: 'Каталог',
        goTo: '/catalog'
      },
      {
        iconName: 'tree',
        title: 'Landscape',
        goTo: '/landscape'
      },
      {
        iconName: 'double-circle',
        title: 'Стройка',
        goTo: '/my-project'
      },

      {
        iconName: 'human',
        title: 'Меню',
        goTo: '/menu'
      },
    ]
  }),
  methods: {
    async loadRequirementData() {
      this.generalStore.isLoading = true
      await Promise.all([
        this.checkIsDeviceInDataBase(),
        this.getHouses(),
        this.getCompilations(),
        this.getStories(),
        this.getStaff(),
        this.getPromocodes(),
        this.getSystemParameters(),
        this.getDeviceInfo(),
        this.getCountries(),
        this.getWidgets(),
        this.getBuilders(),
        this.getEquipments(),
      ])
      /*
      this.generalStore.widgetsList.forEach( widget => {
        this.generalStore.deviceState.widgets_name.indexOf(widget.id) !== -1
          ? widget.isDisplayed = true
          : widget.isDisplayed = false
      })
      */
      await this.getArchitechtureStyles()
      this.createViewedHousesArray()
      if (this.generalStore.deviceState.applications_houses_id) {
        await Promise.all([
          this.getApplicationHouse(),
          this.getApplicationInfo()
        ])
      }
      this.generalStore.isLoading = false
    },
    async getSystemParameters() {
      const res = await fetch(`${this.generalStore.server}/system`)
      const data = await res.json()
      data.forEach((param: { [key: string]: string }) => {
        this.generalStore.systemParameters[param.name.toLowerCase()] = param.value
      })
      this.isNeedToUpdate()
    },
    async checkIsDeviceInDataBase() {
      const deviceId = await this.getDeviceId()
      const res = await fetch(`${this.generalStore.server}/states/${deviceId}`)
      const data = await res.json()
      if (data === null) {
        this.createAnAccount(deviceId)
      }
      else {
        this.generalStore.deviceState = data
      }
    },
    async getHouses() {
      const res = await fetch(`${this.generalStore.server}/houses`)
      this.generalStore.allHouses = await res.json()
    },
    async getDeviceId() {
      const data = await Device.getId()
      this.generalStore.deviceId = data['uuid']
      return this.generalStore.deviceId
    },
    async getDeviceInfo() {
      const data = await Device.getInfo()
      this.generalStore.deviceInfo = data
      if (this.generalStore.deviceInfo.operatingSystem == 'android') {
        this.generalStore.linkToAppInStore = 'https://play.google.com/store/apps/details?id=izs.market'
      }

    },
    async hideStatusBar() {
      await StatusBar.hide();
    },
    async createAnAccount(device_id: string) {
      const res = await fetch(`${this.generalStore.server}/states`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          device_id,
          genius_number: Math.round(Math.random() * 10000)
        })
      })
      const data = await res.json()
      this.generalStore.deviceState = data
    },
    async getArchitechtureStyles() {
      const res = await fetch(`${this.generalStore.server}/architecture`)
      const data = await res.json()
      data.unshift({
        id: 0,
        style: 'Все',
        count_houses: this.generalStore.allHouses.length
      })
      this.generalStore.filters.architecture = data
    },
    async getCompilations() {
      const res = await fetch(`${this.generalStore.server}/sets`)
      const data = await res.json()
      this.generalStore.filters.compilations = data
    },
    async getStories() {
      const res = await fetch(`${this.generalStore.server}/stories`)
      const data = await res.json()
      this.generalStore.allStories = data
    },
    async getStaff() {
      const res = await fetch(`${this.generalStore.server}/staff`)
      const data = await res.json()
      this.generalStore.staff = data
    },
    async getCountries() {
      const res = await fetch(`${this.generalStore.server}/country`)
      const data = await res.json()
      this.generalStore.countries = data
    },
    async getApplicationHouse() {
      const res = await fetch(`${this.generalStore.server}/houses/${this.generalStore.deviceState.applications_houses_id}`)
      this.generalStore.applicationHouse = await res.json()
    },
    async getApplicationInfo() {
      const res = await fetch(`${this.generalStore.server}/applications_houses/${this.generalStore.deviceState.id}`)
      this.generalStore.applicationInfo = await res.json()
    },
    async getPromocodes() {
      const res = await fetch(`${this.generalStore.server}/promocodes`)
      this.generalStore.allPromocodes = await res.json()
    },
    async getWidgets() {
      const res = await fetch(`${this.generalStore.server}/widgets`)
      this.generalStore.widgets = await res.json()
    },
    async getBuilders() {
      const res = await fetch(`${this.generalStore.server}/builders`)
      this.generalStore.builders = await res.json()
    },
    async getEquipments() {
      const res = await fetch(`${this.generalStore.server}/equipments`)
      this.generalStore.equipments = await res.json()
    },
    getImageURL(iconName: string, goTo: string) {
      const path = new URL(
        `./assets/icons/${iconName}--${this.$route.matched.map(route => route.path).includes(goTo) ? 'violet' : 'gray'}.svg`,
        import.meta.url
      ).href
      return path
    },
    isNeedToUpdate() {
      if (this.generalStore.appVersion.toString() !== this.generalStore.systemParameters.current_version) {
        this.generalStore.systemParameters.current_version_required != 'false'
          ? this.isMandatoryUpdate = true
          : this.isUpdate = true
      }
    },
    createViewedHousesArray() {
      const houses: Array<Object> = []
      this.generalStore.deviceState.viewed_houses_id.forEach((house_id: number) => {
        this.generalStore.allHouses.forEach((house: { [key: string]: any }) => {
          if (house.id === house_id) {
            houses.push(house)
          }
        })
      })
      this.generalStore.viewedHouses = houses.reverse()
    }
  },
  computed: {
    isTabbar() {
      const tabbarTitles = this.navigationItems.map(item => item.title)
      const actualPath = this.$route.matched.map((item: { [key: string]: any }) => item.name)
      // console.log(actualPath)
      const allowedRouters = ['Архитектурный набор', 'Подборка', 'Страна', 'Застройщик']
      const restrictedRouters = ['Проверить участок', 'Построить дом', 'Спроектировать дом']
      for (let title of tabbarTitles) {
        for (let item of actualPath) {
          if (restrictedRouters.indexOf(item) !== -1) {
            return false
          }
        }
        for (let item of actualPath) {
          if (item === title) {
            return true
          }
          if (allowedRouters.indexOf(item) !== -1) {
            return true
          }
        }
      }
      return false
    },
  },
  mounted() {
    this.loadRequirementData()
    // this.hideStatusBar()
    StatusBar.setOverlaysWebView({ overlay: true });
  },
  components: {
    Tabbar,
    FullscreenLoader,
    IonContent,
    IonTabs,
    IonRouterOutlet,
    IonApp,
    ErrorNotification,
    UpdateNotification,
    RequiredUpdateNotification,
    BottomPopup,
    HelpContacts,
    AddUsToProjectPopups: AddUsToProject,
    RegionChoosing,
    ServiceApplication,
    SelectingWidgetsPopup,
    RequestPopup
  }
})
</script>

<style>
#vue-app {
  /* height: 100%; */
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #F5F5F5;
}

#vue-app__content {
  height: 100%;
}

#vue-app::-webkit-scrollbar {
  display: none;
}

.scroll-y {
  overflow: hidden;
}

/* #app__tabbar {
  position: fixed;
  bottom: 0;
} */
.page {
  height: 100%;
  background: linear-gradient(239.67deg, #227164 0.34%, #278878 61.18%);
  padding: 30px 20px;
  color: white;
  font-weight: bold;
  font-size: 36px;
}
</style>

