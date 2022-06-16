<template>
  <div class="contacts">
    <a 
      class="contact"
      :href="generalStore.telegramSupport"
    >
      <img 
        class="contact-icon"
        :src="generalStore.getImageURL('telegram.svg')"
      />
      <div class="contact-name">Написать в Telegram</div>
    </a>
    <a 
      class="contact"
      :href="generalStore.whatsappSupport"
    >
      <img 
        class="contact-icon"
        :src="generalStore.getImageURL('whatsapp.svg')"
      />
      <div class="contact-name">Написать в Whatsapp</div>
    </a>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  })
})
</script>

<style scoped>
.contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.image {
  height: 24px;
  width: 24px;
}
.contact {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>