<template>
  <CenterPopup
    :isActive="isActive" 
    :isHeader="!isSent"
    @close="$emit('close')"
  >
    <template v-slot:title><div class="add-to-project__title--secondary">Уже выбрали компанию <br/> и проект дома?</div></template>
    <div class="add-to-project">
      <div
        class="add-to-project--stage-1"
        v-if="!isSent"
      >
        <div class="add-to-project__description">
          <span class="add-to-project__underlined">Сохраним</span> ваши 218 000 ₽ и 380 часов, проверим смету чтобы не обманули
        </div>
        <input 
          class="add-to-project__input-field"
          placeholder="Введите номер телефона"
          v-model="phoneNumber"
        />
        <div 
          class="add-to-project__submit-btn"
          @click="sendAnApplication()"
        >Добавить нас в проект</div>
      </div>
      <div 
        class="add-to-project--stage-2"
        v-else
      >
        <div class="add-to-project__title--primary">Ваша заявка успешно отправлена</div>
        <div 
          class="add-to-project__submit-btn"
          @click="$emit('close')"
        >Отлично</div>
      </div>
    </div>
  </CenterPopup>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CenterPopup from '@/components/CenterPopup.vue'

export default defineComponent({
  props: [
    'isActive',
  ],
  data: () => ({
    isSent: false,
    phoneNumber: '' as String,
  }),
  methods: {
    sendAnApplication() {
      console.log(this.phoneNumber)
      this.isSent = true
    }
  },
  components: {
    CenterPopup,
  }
})
</script>

<style scoped>
.add-to-project__title--secondary {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
}
.add-to-project__title--primary {
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #090909;
}
.add-to-project--stage-1 {
  margin-top: 12px;
}
.add-to-project--stage-2 {
  display: grid;
  gap: 24px;
}
.add-to-project__description {
  margin-bottom: 24px;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #2D2D2D;
}
.add-to-project__underlined {
  border-bottom: 1px solid #6A6A6A;
}
.add-to-project__input-field {
  padding: 0px 24px;
  height: 52px;
  border: 1px solid #6A6A6A;
  border-radius: 60px;
  margin-bottom: 12px;
  width: 100%;
}
.add-to-project__input-field::placeholder {
  font-weight: 750;
  font-size: 14px;
  line-height: 140%;
  color: rgba(106, 106, 106, 0.5);
}
.add-to-project__submit-btn {
  background: #090909;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 750;
  font-size: 14px;
  line-height: 140%;
  color: #F9F9F9;
  border-radius: 60px;
}
</style>