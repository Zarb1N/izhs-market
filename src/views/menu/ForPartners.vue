<template>
  <div class="for-partners menu-subpage">
    <div class="for-partners__description">Развивайте бизнес вместе с ИЖС Маркет. Направления для партнеров из разных регионов, которые хотят продавать больше.</div>
    <div class="for-partners__partners-cards">
      <div
        class="for-partners__partner-card partner-card"
        v-for="(partner, index) in partners"
        :key="index"
        :style="{background: partner.color}"
      >
        <div class="partner-card__text-info">
          <div class="partner-card__header">{{partner.title}}</div>
          <div class="partner-card__body" v-html="partner.description"></div>
        </div>
        <img
          class="partner-card__image"
          :src="generalStore.getImageURL(`${partner.image}.png`)"
        >
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
    partners: [
      {
        title: 'Девелоперам',
        description: 'Занимаетесь <br/> строительством <br/> загородных поселков',
        image: 'home1',
        color: '#EEF2F0'
      },
      {
        title: 'Cтроителям',
        description: 'Занимаетесь <br/> строительством <br/> загородных домов',
        image: 'home2',
        color: '#D9E5F1'
      },
      {
        title: 'Cпециалистам',
        description: 'Технический надзор <br/> Проектирование <br/>Ландшафтный дизайн',
        image: 'home3',
        color: '#DFF1D0'
      },
    ]
  }),
})

</script>

<style scoped>
.for-partners__description {
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 130%;
}
.for-partners__partners-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.partner-card {
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 15px;
  display: grid;
  grid-template-columns: 120px auto;
  height: 82px;
  overflow: hidden;
}
.partner-card__text-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 15px 0px 0px 20px;
}
.partner-card__header {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.partner-card__body {
  font-weight: normal;
  font-size: 8px;
  line-height: 145%;
}
.partner-card__image {
  height: 82px;
  justify-self: right;
}
</style>
