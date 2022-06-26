<template>
  <IonContent>
    <div class="standart-page">
      <div class="status-bar"></div>
      <div class="navigation-bar">
        <img @click="onBack" src="@/assets/chevron-left.svg" alt="chevron-left">
        <p class="navigation-bar__title">Меню</p>
      </div>
      <section class="standart__body">
        <h1 class="standart__title">{{ title }}</h1>
        <p class="standart__subtitle">Все застройщики работают по правилам ИЖС Стандарт</p>
        <ul class="standart__list">
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #23CE6B;">
              <img src="@/assets/credit-card.svg" alt="credit-card">
            </span>
            <p>Оплата работ<br> после их приёмки</p>
          </li>
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #FF6700;">
              <img src="@/assets/credit-card.svg" alt="credit-card">
            </span>
            <p>Оплата материалов до их поставки</p>
          </li>
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #5437FF;">
              <img src="@/assets/capture-icon.svg" alt="capture-icon">
            </span>
            <p>Онлайн трансляции строительства</p>
          </li>
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #56ABFF;">
              <img src="@/assets/clean-icon.svg" alt="clean-icon">
            </span>
            <p>Чистота на объекте и вывоз мусора</p>
          </li>
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #34D1BF;">
              <img src="@/assets/car-icon.svg" alt="car-icon">
            </span>
            <p>Бесплатная доставка</p>
          </li>
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #883FFF;">
              <img src="@/assets/document-icon.svg" alt="document-icon">
            </span>
            <p>Договор в виде <u @click="redirectToContracts">оферты</u></p>
          </li>
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #FF6700;">
              <img src="@/assets/smile-icon.svg" alt="smile-icon">
            </span>
            <p>Сотрудники в фирменной одежде</p>
          </li>
          <li class="standart__item">
            <span class="standart__item-icon" style="background: #56ABFF;">
              <img src="@/assets/document-icon.svg" alt="document-icon">
            </span>
            <p>Открытая маржа застройщика</p>
            <img @click="showPopup" style="margin-left: 12px;" src="@/assets/info-small.svg" alt="info-small">
          </li>
        </ul>
      </section>
      <BottomPopup :is-active="isPopupShown" @close="isPopupShown = false">
        <template #title>
          <h2 class="standart__popup-title">Открытая маржа застройщика</h2>
        </template>
        <p class="standart__popup-subtitle">В каждой смете застройщик указывает свою прибыль</p>
      </BottomPopup>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { IonContent } from '@ionic/vue'
import { ref } from 'vue';
import BottomPopup from '../../components/BottomPopup.vue';

const router = useRouter()
const title = 'ИЖС Стандарт'
const isPopupShown = ref(false)

const redirectToContracts = () => {
  router.push('/menu/contracts')
}

const showPopup = () => {
  isPopupShown.value = true
}

const onBack = () => router.back()
</script>

<style scoped>
.standart__popup-subtitle {
  margin-top: 16px;
  margin-bottom: 53px;
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.standart__popup-title {
  max-width: 277px;
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.standart__item-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.standart__item>p {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  max-width: 243px;
}

.standart__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #E0E0E0;
}

.standart__item::before {
  display: none;
}

.standart__subtitle {
  margin: 24px 0;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.standart__body {
  padding: 24px 20px;
}

.standart__title {
  font-weight: 750;
  font-size: 26px;
  line-height: 31px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
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

.standart-page {
  background: #F5F5F5;
  min-height: 100%;
}

.status-bar {
  height: 44px;
}
</style>