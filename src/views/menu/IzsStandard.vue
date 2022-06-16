<template>
  <div class="izs menu-subpage">
    <div class="izs__description">Все застройщики работают по правилам <br/> ИЖС Стандарт</div>
    <div class="izs__features">
      <div 
        class="izs__feature izs-feature"
        v-for="(feature, index) in izsFeatures"
        :key="index"
      >
        <img 
          class="izs-feature__icon"
          :src="generalStore.getImageURL(`emojis/${feature.icon}.svg`)"
        />
        <div class="izs-feature__name">
          {{feature.name}}
          <img 
            class="izs-feature__hint"
            v-if="feature.hint"
            src="../../assets/icons/question-mark-in-circle.svg"
            @click="(event) => showPopupHint(event, feature.hint)"
          />
        </div>
      </div>
    </div>
    <PopupHint
      tabindex="0"
      ref="popupHint"
      :style="{
        'top': `${clickCoordinates.y}px`,
        'left': `${clickCoordinates.x}px`,
        'transform': `translate(${clickCoordinates.x < windowWidth / 2 ? '0' : '-100%'})`,
      }"
      v-show="isPopupHint"
      @blur="isPopupHint = false"
    >
      <div style="white-space: nowrap" v-html="popupHintText"></div>
    </PopupHint>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import PopupHint from "../../components/PopupHint.vue"


export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    isPopupHint: false,
    generalStore: useGeneralStore(),
    popupHintText: '',
    clickCoordinates: {x: 0, y: 0},
    izsFeatures: [
      {
        icon: 'credit-card',
        name: 'Оплата работ после их приемки'
      },
      {
        icon: 'credit-card',
        name: 'Оплата материалов до их поставки '
      },
      {
        icon: 'video-camera',
        name: 'Онлайн трансляции строительства'
      },
      {
        icon: 'video-camera',
        name: 'Онлайн демонстрация объектов'
      },
      {
        icon: 'snowflake',
        name: 'Чистота на объекте и вывоз мусора'
      },
      {
        icon: 'delivery-truck',
        name: 'Бесплатная доставка'
      },
      {
        icon: 'memo',
        name: 'Договор в виде оферты'
      },
      {
        icon: 'safety-vest',
        name: 'Сотрудники в фирменной одежде'
      },
      {
        icon: 'open-book',
        name: 'Открытая маржа застройщика',
        hint: 'В каждой смете застройщик <br/> указывает свою прибыль'
      },
    ],
  }),
   methods: {
    showPopupHint(event : any, text: string) {
      this.popupHintText = text
      event.preventDefault()
      console.log(event.x, event.y)
      this.clickCoordinates = {
        x: event.x,
        y: event.y
      }
      this.$nextTick( () => {
        this.$refs.popupHint.$el.focus()
      })
      this.isPopupHint = true
    }
  },
  computed: {
    windowWidth() {
      return window.innerWidth
    }
  },
  components: {
    PopupHint,
  }
})

</script>

<style scoped>
.izs__description {
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 14px;
}
.izs__features {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.izs-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 11px;
  border-bottom: 1px solid #F1F0F3;
}
.izs-feature__icon {
  height: 30px;
  width: 30px;
}
.izs-feature__name {
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
  font-size: 14px;
}
</style>