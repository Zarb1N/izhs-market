<template>
  <CenterPopup 
    class="application"
    :isActive="isActive"
    @close="$emit('close')"
  >
    <template v-slot:title><div class="application__title">Отправьте заявку на любую ИЖС услугу и получите цену от двух компаний</div></template>
    <div class="application__body">
      <input 
        class="application__phone-number-field"
        placeholder="Введите номер телефона"
      >
      <textarea 
        class="application__description-field"
        placeholder="Укажите, пожалуйста, в двух словах что нужно сделать"
      ></textarea>
      <div class="application__pharagraph">Или выберите уже имеющиеся услуги:</div>
      <div class="application__existing-services">
        <div 
          class="application__existing-service"
          v-for="(service, index) in services"
          :key="index"
          :style="{
            backgroundColor: service.backgroundColor,
            border: `2px solid ${service.backgroundColor}`
          }"
          :class="
            selectedServices.indexOf(service.value) === -1 
              ? 'application__existing-service--unselected' 
              : 'application__existing-service--selected'
          "
          @click="
            selectedServices.indexOf(service.value) === -1
              ? selectedServices.push(service.value)
              : selectedServices = selectedServices.filter(item => item !== service.value)
          "
        >{{service.value}}</div>
      </div>
      <div class="application__send-photo-field">+  Прикрепить фотографию (необязательно)</div>
      <div class="application__submit-btn">Отправить заявку</div>
    </div>

  </CenterPopup>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CenterPopup from "@/components/CenterPopup.vue";

export default defineComponent({
  props: [
    'isActive'
  ],
  data: () => ({
    services: [
      {
        value: 'Построить дом по референсу',
        backgroundColor: '#883FFF', 
      },
      {
        value: 'Проверить участок',
        backgroundColor: '#3CBFDC', 
      },
      {
        value: 'Реконструировать дом',
        backgroundColor: '#5437FF', 
      },
      {
        value: 'Подключить коммуникации',
        backgroundColor: '#2580D9', 
      },
      {
        value: 'Подписка на садовника',
        backgroundColor: '#65B0FF', 
      },
      {
        value: 'Ремонтные работы',
        backgroundColor: '#FE7B5E', 
      },
    ],
    selectedServices: [] as Array<string>
  }),
  components: {
    CenterPopup,
  }
})
</script>

<style scoped>
.application__phone-number-field {
  width: 100%;
  height: 49px;
  border: 1px solid #6A6A6A;
  border-radius: 60px;
  margin-top: 24px;
  margin-bottom: 12px;
  padding: 16px 24px;
}
.application__description-field {
  width: 100%;
  height: 113px;
  border: 1px solid #6A6A6A;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 24px;
  resize: none;
}
.application__pharagraph {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  margin-bottom: 16px;
}
.application__existing-services {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin-bottom: 24px;
}
.application__existing-service {
  width: min-content;
  white-space: nowrap;
  padding: 8px 12px;
  border-radius: 60px;
  color: #F9F9F9;
  font-weight: 750;
  font-size: 10px;
  line-height: 120%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: all .3s;
}
.application__existing-service--selected {
  border: 2px solid #090909 !important;
}
.application__send-photo-field {
  width: 327px;
  height: 40px;
  border: 1px dashed #6A6A6A;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}
.application__submit-btn {
  padding: 16px;
  width: 327px;
  height: 52px;
  background: #090909;
  border-radius: 60px;
  color: #F9F9F9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 750;
  font-size: 14px;
  line-height: 140%;
}
</style>