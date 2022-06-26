import { defineStore } from "pinia";
import { Share } from "@capacitor/share";
import type { IDeviceState } from "@/types/IDeviceState";

const useStore = defineStore({
  id: "general",
  state() {
    return {
      server: "https://xzim-bwxc-viqv.n7.xano.io/api:ek4QHJJA",
      telegramSupport: "https://t.me/zarb1n",
      whatsappSupport: "https://wa.me/qr/QQ4VTH3AZSIFM1",
      allHouses: [] as Array<{ [key: string]: any }>,
      deviceId: "" as any,
      deviceInfo: {} as { [key: string]: any },
      appVersion: 1,
      linkToAppInStore: "",
      systemParameters: {} as { [key: string]: any },
      deviceState: {} as IDeviceState,
      housePreviewContextActions: [
        {
          text: "Поделиться",
          action: () => {
            this.actions?.shareHouse();
          },
        },
        {
          text: "Добавить в избранное",
          action: (houseId: number) => {
            this.actions?.addToFavorites(houseId);
          },
        },
      ],
      favouriteHousePreviewContextActions: [
        {
          text: "Поделиться",
          action: () => {
            this.actions?.shareHouse();
          },
        },
        {
          text: "Удалить из избранного",
          action: (houseId: number) => {
            this.actions?.removeFromFavourites(houseId);
          },
        },
      ],
      isTabbar: false as boolean,
      filters: {
        architecture: [],
        compilations: [],
      },
      isLoading: true as boolean,
      allStories: [] as Array<any>,
      choosedHouseId: 0 as number,
      isContextMenu: false as boolean,
      clickCoordinates: {
        x: 0,
        y: 0,
      } as { [key: string]: number },
      savedRouter: "/home" as string,
      applicationHouse: {} as { [key: string]: any },
      staff: [] as Array<{ [key: string]: any }>,
      applicationInfo: {} as { [key: string]: any },
      allPromocodes: [] as Array<{ [key: string]: string | number }>,
      errorNotification: false as any,
      houseInfo: {} as { [key: string]: any },
      services: [],
      servicesGroups: [],
      countries: [],
      viewedHouses: [] as Array<{}>,
      widgets: [] as Array<{}>,
      builders: [] as Array<{}>,
      housesWithoutPrice: [] as Array<{}>,
      equipments: [] as Array<{}>,
      widgetsList: [
        {
          id: 'state',
          name: 'Статус',
          isPossibleToHide: false,
          isDisplayed: true,
          isAvailable: true
        },
        {
          id: 'building',
          name: 'Стройка',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: true
        },
        {
          id: 'landscape',
          name: 'Landscape',
          isPossibleToHide: true,
          isDisplayed: true,
          isAvailable: true
        },
        {
          id: 'izs-index',
          name: 'ИЖС Индекс',
          isPossibleToHide: true,
          isDisplayed: true,
          isAvailable: true
        },
        {
          id: 'cheating',
          name: 'Где тебя обманут',
          isPossibleToHide: true,
          isDisplayed: true,
          isAvailable: true
        },
        /* ===== Not yet available ===== */
        {
          id: 'cadastral',
          name: 'Кадастровая карта',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'laws',
          name: 'Законы',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'blacklist',
          name: 'Черный список',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'darwin-prize',
          name: 'Премия Дарвина',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'system-hacking',
          name: 'Хакнуть систему',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'builders-fight',
          name: 'Битва застройщиков',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'ours-fails',
          name: 'Наши фейлы',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'check-costs',
          name: 'Проверить смету',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'discussions',
          name: 'Дискуссии',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
        {
          id: 'cheaper',
          name: 'Где дешевле',
          isPossibleToHide: true,
          isDisplayed: false,
          isAvailable: false,
        },
      ]
    };
  },
  getters: {
    getDeviceState(): IDeviceState {
      return this.deviceState;
    },
  },
  actions: {
    formatNumber: (val: number, decimalsNumber = 0) => {
      let formattedNumber: string | number;
      if (val) {
        if (typeof decimalsNumber === "number" && typeof val === "number") {
          formattedNumber = val
            .toFixed(decimalsNumber)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        } else {
          formattedNumber = val
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
        }
      } else {
        formattedNumber = val;
      }
      return formattedNumber;
    },
    getImageURL(path: string) {
      return new URL(`../assets/${path}`, import.meta.url).href;
    },
    async getUserState() {
      const res = await fetch(`${this.server}/states/${this.deviceId}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const data: IDeviceState = await res.json();
      this.deviceState = data;
    },
    async updateUserState(body: IDeviceState) {
      const res = await fetch(`${this.server}/states/${this.deviceId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      })
      const data: IDeviceState = await res.json()
      this.deviceState = data;
    },
    async addToFavorites(houseId: number) {
      const newHouseId = houseId || this.choosedHouseId;
      if (this.deviceState.favourites_houses_id.indexOf(newHouseId) === -1) {
        this.deviceState.favourites_houses_id.push(newHouseId);
        const res = await fetch(`${this.server}/states/${this.deviceId}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            device_id: this.deviceId,
            favourites_houses_id: this.deviceState.favourites_houses_id,
          }),
        });
        const data = await res.json();
      }
    },
    async removeFromFavourites(houseId: number) {
      const newHouseId = houseId || this.choosedHouseId;

      if (this.deviceState.favourites_houses_id.indexOf(newHouseId) !== -1) {
        this.deviceState.favourites_houses_id =
          this.deviceState.favourites_houses_id.filter(
            (id: number) => id != newHouseId
          );
        const res = await fetch(`${this.server}/states/${newHouseId}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            device_id: this.deviceId,
          }),
        });
        const data = await res.json();
      }
    },
    async shareHouse() {
      await Share.share({
        title: "See cool stuff",
        text: "Really awesome thing you need to see right meow",
        url: "http://ionicframework.com/",
        dialogTitle: "Share with buddies",
      });
    },
    windowWidth: (): number => window.innerWidth,
    async updateDeviceState() {
      const res = await fetch(`${this.server}/states/${this.deviceId}`);
      const data = await res.json();
      this.deviceState = data;
      return data;
    },
    showErrorNotification(error: any) {
      this.errorNotification = error;
      setTimeout(() => {
        this.errorNotification = false;
      }, 5000);
      throw(error)
    },
  },
});
export const useGeneralStore = useStore