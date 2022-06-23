import { defineStore } from "pinia";
import { Share } from "@capacitor/share";
import type { IDeviceState } from "@/types/IDeviceState";

export const useStore = defineStore({
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
      widgets: [] as Array<{}>
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
    },
  },
});
export const useGeneralStore = useStore