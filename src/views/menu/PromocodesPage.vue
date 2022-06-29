<template>
  <IonContent>
    <div class="promocodes-page">
      <div class="status-bar"></div>
      <div class="navigation-bar">
        <img @click="onBack" src="@/assets/chevron-left.svg" alt="chevron-left">
        <p class="navigation-bar__title">Меню</p>
      </div>
      <section class="promocodes__body">
        <h1 class="promocodes__title">{{ title }}</h1>
        <form class="promocodes__form" @submit.prevent="onSubmit">
          <section class="promocodes__form-field">
            <input class="input-field" placeholder="Введите промокод" type="text" v-model="promocode">
            <span v-if="error" class="note-message">
              <img src="@/assets/note-icon.svg" alt="note-icon">
              <p>промокод не найден</p>
            </span>
          </section>
          <button class="button" type="submit">Применить</button>
        </form>
        <!-- <section v-if="getPromocodes.length">
          <h2 class="promocodes__subtitle">Добавленные промокоды:</h2>
          <ul class="promocodes__list">
            <li v-for="promocode in getPromocodes" :key="promocode.id" class="promocodes__list-item">
              <h3>{{ promocode.name }}</h3>
              <p>{{ promocode.description }}</p>
            </li>
          </ul>
        </section> -->
        <section class="promocodes__empty">
          <img src="@/assets/tag-icon.svg" alt="tag-icon">
          <h3>Пока ничего не добавлено</h3>
        </section>
      </section>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { IonContent } from '@ionic/vue'
import { onMounted, ref } from 'vue';
import { useGeneralStore } from '@/stores/general';
import { storeToRefs } from 'pinia';

const router = useRouter()
const promocode = ref('')
const error = ref(false)
const store = useGeneralStore()
const { getUserState, fetchPromocodes, searchPromocode } = store
const { getPromocodes } = storeToRefs(store)
const title = 'Промокоды'

onMounted(async () => {
  await getUserState()
  await fetchPromocodes()
})

const onSubmit = async () => {
  error.value = false
  if (!promocode.value) return
  try {
    await searchPromocode(promocode.value)
    error.value = true
  } catch (error) {
    console.error(error);
  }
}

const onBack = () => router.back()
</script>

<style scoped>
.promocodes__empty>h3 {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.promocodes__empty {
  margin: 96px auto;
  gap: 8px;
  display: grid;
  place-items: center;
  max-width: 218px;
}

.promocodes__list-item>p {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #E0E0E0;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.promocodes__list-item>h3 {
  font-weight: 750;
  font-size: 12px;
  line-height: 15px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.promocodes__list-item::before {
  display: none;
}

.promocodes__list-item {
  background: #5437FF;
  border-radius: 12px;
  padding: 16px 16px 20px;
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}

.promocodes__list {
  margin-top: 24px;
}

.promocodes__subtitle {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.note-message>p {
  font-weight: 750;
  font-size: 10px;
  line-height: 12px;
  color: #FF6700;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.note-message {
  display: flex;
  align-items: center;
  gap: 8px;
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

.promocodes__form-field {
  display: grid;
  gap: 8px;
}

.promocodes__form {
  margin-top: 32px;
  margin-bottom: 40px;
  display: grid;
  gap: 12px;
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

.promocodes__body {
  padding: 24px 20px;
}

.promocodes__title {
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

.promocodes-page {
  background: #F5F5F5;
  min-height: 100%;
}

.status-bar {
  height: 44px;
}
</style>