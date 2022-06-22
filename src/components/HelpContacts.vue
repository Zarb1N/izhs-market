<template>
  <div class="help">
    <div class="help__items">
      <a 
        class="help__item"
        v-for="(contact, index) in items"
        :key="index"
        :href="contact.link"
      >
        <div class="help__item-text">{{contact.text}}</div>
        <img 
          class="help__item-icon"
          :src="generalStore.getImageURL(`${contact.icon}.svg`)"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
    items: [
      {
        text: 'Позвонить',
        icon: 'icons/phone-tube',
        link: 'tel:+79208779373'
      },
      {
        text: 'Написать в Telegram',
        icon: 'telegram',
        link: 'https://t.me/zarb1n'
      },
      {
        text: 'Написать в Whatsapp',
        icon: 'whatsapp',
        link: 'https://wa.me/79208779373'
      },
    ]
  })
})
</script>

<style scoped>
.help {
  background: #FFFFFF;
  border-radius: 13px;
}
.help__item {
  border-bottom: 1px solid #E0E0E080;
  display: grid;
  grid-template-columns: auto 24px;
  padding: 12px 16px;
  align-items: center;
}
.help__item:last-child {
  border-bottom: none;
}
.help__item-text {
  font-weight: 750;
  font-size: 14px;
  line-height: 120%;
  color: #090909;
}
</style>
