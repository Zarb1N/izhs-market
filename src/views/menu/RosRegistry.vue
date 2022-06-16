<template>
  <div class="ros-registry menu-subpage">
    <div class="ros-registry__header">
      <div class="ros-registry__description">Акцептуйте 2 оферты, чтобы использовать ИЖС Genius и строить дом</div>
      <img 
        class="ros-registry__genius-icon"
        src="../../assets/genius-feature.svg"
      >
    </div>
    <div class="ros-registry__short-questions-and-answers">
      <div 
        class="ros-registry__short-question-and-answer"
        v-for="(qa, index) in questionsAndAnswers"
        :key="index"
      >
        <img 
          class="ros-registry__icon"
          :src="generalStore.getImageURL(`emojis/${qa.icon}.svg`)"
        />
        <div class="ros-registry__question">{{qa.question}}</div>
        <div class="ros-registry__answer">{{qa.answer}}</div>
      </div>
    </div>
    <div class="contacts__extension-cards">
      <ExtensionCard
        title="для оформления земельного участка"
        :titleStyle="{
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '15px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
          }"
      >
        <div class="ros-registry__short-question-and-answer">
          <img 
            class="ros-registry__icon"
            :src="generalStore.getImageURL(`emojis/shooting-star.svg`)"
          />
          <div class="ros-registry__question">кто подписывает?</div>
          <div class="ros-registry__answer">Покупатель и продавец</div>
          <div class="external-links">
            <div class="external-link">Шаблон договора на земельный участок</div>
          </div>
        </div>
        
      </ExtensionCard>
      <ExtensionCard
        title="для регистрации собственности на построенный дом"
        :titleStyle="{
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '15px',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }"
      >
        <div class="ros-registry__short-question-and-answer">
          <img 
            class="ros-registry__icon"
            :src="generalStore.getImageURL(`emojis/shooting-star.svg`)"
          />
          <div class="ros-registry__question">кто подписывает?</div>
          <div class="ros-registry__answer">Покупатель и кадастровый инженер </div>
          <div class="external-links">
            <div class="external-link">Пример технического плана на дом</div>
            <div class="external-link">Шаблон заявления на регистрацию дома</div>
          </div>
        </div>
      </ExtensionCard>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import ExtensionCard from '../../components/ExtensionCard.vue'

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    questionsAndAnswers: [
      {
        icon: 'shooting-star',
        question: 'как это работает?',
        answer: 'Подготовим документы, проверьте и подпишите электронной подписью',
      },
      {
        icon: 'shooting-star',
        question: 'как получить подпись?',
        answer: 'Для выпуска электронной подписи приедем в любую точку России',
      },
    ],
  }),
  components: {
    ExtensionCard,
  }
})

</script>

<style scoped>
.ros-registry__header {
  margin-bottom: 30px;
  display: flex;
  gap: 10px;
}
.ros-registry__description {
  font-size: 14px;
}
.ros-registry__short-questions-and-answers {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}
.ros-registry__short-question-and-answer {
  display: grid;
  grid-template-columns: 32px auto;
  grid-template-rows: repeat(3, min-content);
  column-gap: 14px;
  row-gap: 5px;
}
.ros-registry__icon {
  width: 32px;
  height: 32px;
  grid-row: 1 / -1;
}
.ros-registry__question {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.ros-registry__answer {
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
  flex-direction: column;
  gap: 7px;
}
.external-link {
  text-decoration: underline;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
}
</style>