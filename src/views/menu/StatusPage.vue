<template>
  <IonContent>
    <div class="status-page">
      <div class="status-bar"></div>
      <div class="navigation-bar">
        <img @click="onBack" src="@/assets/chevron-left.svg" alt="chevron-left">
        <p class="navigation-bar__title">Меню</p>
      </div>
      <section class="status__body">
        <h1 class="status__title">{{ title }}</h1>
        <article class="status__card">
          <div class="status__card-header">
            <img src="@/assets/izhs-logo.svg" alt="izhs-logo">
            <p>{{ getDeviceState.genius_number }}</p>
          </div>
          <div class="status__card-footer">
            <div>
              <h2>ваш статус</h2>
              <p>Genius</p>
            </div>
            <div>
              <h2>активируйте до</h2>
              <p>25 августа</p>
            </div>
          </div>
        </article>
        <section class="status__subtitle">
          <h2>Привет, это Genius</h2>
          <p>Росреестр, все инженеры и юрист в одном окне, не нужно тратить 218 000 ₽ и 380 часов, общаясь с десятками
            компаний</p>
        </section>
        <section class="status__stats">
          <div class="status__stat">
            <div class="status__stat-header" style="background: #5437FF;">
              Сберегу 80 часов личного времени
            </div>
            <div class="status__stat-body">
              <span>
                <h3>Все по участку</h3>
                <p>0 ₽</p>
              </span>
              <p>Проверю почву и юридические ограничения, выясню не захватил ли сосед часть участка, оформлю в
                собственность</p>
            </div>
          </div>
          <div class="status__stat">
            <div class="status__stat-header" style="background: #FF6700;">
              Сберегу 120 часов личного времени
            </div>
            <div class="status__stat-body">
              <span>
                <h3>Все по дому</h3>
                <p>0 ₽</p>
              </span>
              <p>Проверю все ли в порядке на стройке, оформлю права собственности после завершения строительства</p>
            </div>
          </div>
          <div class="status__stat">
            <div class="status__stat-header" style="background: #883FFF;">
              Сберегу 100 часов личного времени
            </div>
            <div class="status__stat-body">
              <span>
                <h3>Инженер проекта</h3>
                <p>0 ₽</p>
              </span>
              <p>Помню историю и пожелания, экранирую от сложностей, связываю людей и процессы, общаюсь в вашем любимом
                мессенжере</p>
            </div>
          </div>
          <div class="status__stat">
            <div class="status__stat-header" style="background: #23CE6B;">
              Сберегу 40 часов личного времени
            </div>
            <div class="status__stat-body">
              <span>
                <h3>Отчет с документами</h3>
                <p>0 ₽</p>
              </span>
              <p>Подготовлю и бережно сохраню документы проекта в одном отчете</p>
            </div>
          </div>
          <div class="status__stat">
            <div class="status__stat-header" style="background: #56ABFF;">
              Сберегу 40 часов личного времени
            </div>
            <div class="status__stat-body">
              <span>
                <h3>Курьерская доставка</h3>
                <p>0 ₽</p>
              </span>
              <p>Приеду для выпуска электронной подписи, могу передать ключи от ворот и другое</p>
            </div>
          </div>
        </section>
        <section class="status__footer">
          <p>Все инженеры и Росреестр за 0 ₽ — оплатите первый этап строительства до 25 августа и Genius активируется
            автоматически</p>
          <button class="button">Выбрать дом</button>
        </section>
      </section>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const title = 'Статус'
const store = useGeneralStore()
const { getUserState } = store
const { getDeviceState } = storeToRefs(store)

onMounted(async () => {
  await getUserState()
})

const onBack = () => router.back()
</script>

<style scoped>
.status__footer>p {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 24px;
}

.status__footer {
  background: #5437FF;
  border-radius: 16px;
  padding: 16px 16px 20px;
  margin-bottom: 24px;
}

.status__stat-body {
  display: grid;
  gap: 8px;
}

.status__stat-body>p {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #6A6A6A;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status__stat-body>span {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status__stat-header {
  border-radius: 24px;
  width: fit-content;
  padding: 8px 12px;
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status__stat {
  display: grid;
  gap: 12px;
}

.status__stats {
  margin: 40px 0;
  display: grid;
  gap: 40px;
}

.status__subtitle {
  display: grid;
  gap: 12px;
}

.status__subtitle>p {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status__subtitle>h2 {
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status__card-header p {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 4px;
  color: #6A6A6A;
}

.status__card-footer>div {
  display: grid;
  gap: 4px;
}

.status__card-footer>div>p {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status__card-footer>div>h2 {
  font-weight: 700;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.2px;
  color: #6A6A6A;
}

.status__card-header {
  display: flex;
  justify-content: space-between;
}

.status__card-footer {
  display: flex;
  justify-content: space-between;
}

.status__card {
  background: linear-gradient(90deg, #C5ACFF 0%, #FBC2EB 100%), #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  display: grid;
  gap: 88px;
  margin: 20px 0 40px;
}

.button {
  background: #F9F9F9;
  font-family: 'Roboto Flex';
  border: 1px solid #F9F9F9;
  border-radius: 60px;
  width: 100%;
  padding: 15px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status__body {
  padding: 24px 20px;
}

.status__title {
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

.status-page {
  background: #F5F5F5;
  min-height: 100%;
}

.status-bar {
  height: 44px;
}
</style>