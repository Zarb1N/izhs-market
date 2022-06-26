<template>
  <IonContent>
    <div class="help-page">
      <div class="status-bar"></div>
      <div class="navigation-bar">
        <img @click="onBack" src="@/assets/chevron-left.svg" alt="chevron-left">
        <p class="navigation-bar__title">Меню</p>
      </div>
      <section class="help-page__body">
        <h1 class="help-page__title">{{ title }}</h1>
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
      </section>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general';
import { IonContent } from '@ionic/vue'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

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

const title = 'Помощь'

const onBack = () => router.back()
</script>

<style scoped>
.help-page__body {
  padding: 24px 20px;
}

.help-page__title {
  font-weight: 750;
  font-size: 26px;
  line-height: 31px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.help-page {
  min-height: 100%;
  background: #F5F5F5;
}

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
  margin: 32px 0;
  display: grid;
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