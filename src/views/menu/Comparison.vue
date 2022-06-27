<template>
  <div class="comparison menu-subpage">
    <div class="comparison__description paragraph">
      Объединили людей и строительные процессы, а также создали
      <div class="menu__inline-button">ИЖС Genius</div>
      и
      <div class="menu__inline-button">ИЖС Стандарт</div>
      , изучив сложности реальных сделок
    </div>
    <div class="comparison__features">
      <Card
        v-for="(feature, index) in features"
        :key="index"
        color="gray"
        style="padding-right: 10px"
      >
        <div class="comparison__feature feature">
          <div class="feature__header">
            <img
              class="feature__icon"
              :src="generalStore.getImageURL(`emojis/${feature.icon}.svg`)"
            >
            <div class="feature__title" v-html="feature.title"></div>
          </div>
          <div class="feature__body">
            <div class="feature__description">{{feature.description}}</div>
            <div class="feature__warning">{{feature.warning}}</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard.vue";
import { useGeneralStore } from '../../stores/general'

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    features: [
      {
        icon: 'artist-palette',
        title: 'Выбор <br/> домов',
        description: 'с ИЖС — исследуем мир, чтобы у вас был выбор',
        warning: 'или ограничиваться проектами домов из проплаченной рекламы'
      },
      {
        icon: 'credit-card',
        title: 'Деньги <br/> и время',
        description: 'с ИЖС — Росреестр, инженеры и юрист в одном окне за 0₽',
        warning: 'или потратить 218 000₽ и 300 часов, общаясь с десятками компаний'
      },
    ]
  }),
  components: {
    Card: ContentCard,
  }
})

</script>

<style scoped>
.comparison {

}
.comparison__description {
  margin-bottom: 30px;
  font-size: 14px;
}
.comparison__features {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.feature {
  display: grid;
  grid-template-columns: 100px auto;
  grid-template-rows: 61px;
  gap: 20px;
}
.feature__header, .feature__body {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-between;
}
.feature__icon {
  height: 26px;
  width: 26px;
}
.feature__title {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.feature__description {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
}
.feature__warning {
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  color: var(--red-text);
}
</style>