import { defineStore } from 'pinia'
const useStore = defineStore({
  id: 'appState',
  state: () => ({
    isRequestPopup: false,
    isContactsPopup: false,
    isAddingProjectApplication: false,
    isRegionChoosing: false,
    isServiceApplicationPopup: false,
  }),
})

export const useAppState = useStore