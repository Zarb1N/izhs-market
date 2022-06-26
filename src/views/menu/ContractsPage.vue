<template>
  <IonContent>
    <div class="contracts-page">
      <div class="status-bar"></div>
      <div class="navigation-bar">
        <img @click="onBack" src="@/assets/chevron-left.svg" alt="chevron-left">
        <p class="navigation-bar__title">Меню</p>
      </div>
      <section class="contracts__body">
        <h1 class="contracts__title">{{ title }}</h1>
        <p class="contracts__subtitle">Акцептуйте 2 оферты, чтобы использовать ИЖС Genius и строить дом</p>
        <div class="contracts__questions">
          <section class="contracts__question">
            <img src="@/assets/documents.svg" alt="documents">
            <div class="contracts__answer">
              <h2>Что такое оферта?</h2>
              <p>Оферта — это договор, но не нужно распечатывать и подписывать</p>
            </div>
          </section>
          <section class="contracts__question">
            <img src="@/assets/card.svg" alt="card">
            <div class="contracts__answer">
              <h2>Как использовать оферту?</h2>
              <p>Чтобы использовать обе оферты, оплатите первый этап строительства</p>
            </div>
          </section>
        </div>
        <div class="contracts__cards">
          <section class="contracts__card">
            <h3>Оферта от ИЖС Маркет для использования Genius</h3>
            <div class="contracts__card-question">
              <p>Что такое ИЖС Genius?</p>
              <span>
                ИЖС Genius - это Росреестр, геолог, кадастровый инженер, технадзор, юрист и инженер проекта в одном окне
              </span>
              <div class="contracts__card-link">
                <img src="@/assets/status-icon.svg" width="16" height="16" alt="status-icon">
                <router-link to="/menu/my-state">
                  Описание ИЖС Genius
                </router-link>
              </div>
              <div class="contracts__card-link">
                <img src="@/assets/document-link-icon.svg" alt="document-link-icon">
                <a :href="getLink('oferta_genius')">Полный текст оферты</a>
              </div>
            </div>
          </section>
          <section class="contracts__card">
            <h3>Оферта от застройщика на строительство</h3>
            <div class="contracts__card-question">
              <p>Подробнее</p>
              <span>
                Оферта на строительство содержит ответственность застройщика, сроки, смету и технические параметры
                вашего дома
              </span>
              <div class="contracts__card-link">
                <img src="@/assets/document-link-icon.svg" alt="document-link-icon">
                <a :href="getLink('oferta_build_template')">Единый шаблон оферты для всех застройщиков</a>
              </div>
            </div>
          </section>
        </div>
        <p class="contracts__footer-title">Все инженеры и Росреестр за 0 ₽ — оплатите первый этап строительства до 25
          августа и Genius активируется автоматически</p>
        <button class="button">Выбрать дом</button>
      </section>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent } from '@ionic/vue'


const router = useRouter()
const title = 'Договоры'
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

const onBack = () => router.back()
</script>

<style scoped>
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

.contracts__footer-title {
  margin: 32px 0;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.contracts__card-link {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.contracts__card-link>a {
  font-weight: 750;
  font-size: 12px;
  line-height: 14px;
  color: #007AFF;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.contracts__card-question {
  display: grid;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  margin: 0 1px 16px;
}

.contracts__card-question>span {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #6A6A6A;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  padding: 16px 0;
}

.contracts__card-question>p {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.contracts__card {
  background: #5437FF;
  border-radius: 16px;
  display: grid;
}

.contracts__card:not(:last-of-type) {
  margin-bottom: 24px;
}

.contracts__card>h3 {
  padding: 16px;
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.contracts__questions {
  padding: 32px 0;
}

.contracts__subtitle {
  margin-top: 24px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.contracts__answer {
  display: grid;
  gap: 4px;
}

.contracts__answer>p {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #6A6A6A;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.contracts__answer>h2 {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.contracts__question {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.contracts__question:not(:last-of-type) {
  margin-bottom: 24px;
}

.contracts__body {
  padding: 24px 20px;
}

.contracts__title {
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

.contracts-page {
  background: #F5F5F5;
  min-height: 100%;
}

.status-bar {
  height: 44px;
}
</style>