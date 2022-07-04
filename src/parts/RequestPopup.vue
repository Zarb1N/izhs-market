<template>
  <CenterPopup :is-close-button-hide="isSuccess" :isActive="isActive" @close="onClose">
    <template #title>
      <h1 class="title">{{ titleText }}</h1>
    </template>
    <section>
      <input v-if="!isSuccess" placeholder="Введите номер телефона" class="input-field" type="tel"
        v-maska="'+# ### ###-##-##'" v-model="requestPhoneNumber">
      <button @click="onSubmit" class="button">
        {{ buttonText }}
      </button>
    </section>
  </CenterPopup>
</template>

<script setup lang="ts">
import { useAppState } from '@/stores/appState';
import { useGeneralStore } from '@/stores/general';
import { storeToRefs } from 'pinia';
import { computed, defineProps, ref } from 'vue'
import CenterPopup from '../components/CenterPopup.vue'

defineProps<{
  isActive: boolean
}>()

const isSuccess = ref(false)
const appState = useAppState()
const store = useGeneralStore()
const { requestPhoneNumber } = storeToRefs(store)
const { sendRequestByPhoneNumber } = store

const onClose = () => {
  requestPhoneNumber.value = ''
  appState.isRequestPopup = false
  isSuccess.value = false
}

const buttonText = computed(() => isSuccess.value ? 'Отлично' : 'Отправить заявку')
const titleText = computed(() => isSuccess.value ? 'Ваша заявка успешно отправлена' : 'Заявка')

const onSubmit = async () => {
  if (isSuccess.value) {
    return onClose()
  }
  if (!requestPhoneNumber.value) return
  try {
    await sendRequestByPhoneNumber(requestPhoneNumber.value)
    isSuccess.value = true
  } catch (error) {
    isSuccess.value = false
    console.error(error);
  }
}
</script>

<style scoped>
.button {
  margin-top: 24px;
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

.input-field {
  margin-top: 24px;
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

.title {
  font-weight: 750;
  font-size: 20px;
  line-height: 24px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}
</style>