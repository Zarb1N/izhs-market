<template>
  <IonContent>
    <div class="my-state menu-subpage">
      <div class="my-state__states without-scrollbar">
        <div class="my-state__state">
          <div class="my-state__state-card my-state__state-card--genius">
            <div class="my-state__state-card-row">
              <img 
                class="my-state__state-card-logo"
                src="../../assets/izs-logo--blue.svg"
              />
              <div class="my-state__state-card-number">3249</div>
            </div>
            <div class="my-state__state-card-row">
              <div class="my-state__state-valid-until">
                <div class="my-state__state-subtitle">Действует до</div>
                <div class="my-state__state-valid-until-date">15.09.21</div>
              </div>
              <div class="my-state__state-name-field">
                <div class="my-state__state-subtitle">Ваш статус</div>
                <div class="my-state__state-name">Genius</div>
              </div>
            </div>
          </div>
          <div class="my-state__state-description">Все сервисы из списка ниже <br/> полностью онлайн и за 0 ₽, <br/> вы экономите 218 000 ₽</div>
        </div>
        <div class="my-state__state">
          <div class="my-state__state-card">
            <div class="my-state__state-card-row">
              <img 
                class="my-state__state-card-logo"
                src="../../assets/izs-logo--gray.svg"
              />
              <div class="my-state__state-card-number"></div>
            </div>
            <div class="my-state__state-card-row">
              <div class="my-state__state-valid-until">
                <div class="my-state__state-subtitle">Действует до</div>
                <div class="my-state__state-valid-until-date">16.09.21</div>
              </div>
              <div class="my-state__state-name-field">
                <div class="my-state__state-subtitle"></div>
                <div class="my-state__state-name">Базовый</div>
              </div>
            </div>
          </div>
          <div class="my-state__state-description">Все сервисы из списка <br/> полностью онлайн <br/> за 218 000 ₽</div>
        </div>
      </div>
      <div class="my-state__divider"></div>
      <Card class="my-state__description" color="white">
        <div class="paragraph">Росреестр, геолог, кадастровый инженер, технадзор, юрист и инженер проекта в одном окне вашего мобильного приложения</div>
      </Card>
      <div class="my-state__genius-features">
        <ExtensionCard
          v-for="feature in geniusFeatures"
          :key="feature.icon"
          :data="feature"
          theme="gray-white"
        >
          <div class="e-card__body-items paragraph">
            <div 
              class="e-card__body-item"
              v-for="(item, index) in feature.body"
              :key="index"
            >
              <ul 
                class="e-card__bulleted-list-items"
                v-if="item.type === 'bulleted-list'"
              >
                <li
                  v-for="(point, index) in item.content"
                  :key="index"
                >
                  <div class="e-card__bulleted-list-item">
                    <div class="paragraph">{{point.text}}</div>
                    <img 
                      style="display: inline-block; position: relative; top: -1px;"
                      v-if="point.hint"
                      src="../../assets/icons/question-mark-in-circle.svg" 
                      @click="(event) => showPopupHint(event, point.hint)"
                    />

                  </div>
                </li>
              </ul>
              <div 
                class="e-card__paragraph"
                v-if="item.type === 'paragraph'"
              >
                <span class="paragraph">{{item.content}}</span>
                <img 
                  style="display: inline-block; position: relative; top: 4px; left: 2px"
                  v-if="item.hint"
                  src="../../assets/icons/question-mark-in-circle.svg" 
                  @click="(event) => showPopupHint(event, item.hint)"
                />
              </div>
            </div>
          </div>
        </ExtensionCard>
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
          <div 
            class="paragraph"
            v-html="popupHintText"
          ></div>
        </PopupHint>
      </div>
    </div>
  </IonContent>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard.vue";
import ExtensionCard from "../../components/ExtensionCard.vue";
import PopupHint from "@/components/PopupHint.vue";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    isPopupHint: false,
    popupHintText: '',
    clickCoordinates: {x: 0, y: 0},
    geniusFeatures: [
      {
        icon: 'house',
        title: 'Все по дому',
        body: [
          {
            type: 'bulleted-list',
            content: [
              {
                text: 'Технический надзор',
                hint: 'Можно выбрать технадзор из нашего списка или пригласить другую компанию'
              },
              {
                text: 'Подготовка технического плана и оформление в собственность',
              }
            ]
          },
        ]
      },
      {
        icon: 'green-circle',
        title: 'Все по участку',
        body: [
          {
            type: 'bulleted-list',
            content: [
              {text: 'Геология участка'},
              {text: 'Градостроительная и юридическая экспертиза'},
              {text: 'Проверка границ участка на местности'},
              {text: 'Проверка границ участка на местности'},
              {
                text: 'Оформление в собственность',
                hint: 'Если участок еще не в собственности'
              }

            ]
          }
        ]
      },
      {
        icon: 'ribbon',
        title: 'Инженер проекта',
        body: [
          {
            type: 'paragraph',
            content: 'Помнит историю и пожелания, экранирует от сложностей, связывает людей и процессы, общается в вашем любимом мессенжере'
          }
        ]
      },
      {
        icon: 'scroll',
        title: 'Отчет с документами',
        body: [
          {
            type: 'paragraph',
            content: 'Подготовим и бережно сохраним все документы проекта в одном отчете'
          }
        ]
      },
      {
        icon: 'delivery-truck',
        title: 'Курьерская доставка',
        body: [
          {
            type: 'paragraph',
            content: 'Выпустим электронную подпись, заберем ключи от ворот',
          }
        ]
      },
      {
        icon: 'counterclockwise-arrows-button',
        title: 'Замена застройщика',
        body: [
          {
            type: 'paragraph',
            content: 'Если что-то пойдет не так, то застройщик вернет остаток средств, а вы продолжите с другой компанией без изменения стоимости',
            hint: 'Услуга оказывается для проектов домов с двумя застройщиками из Истории цен, оплата материалов осуществляется по ценам на момент их покупки, оплата работ — без изменения их стоимости'
          }
        ]
      },
    ]
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
    Card: ContentCard,
    ExtensionCard,
    PopupHint,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})

</script>

<style scoped>
.my-state {
}
.my-state__states {
  margin-bottom: 20px;
  display: flex;
  overflow-x: auto;
  gap: 15px;
  margin-left: -14px;
  width: calc(100% + 14px * 2);
  padding: 0px 14px;
}
.my-state__state {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.my-state__state-card {
  height: 112px;
  width: 263px;
  filter: drop-shadow(0px 12px 24px rgba(91, 104, 113, 0.16));
  border-radius: 20px;
  background: url('../../assets/gray-card-background.svg');
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 18px 9px 17px;
}
.my-state__state-card--genius {
  background: url('../../assets/blue-card-background.svg');
}
.my-state__state-card-row {
  display: flex;
  justify-content: space-between;
}
.my-state__state-card-logo {
  margin-left: -3px;
}
.my-state__state-card-number {
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 5px;
  font-weight: 600;
}
.my-state__state-name-field, .my-state__state-valid-until {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.my-state__state-subtitle {
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
}
.my-state__state-valid-until-date {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.my-state__state-name {
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
}
.my-state__state-description {
  margin-left: 17px;
}
.my-state__divider {
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
}
.my-state__description {
  margin-bottom: 14px;
}
.my-state__genius-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.e-card__bulleted-list-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.e-card__bulleted-list-item {
  gap: 2px;
  display: flex;
  align-items: center;
}
</style>