<template>
  <div class="genius">
    <div class="genius__description">
      Инженеры все сделают, а потом подгрузят информацию, 
      не нужно платить 218 000 ₽ и тратить 380 часов личного времени
    </div>
    <div class="genius__colored-card">
      <div class="genius__colored-card-title">Genius</div>
      <div 
        class="genius-card"
        v-for="(card, index) in cards"
        :key="index"
      >
        <div class="genius-card__header">
          <div class="genius-card__title--primary">{{card.title}}</div>
          <img
            class="genius-card__image"
            :src="generalStore.getImageURL(`temporary/${card.image}`)"
          />
        </div>
        <div class="genius-card__divider"></div>
        <div class="genius-card__points">
          <div 
            class="genius-card__point"
            v-for="(point, index) in card.points"
            :key="index"
          >
            <div class="genius-card__point-header">
              <div class="genius-card__title--secondary">{{index + 1}}. {{point.name}}</div>
              <div class="genius-card__state">{{point.state ? point.state : 'Нет статуса'}}</div>
            </div>
            <div 
              class="genius-card__description"
              v-show="point.description"
            >{{point.description}}</div>
            <div class="genius-card__point-links">
              <div 
                class="genius-card__point-link"
                v-for="(link, index) in point.links"
                :key="index"
              >
                <img 
                  class="genius-card__point-link-icon"
                  :src="generalStore.getImageURL('icons/papers.svg')"
                />
                <div class="genius-card__point-link-text">{{link.text}}</div>
              </div>
            </div>
            <div class="genius-card__divider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
    cards: [
      {
        title: 'Земельный участок',
        image: 'field-with-trees.png',
        points: [
          {
            name: 'Проверьте участок',
            state: false,
            description: 'Узнайте градостроительные и юридические риски до покупки',
            links: [
              {
                text: 'Кадастрое заключение',
              }
            ]
          },
          {
            name: 'Оформите в собственность',
            state: false,
            links: [
              {
                text: 'Договор купли-продажи',
              },
              {
                text: 'Выписка из Росреестра',
              },
            ]
          },
          {
            name: 'Проверьте почву',
            state: false,
            description: 'Выберите фундамент исходя из структуры грунтов участка',
            links: [
              {
                text: 'Отчет по геологии',
              }
            ]
          },
          {
            name: 'Установите границы',
            state: false,
            description: 'Узнайте, не захватил ли сосед часть участка',
            links: [
              {
                text: 'Акт выноса границ',
              }
            ]
          },
        ]
      },
      {
        title: 'Дом',
        image: 'concrete-house.png',
        points: [
          {
            name: 'Зафиксируйте смету',
            state: false,
            links: [
              {
                text: 'Смета',
              }
            ]
          },
          {
            name: 'Оформите в собственность',
            state: false,
            links: [
              {
                text: 'Технический план ',
              },
              {
                text: 'Выписка из Росреестра',
              },
            ]
          },
          {
            name: 'Контролируйте качество ',
            state: false,
            links: [
              {
                text: 'Технадзорные отчеты',
              }
            ]
          },
        ]
      },
    ]
  })
})

</script>

<style scoped>
.genius__description {
  font-weight: 750;
  font-size: 14px;
  line-height: 120%;
  color: #2D2D2D;
  margin-bottom: 32px;
}
.genius__colored-card {
  background: linear-gradient(90deg, #C5ACFF 0%, #FBC2EB 100%);
  border-radius: 16px;
  padding: 16px 1px;
}
.genius__colored-card-title {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
  margin-bottom: 16px;
  margin-left: 16px;
}
.genius-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 1px;
}
.genius-card:last-child {
  margin-bottom: 0;
}
.genius-card__header {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.genius-card__title--primary {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #2D2D2D;
}
.genius-card__image {
  height: 32px;
  width: 32px;
  border-radius: 8px;
}
.genius-card__divider {
  width: 100%;
  height: 1px;
  background: #E0E0E0;
  margin-bottom: 16px;
}
.genius-card__point-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.genius-card__title--secondary {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #2D2D2D;
}
.genius-card__state {
  font-weight: 750;
  font-size: 10px;
  line-height: 120%;
  color: #6A6A6A;
}
.genius-card__description {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #6A6A6A;
  margin-bottom: 16px;
}
.genius-card__point-links {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  margin-bottom: 16px;
}
.genius-card__point-link {
  display: grid;
  grid-template-columns: 16px auto;
  gap: 8px;
}
.genius-card__point-link-icon {
  height: 16px;
  width: 16px;
}
.genius-card__point-link-text {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #B4B4B4;
  padding-bottom: 1px;
}
</style>