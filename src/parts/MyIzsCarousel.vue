<template>
  <div class="carousel">
    <div 
      class="card"
      v-for="card in pages"
      :key="card.title"
      v-show="generalStore.widgetsList.filter(widget => widget.id === card.id)[0].isDisplayed"
    >
      <div 
        class="card__body"
        :style="{
          backgroundImage: `url(${generalStore.getImageURL('features-cards/' + card.imageName + '.png')}`,
          justifyContent: card.textPosition
        }"
      >
        <div class="card__title">{{card.title}}</div>
        <div class="card__text">{{card.text}}</div>
      </div>
      <div class="card__footer">
        <div 
          class="card__go-to-btn"
          @click="$router.push(card.goTo)"
        >Подробнее</div>
      </div>
    </div>

    <div 
      class="card izs-index"
      v-if="generalStore.widgetsList.filter(widget => widget.id === 'izs-index')[0].isDisplayed"
    >
      <div class="card__body">
        <div class="card__title">ИЖС Индекс</div>
        <div class="card__text card__text--gray">Это как Dow Jones, только для строительных материалов</div>

        <div 
          class="izs-index__statistics statistics"
          v-if="izsIndex"
        >
          <div class="statistics__current-value">{{izsIndex.current}}</div>
          <div class="statistics__current-value-subtitle">пунктов сейчас</div>
          <div class="statistics__max-value">{{izsIndex.max}}</div>
          <div class="statistics__max-value-subtitle">было в пике</div>
          <div class="statistics__bar bar">
            <div 
              class="bar__max-value"
              :style="{height: `${100 - izsIndex.current * 100 / izsIndex.max}%`}"
            ></div>
            <div 
              class="bar__current-value"
              :style="{height: `${izsIndex.current * 100 / izsIndex.max}%`}"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div 
      class="card server-card"
      v-if="generalStore.widgetsList.filter(widget => widget.id === 'cheating')[0].isDisplayed"
    >
      <div class="card__body">
        <div class="card__title">Где тебя обманут</div>
        <div class="card__text card__text--gray">Застройщик попросит предоплату за домокомплект, а привезёт сырые доски, но деньги уже заплачены</div>
      </div>
      <div class="card__footer">
        <div class="card__solution">Посмотрите на другие стройки у застройщика</div>
        <img 
          class="card__check-mark"
          src="@/assets/temporary/check-mark.svg"
        />
      </div>
    </div>
    <div 
      class="settings"
      @click="appState.isSelectingWidgetsPopup = true"
    >
      <img 
        class="settings__icon"
        src="@/assets/icons/gear.svg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { useAppState } from "@/stores/appState";

export default defineComponent({
  data: () => ({
    generalStore: useStore(),
    appState: useAppState(),
    pages: [
      {
        imageName: 'genius-card',
        title: 'Genius',
        text: 'Начать стройку можно с участком или без него',
        textPosition: 'flex-end',
        goTo: '/menu/my-state',
        id: 'state'
      },
      {
        imageName: 'construction',
        title: 'Стройка',
        text: 'Ваша стройка ещё не началась',
        textPosition: 'flex-start',
        goTo: '/my-project',
        id: 'building'
      },
      {
        imageName: 'landscape',
        title: 'Landscape',
        text: 'Ваша стройка ещё не началась',
        textPosition: 'flex-start',
        goTo: '/landscape',
        id: 'landscape'
      }
    ]
  }),
  computed: {
    izsIndex() {
      if (this.generalStore.widgets.filter(widget => widget.id === 4).length !== 0) {
        return this.generalStore.widgets.filter(widget => widget.id === 4)[0].values
      }
      return false
    }
  },
  components: {
    Flicking,
  }
})

</script>

<style scoped>
.carousel {
  margin-left: -20px;
  margin-right: -20px;
  padding: 0px 20px;
  display: grid;
  grid-template-columns: repeat(6, min-content);
  gap: 16px;
  overflow-x: auto;
  align-items: center;
}
.card {
  width: 189px;
  height: 322px;
  background: #2D2D2D;
  border-radius: 18px;
  overflow: hidden;
}
.card__body {
  height: 238px;
  padding: 20px;
  display: flex;
  color: #F9F9F9;
  flex-direction: column;
  background-position: center;
  background-size: cover;
}
.card__title, .card__footer, .card__go-to-btn {
  font-weight: 750;
  line-height: 120%;
}
.card__title {
  font-size: 20px;
  margin-bottom: 8px;
}
.card__text {
  font-size: 12px;
}
.card__text--gray {
  color: #E0E0E0;
}
.card__footer {
  height: calc(322px - 238px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card__go-to-btn {
  width: 149px;
  height: 40px;
  background: #F9F9F9;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.izs-index .card__body {
  height: 322px;
  background-image: url('@/assets/features-cards/izs-index.svg');
}
.izs-index .card__footer {
  display: none;
}
.izs-index__statistics {
  margin-top: auto;
}
.statistics {
  display: grid;
  grid-template-columns: auto min-content;
  grid-template-rows: repeat(4, min-content);
}
.statistics__max-value, .statistics__current-value {
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
}
.statistics__max-value-subtitle, .statistics__current-value-subtitle {
  color: #E0E0E0;
}
.statistics__current-value-subtitle {
  font-size: 12px;
}
.statistics__max-value-subtitle {
  font-size: 10px;
}
.statistics__bar {
  grid-column: 2 / 3;
  grid-row: 1 / -1;
}
.bar {
  width: 20px;
  height: 95px;
  align-self: flex-end;
  margin-bottom: 4px;
  border-radius: 4px;
  overflow: hidden;
}
.bar__max-value {
  width: 100%;
  background: #5337FF;
}
.bar__current-value {
  width: 100%;
  background: #883FFF;
  border-top: 1px solid #121212;
}
.server-card .card__body {
  height: 222px;
  background-image: url('@/assets/features-cards/cheating.svg');
}
.server-card .card__footer {
  padding: 20px;
  height: calc(322px - 222px);
  display: grid;
  grid-template-columns: auto 32px;
  align-items: center;
  gap: 12px;
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #F9F9F9;
}
.settings {
  width: 46px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
}
</style>