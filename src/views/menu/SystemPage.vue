<template>
  <IonContent>
    <div class="system-page">
      <div class="status-bar"></div>
      <div class="navigation-bar">
        <img @click="onBack" src="@/assets/chevron-left.svg" alt="chevron-left">
        <p class="navigation-bar__title">Меню</p>
      </div>
      <section class="system-page__body">
        <h1 class="system-page__title">{{ title }}</h1>
        <ul class="system-page__list">
          <li @click="onShowPopup" class="system-page__list-item" style="background: #883FFF;">
            <h2>Девелоперам</h2>
            <p>Строительство загородных посёлков и домов</p>
            <img class="system-page__list-item-img" style="width: 121px;" src="@/assets/for-developers.png"
              alt="for-developers">
          </li>
          <li @click="onShowPopup" class="system-page__list-item" style="background: #5437FF;">
            <h2>Строителям</h2>
            <p>Строительство загородных домов с предоплатой</p>
            <img class="system-page__list-item-img" style="width: 90px; right: 13px;" src="@/assets/for-builders.png"
              alt="for-developers">
          </li>
          <li @click="onShowPopup" class="system-page__list-item" style="background: #56ABFF;">
            <h2>Специалистам</h2>
            <p>Технадзор, проектирование ландшафтный дизайн</p>
            <img class="system-page__list-item-img" style="width: 91px; right: 10px;" src="@/assets/for-specialist.png"
              alt="for-developers">
          </li>
        </ul>
      </section>
    </div>
    <BottomPopup :is-active="isPopupShown" @close="isPopupShown = false">
      <template #title>
        <p class="status-bar__modal-title">Связаться <br />в мессенжерах</p>
      </template>
      <section class="status-bar__modal-body">
        <ul>
          <li class="status-bar__modal-contact">
            <a :href="`tel:${getLink('number')}`" target="_blank">
              <p>Позвонить</p>
              <img src="@/assets/tel-icon.svg" alt="tel-icon">
            </a>
          </li>
          <div class="divider"></div>
          <li class="status-bar__modal-contact">
            <a :href="getLink('telegram')" target="_blank">
              <p>Написать в Telegram</p>
              <img src="@/assets/telegram-icon.svg" alt="telegram-icon">
            </a>
          </li>
          <div class="divider"></div>
          <li class="status-bar__modal-contact">
            <a :href="getLink('whatsapp')" target="_blank">
              <p>Написать в Whatsapp</p>
              <img src="@/assets/whatsapp-icon.svg" alt="whatsapp-icon">
            </a>
          </li>
        </ul>
      </section>
    </BottomPopup>
  </IonContent>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import BottomPopup from '../../components/BottomPopup.vue';
import { useGeneralStore } from '../../stores/general'
import { storeToRefs } from 'pinia';
import { IonContent } from '@ionic/vue'

const title = 'Развивайте бизнес вместе с ИЖС Маркет'

const isPopupShown = ref(false)
const router = useRouter()
const store = useGeneralStore()
const { fetchSystem } = store
const { getSystems } = storeToRefs(store)

onMounted(async () => {
  await fetchSystem()
})

const getLink = (name: string) => {
  const obj = getSystems.value.find(sys => sys.name === name)
  if (!obj) return ''
  return obj.value
}

const onShowPopup = () => {
  isPopupShown.value = true
}

const onBack = () => router.back()

</script>

<style scoped>
.divider {
  background: #E0E0E0;
  opacity: 0.5;
  height: 1px;
  width: 100%;
}

.status-bar__modal-contact {
  padding: 12px 16px;
  background: #FFFFFF;
}

.status-bar__modal-contact a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.status-bar__modal-contact:first-of-type {
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
}

.status-bar__modal-contact:last-of-type {
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
}

.status-bar__modal-contact p {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status-bar__modal-contact::before {
  display: none;
}

.status-bar__modal-body {
  margin-top: 32px;
  margin-bottom: 38px;
  display: grid;
}

.status-bar__modal-title {
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.system-page__list {
  margin-top: 40px;
}

.system-page__list-item-img {
  position: absolute;
  right: 0;
  bottom: 0;
}

.system-page__list-item {
  overflow: hidden;
  display: grid;
  position: relative;
  border-radius: 16px;
  padding: 16px 16px 23px;
  gap: 8px;
  margin-bottom: 16px;
}

.system-page__list-item h2 {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.system-page__list-item p {
  max-width: 220px;
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #E0E0E0;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.system-page__list-item::before {
  display: none;
}

.system-page__title {
  font-weight: 750;
  font-size: 26px;
  line-height: 31px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.system-page__body {
  padding: 24px 20px;
}

.navigation-bar {
  display: flex;
  align-items: center;
  padding: 9px;
  gap: 5px;
}

.navigation-bar__title {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status-bar {
  height: 44px;
}
</style>