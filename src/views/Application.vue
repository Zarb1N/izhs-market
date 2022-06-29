<template>
  <div class="application">
    <div class="application__header">
      <img
        class="application__back-btn"
        src="../assets/icons/arrow-left--black.svg"
        @click="$router.push(`/house/${$route.params.id}/preview/prices`)"
      />
      <div class="application__title title--primary">
        Заявка на {{ house.name }}
      </div>
    </div>
    <div class="application__body">
      <Card>
        <div class="application__main-info">
          <div class="application__main-text-info">
            <div class="application__subtitle">Застройщики</div>
            <div class="application__builders">
              <div
                class="application__builder"
                v-for="(key, index) in Object.keys(builders)"
                :key="index"
              >
                <img
                  class="application__builder-logo"
                  :src="builders[key][0].builder_info.image && builders[key][0].builder_info.image.url"
                />
                <div class="application__builder-name">
                  {{ builders[key][0].builder_info.name }}
                </div>
              </div>
            </div>
          </div>
          <img
            class="application__main-info-image"
          />
        </div>
        <div class="application__divider--horizontal"></div>
        <div class="application__what-is-next">
          <div class="application__subtitle">Что произойдет дальше?</div>
          <ul class="application__bulleted-list">
            <li>
              <div>
                Пообщаетесь и выберите застройщика
                <img
                  src="../assets/icons/question-mark-in-circle.svg"
                  @click="(e) => showPopupHint(e, 'Посмотрите на другие объекты по видеозвонку, сравните сметы и решите, с кем было приятнее общаться 😉')"
                >
              </div>
            </li>
            <li><div>Начнете строительство </div></li>
            <li>Сможете пользоваться <span class="underline-dashed">ИЖС Genius</span></li>
          </ul>
        </div>
      </Card>
      <Card>
        <div class="application__contacts">
          <div class="application__subtitle">Связаться в мессенджерах</div>
          <div class="application__contact">
            <img
              class="application__contact-image"
              :src="generalStore.getImageURL('telegram.svg')"
            />
            <div class="application__contact-name">Написать в Telegram</div>
          </div>
          <div class="application__contact">
            <img
              class="application__contact-image"
              :src="generalStore.getImageURL('whatsapp.svg')"
            />
            <div class="application__contact-name">Написать в Whatsapp</div>
          </div>
        </div>
        <div class="application__divider--horizontal"></div>
        <div class="application__questions">
          <div class="application__subtitle">Задать вопросы</div>
          <div class="application__description">Начните звонок с ответов застройщика <br/> на важные для вас вопросы</div>
          <div class="application__questions-items">
            <div
              class="application__questions-item"
              :class="question.selected ? 'application__questions-item--selected' : 'application__questions-item--unselected'"
              v-for="(question, index) in questions"
              :key="index"
              @click="question.selected = !question.selected"
            >{{question.text}}</div>
          </div>
        </div>
      </Card>
      <Card
        color="gray"
        style="box-shadow: 4px 6px 0px #000000;"
      >
        <div class="application__payment-conditions">
          <div class="application__subtitle">Условия оплаты</div>
          <div class="application__description">Материалы оплачиваеются до поставки, работы оплачиваются после приемки</div>
        </div>
        <div class="application__loyality-benefits">
          <div class="application__subtitle">Лояльность ИЖС CLUB</div>
          <div class="application__cashback-items">
            <div
              class="application__cashback-item"
              v-for="(item, index) in cashback"
              :key="index"
            >
              <div class="application__cashback-item-description">
                <div class="application__cashback-item-name">{{item.name}}</div>
                <img
                  class="application__cashback-item-hint"
                  :src="generalStore.getImageURL('icons/question-mark-in-circle.svg')"
                  v-if="item.description"
                  @click="(e) => showPopupHint(e, item.description)"
                />
              </div>
              <div class="application__cashback-item-price ruble-character">{{generalStore.formatNumber(item.cashback)}}</div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="application__summary-economy">
            <div class="application__summary-economy-text">Вы экономите</div>
            <div class="application__summary-economy-money ruble-character">{{cashback[0] && generalStore.formatNumber(cashback.map( (item: {[key: string]: any}) => item.cashback).reduce( (acc, item) => acc += item) * (-1))}}</div>
          </div>
        </div>
      </Card>
    </div>
    <div class="application__bottom-elements">
      <input
        class="application__input-telephone-number"
        placeholder="Введите номер телефона"
        v-model="phoneNumber"
      />
      <div
        class="application__create-application-btn"
        @click="sendAnApplication()"
      >Отправить</div>
    </div>

    <PopupHint
      v-show="isHint"
      tabindex="0"
      ref="popupHint"
      :style="{
        'top': `${clickCoordinates.y}px`,
        'left': `${clickCoordinates.x}px`,
        'transform': `translate(${clickCoordinates.x < windowWidth / 2 ? '0, -100%' : '-100%, -100%'})`,
        'width': '100%',
        'max-width': '45%'
      }"
      @blur="isHint = false"
    >
      <div v-html="hintText"></div>
    </PopupHint>

  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "../components/ContentCard.vue";
import PopupHint from "../components/PopupHint.vue";

export default defineComponent({
  props: [
    'house',
    'builders',
    'cashback'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    hintText: '' as string,
    isHint: false,
    clickCoordinates: {x: 0, y: 0},
    phoneNumber: '' as number | string,
    questions: [
      {
        text: 'Есть ли оплата по факту?',
        selected: false
      },
      {
        text: 'Расскажите всё',
        selected: false
      },
      {
        text: 'Можно ли купить дом по цене из Истории цен?',
        selected: false
      },
      {
        text: 'Покажите качество работ по видеозвонку',
        selected: false
      },
    ]
  }),
  methods: {
    showPopupHint(event : any, text: string) {
      this.hintText = text
      event.preventDefault()
      this.clickCoordinates = {
        x: event.x,
        y: event.y
      }
      this.$nextTick( () => {
        // @ts-ignore
        this.$refs.popupHint.$el.focus()
      })
      this.isHint = true
    },
    async sendAnApplication() {
      await fetch(`${this.generalStore.server}/applicationshouses`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          house_name: this.house.name,
          phone_number: this.phoneNumber,
          questions: this.questions.filter(question => question.selected).map(question => question.text),
          cashbacks: this.cashback,
          promocodes: [
            /*
            {
              name: "string",
              description: "string"
            }
            */
          ]
        })
      })
      const res = await fetch(`${this.generalStore.server}/states/${this.generalStore.deviceId}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          device_id: this.generalStore.deviceId,
          applications_houses_id: Number(this.$route.params.id)
        })
      })
      const data = await res.json()
      this.generalStore.deviceState = data
      this.$router.push(`/my-project/house/${this.generalStore.deviceState.applications_houses_id}`)
    },
  },
  mounted() {
  },
  computed: {
    windowWidth() {
      return window.innerWidth
    }
  },
  components: {
    Card: ContentCard,
    PopupHint
},
});
</script>

<style scoped>
.application {
  min-height: 100%;
  display: grid;
  grid-template-rows: min-content auto min-content;
}
.application__header {
  width: 100%;
  background: linear-gradient(273.3deg, #82b9f0 0%, #96c7f9 100%);
  padding: 20px 14px 15px 14px;
  display: flex;
  gap: 10px;
}
.application__back-btn {
  width: 32px;
  height: 32px;
}
.application__body {
  padding: 30px 14px calc(30px + 113px) 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 100%;
}
.application__subtitle {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.application__divider--horizontal {
  margin: 20px -20px;
  height: 1px;
  background: #EDECF2;
}

.application__main-info {
  min-height: 73px;
  display: grid;
  grid-template-columns: auto 126px;
  gap: 14px;
}
.application__main-text-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.application__builders {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.application__builder {
  display: flex;
  gap: 5px;
  align-items: center;
}
.application__builder-logo {
  height: 21px;
  width: 21px;
}
.application__main-info-image {
  max-width: 100%;
  max-height: 73px;
  align-self: center;
  justify-self: center;
  border-radius: 15px;
}
.application__what-is-next {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.application__bulleted-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.application__bulleted-list > li > div{
  display: flex;
  align-items: center;
  gap: 3px;
}
.application__contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.application__contact {
  display: flex;
  align-items: center;
  gap: 8px;
}
.application__questions-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.application__questions > .application__description {
  margin-top: 5px;
  margin-bottom: 15px;
}
.application__questions-item {
  height: 25px;
  display: flex;
  align-items: center;
  padding: 6px;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  border-radius: 8px;
  transition: all .3s;
}
.application__questions-item--selected {
  background: #C79081;
  border: 1px solid #C79081;
}
.application__questions-item--unselected {
  background: white;
  border: 1px solid #F1D6CE;
}
.application__payment-conditions {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.application__loyality-benefits {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.application__cashback-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.application__cashback-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.application__cashback-item-description {
  gap: 2px;
}
.application__cashback-item-name {
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  display: inline;
}
.application__cashback-item-hint {
  display: inline;
  position: relative;
  margin-bottom: -3px;
  margin-left: 2px;
}
.application__cashback-item-price {
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #AA2020;
  white-space: nowrap;
}
.divider {
  height: 1px;
  background: #B9B7C0;
  margin: 0px -20px;
}
.application__summary-economy {
  display: flex;
  justify-content: space-between;
}
.application__summary-economy-text {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
}
.application__summary-economy-money {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #30967E;
}
.application__bottom-elements {
  width: 100%;
  align-self: flex-end;
  position: fixed;
  bottom: 0;
}
.application__input-telephone-number {
  height: 57px;
  border: none;
  text-align: center;
  width: 100%;
  border-top: 1px solid #B5BFC9;
}
.application__input-telephone-number::placeholder {
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #A7AFB8;
}
.application__create-application-btn {
  margin-left: -14px;
  margin-right: -14px;
  height: calc(20px + 18px * 2);
  background: #439A86;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #151918;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 0;
}
</style>