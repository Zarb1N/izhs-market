<template>
  <div class="communication menu-subpage">
    <div class="communication__description">Пообщаться по сервисам <span class="underline-dashed">ИЖС Genius</span></div>
    <div class="communication__contacts">
      <div
        class="communication__contact"
        v-for="(contact, index) in contacts"
        :key="index"
      >
        <img
          class="communication__contact-image"
          :src="generalStore.getImageURL(`${contact.icon}.svg`)"
        >
        <div class="communication__contact-title">{{contact.name}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    contacts: [
      {
        icon: 'telegram',
        name: 'Написать в Telegram'
      },
      {
        icon: 'whatsapp',
        name: 'Написать в Whatsapp'
      },
    ]
  }),

})

</script>

<style scoped>
.communication__description {
  margin-bottom: 30px;
  font-size: 14px;
}
.communication__contacts {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.communication__contact {
  padding: 14px 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #F3F2F4;
  box-sizing: border-box;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 12px;
}
.communication__contact-title {
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
}
</style>