import { defineStore } from 'pinia'
export const useAppState : any = defineStore({
  id: 'appState',
  state: () => ({
    isContactsPopup: false,
    isAddingProjectApplication: false,
    isRegionChoosing: true,
  }),
})