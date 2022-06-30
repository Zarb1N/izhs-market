<template>
  <IonPage>
    <IonContent>
      <div class="landscape-page">
        <div class="status-bar"></div>
        <div class="landscape-page__content">
          <section class="padding-top">
            <h1 class="landscape-page__title">Landscape</h1>
            <section class="landscape-page__question" style="background: #FF6700;">
              <h3 class="title">Мечтаете о<br> красоте на вашем<br> участке?</h3>
              <img class="landscape-page__image" src="@/assets/tarantino.png" alt="tarantino">
            </section>
            <section class="landscape-page__question" style="background: #5437FF;">
              <h3 class="title">Встречайте — Неоклассический под ключ от ИЖС</h3>
              <p class="price">1 267 000 ₽</p>
              <h3 class="dimmed">Для ровного участка в 10 соток</h3>
            </section>
          </section>
          <Flicking :options="{
            align: { camera: '20', panel: '0' },
            inputType: ['pointer', 'mouse', 'touch'],
          }" @will-change="(event) => { currentIndex = event.index }">
            <div class="landscape-card" :style="{ backgroundColor: card.backgroundColor }"
              v-for="(card, index) of cards" :key="index">
              <img class="landscape-card__image" :src="generalStore.getImageURL(card.background + '.png')" alt="image">
              <p class="landscape-card__description" v-html="card.description"></p>
            </div>
          </Flicking>
          <CarouselPagination :items="cards.length" :currentItem="currentIndex" />
          <section class="padding-bottom">
            <div class="landscape-page__filter">
              <h2 class="subtitle">Привезем и сделаем:</h2>
              <div class="landscape-page__filter-items">
                <div v-for="filter in filters" :key="filter.title" class="landscape-page__filter-item">
                  {{ filter.title }}
                </div>
              </div>
              <h2 class="subtitle dimmed-dark">
                Достаточно загрузить фото участка и получить точную стоимость
              </h2>
            </div>
            <section class="landscape-page__form">
              <div class="landscape-page__form-header">
                <h2 class="subtitle">Неоклассический под ключ</h2>
                <img src="@/assets/Landscape-icon.png" alt="Landscape-icon">
              </div>
              <div class="landscape-page__form-body">
                <div class="landscape-page__form-body-header">
                  <h3>1. Загрузите фото участка</h3>
                  <p>Ожидание</p>
                </div>
                <section class="landscape-page__form-files">
                  <div class="landscape-page__form-file">
                    <img src="@/assets/file-placeholder.svg" alt="file-placeholder">
                    <p>Ваши фото</p>
                  </div>
                  <div class="landscape-page__form-file">
                    <img src="@/assets/file-placeholder.svg" alt="file-placeholder">
                    <p>Кадастровый номер</p>
                  </div>
                </section>
                <button @click="onShowPopup" class="button">
                  Отправить заявку
                </button>
                <div class="divider"></div>
                <div class="landscape-page__form-body-header">
                  <h3>2. Оплатите 8 000 рублей</h3>
                  <p class="inactive">Нет статуса</p>
                </div>
                <ul class="landscape-page__form-list">
                  <li>Разместим Неклассический на участке с учетом пожеланий</li>
                  <li>Сообщим до оплаты, если цена будет сильно больше типовой</li>
                </ul>
                <section class="landscape-page__form-files">
                  <div class="landscape-page__form-file">
                    <img src="@/assets/file-placeholder.svg" alt="file-placeholder">
                    <p>Проект и стоимость</p>
                  </div>
                  <div class="landscape-page__form-file">
                    <img src="@/assets/file-placeholder.svg" alt="file-placeholder">
                    <p>Оферта на Landscape</p>
                  </div>
                </section>
                <div class="divider"></div>
                <div class="landscape-page__form-body-header">
                  <h3>3. Оплатите 50%</h3>
                  <p class="inactive">Нет статуса</p>
                </div>
                <div class="plain-text">
                  Комплектуем и выезжаем, можем захватить ключи и начать самостоятельно даже без вашего участия 🙂
                </div>
                <section class="landscape-page__form-files">
                  <div class="landscape-page__form-file">
                    <img src="@/assets/file-placeholder.svg" alt="file-placeholder">
                    <p>Строительные отчеты</p>
                  </div>
                </section>
                <div class="divider"></div>
                <div class="landscape-page__form-body-header">
                  <h3>4. Принимайте красоту, оплачивайте остаток<br> и пользуйтесь</h3>
                  <p class="inactive">Нет статуса</p>
                </div>
                <img class="landscape-page__form-image" src="@/assets/happy-tarantino.png" alt="happy-tarantino">
              </div>
            </section>
            <button @click="onShowPopup" class="button">
              Отправить заявку
            </button>
          </section>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { IonContent, IonPage } from '@ionic/vue';
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import CarouselPagination from "../components/CarouselPagination.vue";
import { useGeneralStore } from '@/stores/general';
import { ref } from 'vue';
import { useAppState } from '@/stores/appState';

const generalStore = useGeneralStore()

const filters = [
  {
    title: 'Газон'
  },
  {
    title: 'Мебель'
  },
  {
    title: 'Перголу'
  },
  {
    title: 'Освещение'
  },
]

const cards = ref([
  {
    background: 'Frame',
    backgroundColor: '#56ABFF',
    description: 'Неоклассический —<br> работа Натальи Денисовой и итальянского бюро Sandra Marchesi Architetto'
  },
  {
    background: 'Frame',
    backgroundColor: '#883FFF',
    description: 'Отдыхайте под солнечным небом, а в дождливую погоду укройтесь тентом'
  },
  {
    background: 'Frame',
    backgroundColor: '#5437FF',
    description: 'Кресла и диваны - широкие, упругие и износостойкие'
  },
  {
    background: 'Frame',
    backgroundColor: '#090909',
    description: 'Куда же без дачного костра, только у вас в европейском дизайне и чистоте'
  },
  {
    background: 'Frame',
    backgroundColor: '#FF6700',
    description: 'Рулонный газон, как в лучших домах Лондона и Парижа'
  },
])

const store = useAppState()

const onShowPopup = () => {
  store.isRequestPopup = true
}

const currentIndex = ref(0)
</script>

<style scoped>
.landscape-page__form-image {
  width: 100%;
  margin-top: 16px;
}

.plain-text {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #6A6A6A;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin: 16px 0;
}

.landscape-page__form-list>li::before {
  background: #6A6A6A;
  margin-left: 6px;
  margin-right: 5px;
}

.landscape-page__form-list>li {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #6A6A6A;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 16px;
}

.landscape-page__form-list {
  margin: 16px 0;
}

.inactive {
  color: #6A6A6A !important;
  white-space: nowrap;
  margin-top: 3px;
  margin-bottom: auto;
}

.divider {
  height: 1px;
  width: 100%;
  background: #E0E0E0;
  margin: 16px 0;
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

.landscape-page__form-file>p {
  font-weight: 750;
  font-size: 12px;
  line-height: 14px;
  color: #B4B4B4;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.landscape-page__form-file {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.landscape-page__form-files {
  display: grid;
  gap: 8px;
  margin: 16px 0;
}

.landscape-page__form-body-header>p {
  font-weight: 750;
  font-size: 10px;
  line-height: 12px;
  color: #34C759;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.landscape-page__form-body-header>h3 {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.landscape-page__form-body-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 36px;
}

.landscape-page__form-body {
  padding: 16px 16px 32px;
  background: #FFFFFF;
  border-radius: 16px;
}

.landscape-page__form {
  background: linear-gradient(90deg, #C5ACFF 0%, #FBC2EB 100%);
  border-radius: 16px;
  padding: 16px 1px;
  margin: 32px 0;
}

.landscape-page__form-header img {
  width: 32px;
  height: 32px;
}

.landscape-page__form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 15px;
  margin-bottom: 16px;
}

.dimmed-dark {
  color: #2D2D2D !important;
}

.landscape-page__filter-item {
  padding: 7px 15px;
  border: 1px solid #6A6A6A;
  border-radius: 32px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.landscape-page__filter-items {
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
}

.padding-bottom {
  padding: 16px 20px 48px;
}

.subtitle {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.padding-top {
  padding: 24px 20px 0;
}

.landscape-card__description {
  position: absolute;
  bottom: 20px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.landscape-card__image {
  width: 231px;
  height: 208px;
  position: absolute;
  top: 16px;
  left: 52px;
}

.landscape-card {
  padding: 20px;
  width: 335px;
  height: 320px;
  border-radius: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price {
  margin-top: 24px;
  margin-bottom: 4px;
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #E0E0E0;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.dimmed {
  color: #E0E0E0;
  line-height: 18px;
}

.landscape-page__question>.title {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.landscape-page__image {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}

.landscape-page__question {
  padding: 20px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.landscape-page__title {
  margin-bottom: 24px;
  font-weight: 750;
  font-size: 26px;
  line-height: 31px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.status-bar {
  height: 44px;
}

.landscape-page {
  background: #F5F5F5;
  min-height: 100%;
}
</style>