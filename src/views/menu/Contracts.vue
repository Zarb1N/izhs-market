<template>
  <div class="contracts menu-subpage">
    <div class="contracts__description">Акцептуйте 2 оферты, чтобы использовать ИЖС Genius и строить дом</div>
    <div class="contracts__short-questions-and-answers">
      <div
        class="contracts__short-question-and-answer"
        v-for="(qa, index) in questionsAndAnswers"
        :key="index"
      >
        <img
          class="contracts__icon"
          :src="generalStore.getImageURL(`emojis/${qa.icon}.svg`)"
        />
        <div class="contracts__question">{{qa.question}}</div>
        <div class="contracts__answer">{{qa.answer}}</div>
      </div>
    </div>
    <div class="contacts__extension-cards">
      <ExtensionCard
        title="Oферта от ижс маркет для использования genius"
        :titleStyle="{
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '15px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }"
        :theme="'gray-white'"
        :headerHeight="'58px'"
      >
        <div class="contracts__short-question-and-answer">
          <img
            class="contracts__icon"
            :src="generalStore.getImageURL(`emojis/shooting-star.svg`)"
          />
          <div class="contracts__question">Что такое ИЖС Genius?</div>
          <div class="contracts__answer">ИЖС Genius - это Росреестр, геолог, кадастровый инженер, технадзор, юрист и инженер проекта в одном окне </div>
          <div class="external-links">
            <div class="external-link">Описание ИЖС Genius</div>
            <div class="external-link">Полный текст аферты</div>
          </div>
        </div>

      </ExtensionCard>
      <ExtensionCard
        title="Оферта от застройщика на строительство"
        :titleStyle="{
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '15px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }"
        :theme="'gray-white'"
      >
        <div class="contracts__short-question-and-answer">
          <img
            class="contracts__icon"
            :src="generalStore.getImageURL(`emojis/shooting-star.svg`)"
          />
          <div class="contracts__question">Подробнее</div>
          <div class="contracts__answer">Оферта будет опубликована на вкладке Мой проект после согласованиясметы строительства </div>
          <div class="external-links">
            <div class="external-link">Полный текст аферты</div>
          </div>
        </div>
      </ExtensionCard>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import ExtensionCard from '../../components/ExtensionCard.vue'

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    generalStore: useStore(),
    questionsAndAnswers: [
      {
        icon: 'shooting-star',
        question: 'Что такое оферта?',
        answer: 'Оферта - это договор, но не нужно распечатывать и подписывать',
      },
      {
        icon: 'shooting-star',
        question: 'Как акцептовать оферту?',
        answer: 'Чтобы подтвердить наши оферты, оплатите первый этап строительства',
      },
    ],
  }),
  components: {
    ExtensionCard,
  }
})

</script>

<style scoped>
.contracts__description {
  margin-bottom: 30px;
  font-size: 14px;
}
.contracts__short-questions-and-answers {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}
.contracts__short-question-and-answer {
  display: grid;
  grid-template-columns: 32px auto;
  grid-template-rows: repeat(3, min-content);
  column-gap: 14px;
  row-gap: 5px;
  height: 54px;
}
.contracts__icon {
  width: 32px;
  height: 32px;
  grid-row: 1 / -1;
}
.contracts__question {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.contracts__answer {
  font-family: 'Mont';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 140%;
}
.contacts__extension-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.external-links {
  margin-top: 15px;
  display: flex;
  gap: 12px;
}
.external-link {
  text-decoration: underline;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
}
</style>