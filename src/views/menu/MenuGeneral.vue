<template>
  <IonContent>
    <div class="menu__general">
      <div class="status-bar"></div>
      <section class="menu-page__header">
        <p v-if="!isProfileEdit" class="menu__title">Мой ИЖС</p>
        <div class="menu__user-status">
          <img src="@/assets/status-icon.svg" alt="status">
          <p class="menu__user-status-text">статус</p>
        </div>
      </section>
      <section class="menu-page__body">
        <section @click="redirectToStatusPage" class="menu__status">
          <p>{{ status }}</p>
          <img src="@/assets/status-large.svg" alt="status">
        </section>
        <section class="menu__navigation">
          <MenuButton :is-link="true" v-for="(btn, index) in buttons" :key="index" :data="btn"
            @click="() => { $router.push(`/menu/${btn.goTo}`) }" />
        </section>
      </section>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from "vue";
import { Camera, CameraResultType, type Photo } from '@capacitor/camera';
import MenuButton from "@/components/MenuButton.vue";
import { useGeneralStore } from "@/stores/general";
import { storeToRefs } from "pinia";
import CenterPopup from "../../components/CenterPopup.vue";
import type { IDeviceState, IImage } from "@/types/IDeviceState";
import { useRouter } from "vue-router";
import { IonContent } from '@ionic/vue'

interface IButton {
  name: string
  icon: string
  goTo: string
}

defineProps<{ buttons: IButton[] }>()

const store = useGeneralStore()

const isEditNamePopupShown = ref(false)
const isEditNumberPopupShown = ref(false)
const initialState = ref({ name: '', number: '' })
const isProfileEdit = ref(false)
const router = useRouter()

const status = 'Все инженеры и Росреестр за 0\n₽ — оплатите первый этап строительства до 25\nавгуста и Genius активируется автоматически'

const { getDeviceState } = storeToRefs(store)
const { updateUserState } = store

onMounted(async () => {
  await store.getUserState()
  initialState.value.name = getDeviceState.value.name
  initialState.value.number = getDeviceState.value.number
})

const computedName = computed(() => getDeviceState.value.name || 'Ваше имя')
const computedNumber = computed(() => getDeviceState.value.number || 'Ваш телефон')
const getStyle = computed(() => {
  const image = getDeviceState.value.image
  if (!image) return 'background: #5437FF;'
  return `background: url(${image.path}); background-size: contain; background-repeat: no-repeat;`
})

const redirectToStatusPage = () => router.push('/menu/status')

const showNameEditPopup = () => {
  isEditNamePopupShown.value = true
}

const showNumberEditPopup = () => {
  isEditNumberPopupShown.value = true
}

const onAddPhoto = async () => {
  const isAllowed = await Camera.checkPermissions()
  if (isAllowed.camera === 'denied' || isAllowed.photos === 'denied') return
  const image = await Camera.getPhoto({
    resultType: CameraResultType.DataUrl
  });

  await onSavePhoto(image)
}

const editProfile = () => {
  isProfileEdit.value = true
}

const onSaveChanges = () => {
  isProfileEdit.value = false
}

const onSavePhoto = async (photo: Photo) => {
  if (!photo.dataUrl) return
  const imageObject = new Image()
  imageObject.src = photo.dataUrl
  imageObject.onload = async () => {
    if (!photo.dataUrl) return
    const { width, height, src } = imageObject
    const image: IImage = { path: photo.dataUrl, name: src, type: photo.format, size: 1, mime: 'image/jpeg', meta: { width, height } }
    const newUserState = { ...getDeviceState.value, image }
    try {
      await updateUserState(newUserState)
    } catch (error) {
      console.error(error)
    }
  }
}

const onSave = async (val: string, key: keyof IDeviceState) => {
  if (!val) return
  const newUserState = { ...getDeviceState.value, [key]: val }
  try {
    await updateUserState(newUserState)
    isEditNamePopupShown.value = false
    isEditNumberPopupShown.value = false
  } catch (error) {
    console.error(error)
  }
}

</script>

<style scoped>

.menu-page__body {
  display: grid;
  padding: 24px 20px 48px;
}

.status-bar {
  height: 44px;
}

.menu-page__header {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
}

.menu__popup-body {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}

.button {
  background: #090909;
  font-family: 'Roboto Flex';
  border: 1px solid #090909;
  border-radius: 60px;
  width: 100%;
  padding: 15px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.button-small {
  padding: 10.5px 0;
  width: 128px;
}

.input-field {
  font-family: 'Roboto Flex';
  border: 1px solid #6A6A6A;
  border-radius: 60px;
  width: 100%;
  padding: 15px 23px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.input-field::placeholder {
  font-family: 'Roboto Flex';
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  color: rgba(106, 106, 106, 0.5);
}

.input-field:focus {
  outline: none;
}

.menu__popup-title {
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  color: #090909;
  font-stretch: 151%;
}

.menu__navigation {
  overflow-y: overlay;
}

.menu__status {
  padding: 16px;
  background: #090909;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
}

.menu__status p {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.menu__status img {
  display: block;
}

.menu__user-status-text {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.menu__user-name,
.menu__phone-number {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 4px;
}

.menu__user-name p,
.menu__phone-number p {
  font-size: 16px;
  line-height: 120%;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.menu__user-status {
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.menu__user-header {
  position: absolute;
  width: 100%;
  bottom: 288px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(2, 19px);
  gap: 8px 0;
  padding: 6px 20px;
  color: #F9F9F9;
}

.menu__title {
  font-weight: 750;
  font-size: 26px;
  line-height: 31px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.menu__genius-state {
  position: absolute;
  bottom: 60px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu__user-info {
  height: 100%;
  background: linear-gradient(178.93deg, rgba(9, 9, 9, 0.35) 0.92%, rgba(9, 9, 9, 0.3) 0.92%, rgba(9, 9, 9, 0.1) 99.08%);
  position: relative;
}

.menu__background {
  height: 100%;
}

.menu__general {
  background: #F5F5F5;
}

.menu__profile {
  position: fixed;
  height: 400px;
  background: #5437FF;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
}
</style>