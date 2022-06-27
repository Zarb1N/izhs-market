import { defineStore } from 'pinia'
const useStore = defineStore({
  id: 'appState',
  state: () => ({
    isContactsPopup: false,
    isAddingProjectApplication: false,
    isRegionChoosing: false,
    isServiceApplicationPopup: false,
  }),
})

export const useAppState = useStore