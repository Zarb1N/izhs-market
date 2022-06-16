<template>
  <div class="qa menu-subpage">
    <div class="qa__items">
      <ExtensionCard
        v-for="index in 4"
        :key="index"
        :data="questionsWithAnswers[0]"
        :isPrimaryTitle="true"
      >
        {{questionsWithAnswers[0].answer}}
      </ExtensionCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ExtensionCard from "../../components/ExtensionCard.vue";

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    questionsWithAnswers: [
      {
        title: 'Вопрос',
        answer: 'Ответ на вопрос. По оферте можно продать товар или услугу без письменного договора. Не нужно распечатывать бумаги и собирать подписи. Чтобы оферта вступила в действие, клиент должен ее акцептовать.'
      },
    ]
  }),
  components: {
    ExtensionCard,
  }
})

</script>

<style scoped>
.qa__items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

</style>