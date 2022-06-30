<template>
  <BottomPopup 
    class="popup"
    :isActive="isActive"
    @close="$emit('close')"
  >
    <template #title><div class="popup__title">Заявка</div></template>
    <div class="popup__body">
      <HelpContacts class="popup__contacts"/>
      <div class="popup__title--secondary">Условия оплаты</div>
      <div class="popup__list popup__payment-conditions">
        <div class="popup__point">
          <div class="popup__point-name">Оплата материалов</div>
          <div class="popup__point-value">До поставки</div>
        </div>  
        <div class="popup__point">
          <div class="popup__point-name">Оплата работ</div>
          <div class="popup__point-value">После приемки</div>
        </div>  
      </div>
      <div class="popup__title--secondary">Лояльность ИЖС CLUB</div>
      <div class="popup__list">
        <div class="popup__point">
          <div class="popup__point-name">Промокоды</div>
          <div 
            class="
              popup__point-value 
              popup__point-value--blue 
              popup__point-value--underline
            "
            @click="$router.push('/menu/promo-codes')"
          >Промокодов: {{generalStore.deviceState.promocodes_id && generalStore.deviceState.promocodes_id.length}}</div>
        </div>  
        <div 
          class="popup__point"
          v-for="(benefit, index) in cashback"
          :key="index"
        >
          <div class="popup__point-name">{{benefit.name}}</div>
          <div class="
              popup__point-value 
              popup__point-value--orange 
              ruble-character
            "
          >{{generalStore.formatNumber(benefit.cashback).replace('-', '— ')}}</div>
        </div>  
      </div>
      <div 
        class="popup__profit"
        v-if="finalProfit"
      >
        <div class="popup__profit-name">Вы экономите </div>
        <div class="popup__profit-value ruble-character">
          {{generalStore.formatNumber(finalProfit).replace('-', '')}}
        </div>
      </div>
      <div class="popup__form">
        <input 
          class="popup__input"
          placeholder="Введите номер телефона"
          v-maska="'+# ### ###-##-##'"
          v-model="phoneNumber"
        />
        <div 
          class="popup__submit-btn"
          @click="sendAnApplication()"
        >Начать проект</div>
      </div>
    </div>
  </BottomPopup>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import BottomPopup from "@/components/BottomPopup.vue";
import { useGeneralStore } from "@/stores/general";
import HelpContacts from "@/components/HelpContacts.vue";

export default defineComponent({
  props: [
    'cashback',
    'isActive',
    'finalProfit',
    'house'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    phoneNumber: ''
  }),
  methods: {
    async sendAnApplication() {
      console.log(this.house)
      await fetch(`${this.generalStore.server}/applicationshouses`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          house_name: this.house.name,
          phone_number: this.phoneNumber,
          cashbacks: this.cashback,
          promocodes: this.generalStore.deviceState.promocodes_id
        })
      })
      /*
      const res = await fetch(`${this.generalStore.server}/states/${this.generalStore.deviceId}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          device_id: this.generalStore.deviceId,
          applications_houses_id: Number(this.$route.params.id)
        })
      })
      const data = await res.json()
      this.generalStore.deviceState = data
      */
      this.$emit('close')
    },
  },
  components: {
    BottomPopup,
    HelpContacts,
  }
})
</script>

<style scoped>
.popup__title {
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #090909;
}
.popup__body {
  margin-top: 28px;
}
.popup__contacts {
  margin-bottom: 40px;
}
.popup__title--secondary {
  margin-bottom: 16px;
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
}
.popup__payment-conditions {
  margin-bottom: 40px;
}
.popup__list {
  display: grid;
  gap: 12px;
}
.popup__point {
  display: grid;
  grid-template-columns: auto min-content;
}
.popup__point-name {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #6A6A6A;
}
.popup__point-value {
  white-space: nowrap;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #090909;
}
.popup__point-value--blue {
  color: #007AFF;
} 
.popup__point-value--underline {
  text-decoration: underline;
}
.popup__point-value--orange {
  color: #FF6700;
}
.popup__profit {
  margin-top: 27px;
  display: grid;
  grid-template-columns: auto min-content;
  margin-bottom: 40px;
}
.popup__profit-name {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #2D2D2D;
}
.popup__profit-value {
  white-space: nowrap;
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #23CE6B;
}
.popup__form {
  display: grid;
  gap: 12px;
}
.popup__input {
  width: 100%;
  height: 49px;
  border: 1px solid #6A6A6A;
  border-radius: 60px;
  padding: 16px 24px;
  outline: none;
}
.popup__input::placeholder {
  font-weight: 750;
  font-size: 14px;
  line-height: 120%;
  color: rgba(106, 106, 106, 0.5);
}
.popup__submit-btn {
  height: 49px;
  background: #090909;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 750;
  font-size: 14px;
  line-height: 120%;
  color: #F9F9F9;
}
</style>