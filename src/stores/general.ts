import { defineStore } from 'pinia'
import { Share } from '@capacitor/share';

export const useGeneralStore : any = defineStore({
  id: 'general',
  state: () => ({
    server: 'https://xzim-bwxc-viqv.n7.xano.io/api:ek4QHJJA',
    telegramSupport: 'https://t.me/zarb1n',
    whatsappSupport: 'https://wa.me/qr/QQ4VTH3AZSIFM1',
    allHouses: [] as Array<{[key: string]: any}>,
    deviceId: '' as any,
    deviceInfo: {} as {[key: string]: any},
    appVersion: 1,
    linkToAppInStore: '',
    systemParameters: {} as {[key: string]: any},
    deviceState: {} as {
      id: number,
      created_at: number,
      device_id: string,
      applications_houses_id: number,
      applications_services_id: Array<number>,
      stories_id: Array<number>,
      promocodes_id: Array<number>,
      favourites_houses_id: Array<number>,
      genius_number: string
    },
    housePreviewContextActions: [
      {
        text: 'Поделиться',
        action: () => {useGeneralStore().shareHouse()}
      },
      {
        text: 'Добавить в избранное',
        action: () => {useGeneralStore().addToFavorites()}
      },
    ],
    favouriteHousePreviewContextActions: [
      {
        text: 'Поделиться',
        action: () => {useGeneralStore().shareHouse()}
      },
      {
        text: 'Удалить из избранного',
        action: () => {useGeneralStore().removeFromFavourites()} 
      }
    ],
    isTabbar: false as Boolean,
    filters: {
      architecture: [],
      compilations: [],
    },
    isLoading: true as Boolean,
    allStories: [] as Array<any>,
    choosedHouseId: 0 as number,
    isContextMenu: false as Boolean,
    clickCoordinates: {
      x: 0, 
      y: 0
    } as {[key: string]: number},
    savedRouter: '/home' as string,
    applicationHouse: {} as {[key: string]: any},
    staff: [] as Array<{[key: string]: any}>,
    applicationInfo: {} as {[key: string]: any},
    allPromocodes: [] as Array<{[key: string]: string | number}>,
    errorNotification: false as any,
    houseInfo: {} as {[key: string]: any},
    services: [],
    servicesGroups: [],
    countries: [],
    widgets: []
  }),
  actions: {
    formatNumber: (val: number, decimalsNumber = 0) => {
      let formattedNumber : string | number
      if (val) {
        if (typeof decimalsNumber === 'number' && typeof val === 'number') {
          formattedNumber = val.toFixed(decimalsNumber).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        }
        else {
          formattedNumber = val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        }
      }
      else {
        formattedNumber = val
      }
      return formattedNumber
    },
    getImageURL(path: string) {
      return new URL(`../assets/${path}`, import.meta.url).href
      // return new URL(`${path}`, import.meta.url).href
    },
    addToFavorites: async (houseId = useGeneralStore().choosedHouseId) => {
      console.log(useGeneralStore().deviceState)
      if (useGeneralStore().deviceState.favourites_houses_id.indexOf(houseId) === -1) {
        useGeneralStore().deviceState.favourites_houses_id.push(houseId)
        const res = await fetch(`${useGeneralStore().server}/states/${useGeneralStore().deviceId}`, {
          method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            device_id: useGeneralStore().deviceId,
            favourites_houses_id: useGeneralStore().deviceState.favourites_houses_id
          })
        })
        const data = await res.json()
      }
    },
    removeFromFavourites: async (houseId = useGeneralStore().choosedHouseId) => {
      if (useGeneralStore().deviceState.favourites_houses_id.indexOf(houseId) !== -1) {
        console.log(useGeneralStore().deviceState.favourites_houses_id)
        useGeneralStore().deviceState.favourites_houses_id = useGeneralStore().deviceState.favourites_houses_id.filter( (id : number) => id != houseId)
        console.log(useGeneralStore().deviceState.favourites_houses_id)
        const res = await fetch(`${useGeneralStore().server}/states/${houseId}`, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            device_id: useGeneralStore().deviceId
          })
        })
        const data = await res.json()
      }
    },
    shareHouse: async (houseId = useGeneralStore().choosedHouseId) => {
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
      });
    },
    windowWidth: () : number => window.innerWidth,
    updateDeviceState: async () => {
      const res = await fetch(`${useGeneralStore().server}/states/${useGeneralStore().deviceId}`)
      const data = await res.json()
      useGeneralStore().deviceState = data
      return data
    },
    showErrorNotification(error : any) {
      useGeneralStore().errorNotification = error
      setTimeout( () => {
        useGeneralStore().errorNotification = false
      }, 5000)
    }
  }
})

// export const useCounterStore = defineStore({
//   id: 'counter',
//   state: () => ({
//     counter: 0
//   }),
//   getters: {
//     doubleCount: (state) => state.counter * 2
//   },
//   actions: {
//     increment() {
//       this.counter++
//     }
//   }
// })
