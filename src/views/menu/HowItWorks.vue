<template>
  <IonContent>
    <div class="how-it-works-page">
      <div class="status-bar"></div>
      <div class="navigation-bar">
        <img @click="onBack" src="@/assets/chevron-left.svg" alt="chevron-left">
        <p class="navigation-bar__title">Меню</p>
      </div>
      <section class="how-it-works__body">
        <h1 class="how-it-works__title">{{ title }}</h1>
        <ul class="how-it-works__list">
          <li class="how-it-works__list-item">
            <p>Как начать строительство?</p>
            <section class="how-it-works__form">
              <div class="how-it-works__form-header">
                <div class="numerate">1</div>
                <p>Выберите проект дома<br> и отправьте заявку</p>
              </div>
              <div class="how-it-works__form-body">
                <button class="button">Отправить заявку</button>
              </div>
              <div class="how-it-works__form-header">
                <div class="numerate">2</div>
                <p>Оплатите первый этап строительства</p>
              </div>
              <div class="how-it-works__form-header">
                <div class="numerate">3</div>
                <p><u>Genius</u> активизируется автоматически</p>
              </div>
              <div class="how-it-works__form-header">
                <div class="numerate">4</div>
                <p>Наблюдайте на вкладке<br> Стройка</p>
              </div>
              <img class="live-example" src="@/assets/live-example.png" alt="live-example">
            </section>
          </li>
          <li v-for="item in getQuestions" :key="item.id" class="how-it-works__list-item">
            <p>{{ item.questions }}</p>
            <section class="how-it-works__form">
              <p>{{ item.answer }}</p>
            </section>
          </li>
        </ul>
      </section>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { useGeneralStore } from '@/stores/general';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent } from '@ionic/vue';

const title = 'Как это работает?'
const router = useRouter()
const store = useGeneralStore()

const { fetchQuestions } = store

const { getQuestions } = storeToRefs(store)

onMounted(async () => {
  await fetchQuestions()
})

const onBack = () => router.back()
</script>

<style scoped>
.how-it-works__form {
  display: grid;
}

.how-it-works__form>p {
  margin-top: 7px;
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #6A6A6A;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.live-example {
  margin-top: 15px;
  width: 100%;
}

.how-it-works-page {
  background: #F5F5F5;
  min-height: 100%;
}

.how-it-works__form-body {
  margin-top: 15px;
  padding: 32px 27px;
  background: #F9F9F9;
  border: 1px solid #E0E0E0;
  border-radius: 16px;
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

.how-it-works__form-header {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.how-it-works__form-header p {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.numerate {
  background: #883FFF;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  text-align: center;
  padding: 4px 9px;
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.how-it-works__list-item {
  display: grid;
  margin-bottom: 16px;
  padding: 16px 16px 24px;
  background: #FFFFFF;
  border-radius: 12px;
}

.how-it-works__list-item>p {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.how-it-works__list-item::before {
  display: none;
}

.how-it-works__list {
  margin-top: 24px;
}

.how-it-works__body {
  padding: 24px 20px;
}

.how-it-works__title {
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

.status-bar {
  height: 44px;
}
</style>