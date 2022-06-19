<template>
  <IonPage>
    <IonContent>
      <div class="design-house">
    <Card title="Как это работает">
      <div
        class="numbered-list"
        v-for="(item, index) in howItWorksPoints"
        :key="index"
      >
        <div class="numbered-list__item">
          <img
            class="numbered-list__item-marker"
            :src="generalStore.getImageURL(`numbered-list/${index + 1}-in-circle.svg`)"
          >
          <div class="numbered-list__item-text">{{item}}</div>
        </div>
      </div>
    </Card>
    <div class="design-house__card">
      <div class="design-house__card-title">
        Стоимость — 12 000₽
        <img
          src="../../assets/icons/question-mark-in-circle.svg"
          @click="(event) => showPopupHint(event, '')"
        />
      </div>
      <div class="design-house__card-body">Вернем деньги обратно, если <br/> строить дом через ИЖС Маркет</div>
    </div>
    <Card title="Кто оказывает услугу?">
      <div class="design-house__card-body">
        <div class="paragraph">СтройПроект совместно с ИЖС</div>
        <div class="staff">
          <img
            class="staff__image"
            src="../../assets/default-woman-2.png"
          />
          <div class="staff__text-info">
            <div class="staff__name">Екатерина Алферова</div>
            <div class="staff__post">Юрист</div>
          </div>
        </div>
      </div>
    </Card>
    <Card title="Связаться в мессенжерах">
      <Contacts/>
    </Card>
    <div class="design-house__example">
      <img
        class="design-house__example-icon"
        src="../../assets/emojis/bookmark-tabs.svg"
      />
      <div class="design-house__example-text">Пример заключения</div>
    </div>
    <PopupHint
      tabindex="0"
      ref="popupHint"
      :style="{
        'top': `${clickCoordinates.y}px`,
        'left': `${clickCoordinates.x}px`,
        'transform': `translate(${clickCoordinates.x < windowWidth / 2 ? '0, -100%' : '-100%, -100%'})`
      }"
      v-show="isPopupHint"
      @blur="isPopupHint = false"
    >
      <div style="white-space: nowrap" v-html="popupHintText"></div>
    </PopupHint>
  </div>
    </IonContent>
  </IonPage>

</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard.vue";
import { useStore } from "@/stores/general";
import PopupHint from "@/components/PopupHint.vue";
import TgWaContacts from "@/parts/TgWaContacts.vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  data: () => ({
    generalStore: useStore(),
    isPopupHint: false,
    popupHintText: 'За дом площадью 120 м2 <br/> или 1000 рублей за 1 м2 ',
    clickCoordinates: {x: 0, y: 0},
    howItWorksPoints: [
      'Оставить заявку',
      'Пообщаться и оплатить',
      'Получить документацию'
    ]
  }),
  methods: {
    showPopupHint(event : any, text: string) {
      event.preventDefault()
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
    Card: ContentCard,
    PopupHint,
    Contacts: TgWaContacts,
IonHeader, IonToolbar, IonTitle, IonContent, IonPage
  }
})

</script>

<style scoped>
.numbered-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 7px;
}
.numbered-list__item {
  display: flex;
  gap: 4px;
  align-items: center;
}
.numbered-list__item-marker {
  height: 18px;
  width: 18px;
}
.design-house {
  display: flex;
  flex-direction: column;
  gap: 14px;
   padding: 31px 14px 30px 14px;
}
.design-house__card {
  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 15px;
  padding: 20px;
}
.design-house__card-title {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 3px;
}
.design-house__card-body {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.staff {
  display: flex;
  gap: 12px;
}
.staff__image {
  height: 38px;
  width: 38px;
  border-radius: 10px;
}
.staff__text-info {
  display: flex;
  gap: 2px;
  flex-direction: column;
}
.staff__name {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}
.design-house__contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.design-house__image {
  height: 24px;
  width: 24px;
}
.design-house__contact {
  display: flex;
  align-items: center;
  gap: 8px;
}
.design-house__example {
  display: flex;
  gap: 10px;
  padding: 14px 20px;
  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 12px;
  align-items: center;
}
.design-house__example-image {
  width: 26px;
  height: 26px;
}
.design-house__example-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
}

</style>