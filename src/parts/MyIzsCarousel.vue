<template>
  <div class="home-section__carousel">
    <Flicking :options="{
      align: {camera: '20', panel: '0'}, 
      bound: false, 
      threshold: 0
    }">
      <div 
        class="my-izs__card my-izs__card--my-state"
      >
        <div></div>
        <img src="" alt=""> 
        <div>
          <div>
            <div>Genius</div>
            <!-- <img src="@/assets/default-man-1.png" alt=""> -->
          </div>
          <div>Начать стройку можно с участком или без него</div>
        </div>
        <div 
          class="my-izs__button"
        >Подробнее</div>
      </div>
      <div class="my-izs__card my-izs__card--construction">
        <div>
          <div>Стройка</div>
          <div>Ваша стройка еще не началась</div>
          <!-- <img src="" alt="">  -->
        </div>
        <div 
          class="my-izs__button"
        >Подробнее</div>
      </div> 
      <div class="my-izs__card my-izs__card--landscape">
        <div>
          <div>Landscape</div>
          <div>Ваша стройка еще не началась</div>
        </div>
        <div 
          class="my-izs__button"
          @click="() => {$router.push('/landscape')}"
        >Подробнее</div>
      </div> 
      <div class="my-izs__card my-izs__card--izs-index">
        <div>
          <div>ИЖС Индекс</div>
          <div>Это как Dow <br/> Jones, только для <br/> строительных <br/> материалов</div>
        </div>
        <div>
          <div>
            <div>
              <div>1234</div>
              <div>пунктов <br/> сейчас</div>
            </div>
            <div>
              <div>1700</div>
              <div>было в пике</div>
            </div>
          </div>
          <div class="bar">
            <div class="bar__max-value"></div>
            <div class="bar__current-value"></div>
          </div>
        </div>
      </div>
      <div class="my-izs__card my-izs__card--cheating">
        <div>
          <div>Где тебя обманут</div>
          <div>Застройщик <br/> попросит <br/> предоплату за <br/> домокомплект, а <br/> привезет сырые <br/> доски, но деньги <br/> уже заплачены</div>
        </div>
        <div>
          <div>Посмотрите <br/> на другие <br/> стройки у <br/> застройщика</div>
          <img src="@/assets/temporary/check-mark.svg"/>
        </div>
      </div> 
      <div class="settings-card">
        <img src="@/assets/icons/gear.svg">
      </div>
    </Flicking>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  }),

  components: {
    Flicking,
  }
})

</script>

<style scoped>
.my-izs__card {
  height: 322px;
  width: 182px;
  border-radius: 16px;
  box-shadow: 8px 8px 24px rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.my-izs__card:first-child {
  margin-left: 20px;
}
.my-izs__button {
  width: 100%;
  height: 40px;
  background: var(--white-text);
  border-radius: 20px;
  display: grid;
  align-items: center;
  justify-content: center;
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #090909;
  font-stretch: 151;
}
.my-izs__card--my-state {
  background: #090909 url('@/assets/features-cards/genius-card.svg')  no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: var(--white-text);
}
.my-izs__card--my-state div:nth-child(1) {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
}
.my-izs__card--my-state div:nth-child(2) {
  margin-bottom: 24px;
}
.my-izs__card--my-state div:nth-child(2) div:nth-child(1) {
  font-family: 'Roboto Flex';
  font-style: normal;
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
}
.my-izs__card--my-state div:nth-child(2) div:nth-child(1) {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #F9F9F9;
}
.my-izs__card--my-state > div:nth-child(3) > div:nth-child(1) {
  display: grid;
  grid-template-columns: auto min-content;
  margin-bottom: 8px;
  align-items: center;
}
.my-izs__card--my-state > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) {
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
}
.my-izs__card--my-state > div:nth-child(3) > div:nth-child(1) > img {
  width: 24px;
  height: 24px;
  border-radius: 12px;
}
.my-izs__card--my-state div:nth-child(3) div:nth-child(2) {
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  color: var(--lightgray-text);
}
.my-izs__card--construction {
  background: url('@/assets/features-cards/construction.svg') no-repeat right bottom;
} 
.my-izs__card--landscape {
  background: url('@/assets/features-cards/landscape.svg') no-repeat bottom;
}
.my-izs__card--construction, .my-izs__card--landscape {
  background-color: #787878;
}
.my-izs__card--construction > div:nth-child(1),
.my-izs__card--landscape >  div:nth-child(1) {
  display: flex;
  flex-direction: column;
}
.my-izs__card--construction > div:nth-child(1) > div:nth-child(1), 
.my-izs__card--landscape > div:nth-child(1) > div:nth-child(1) {
  font-weight: 750;
  font-size: 20px;
  line-height: 120%;
  color: #F9F9F9;
  margin-bottom: 8px;
}
.my-izs__card--construction div:nth-child(1) div:nth-child(2), 
.my-izs__card--landscape div:nth-child(1) div:nth-child(2) {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #F9F9F9;
  font-stretch: 151;
  margin-bottom: 34px;
}
.my-izs__card--construction div:nth-child(1) img, 
.my-izs__card--landscape div:nth-child(1) img {
  align-self: center;
  height: 94px;
  width: 94px;
}
/* ----------- */
.my-izs__card--izs-index {
  background: #121212;
}
.my-izs__card--izs-index > div:nth-child(1) > div:nth-child(1) {
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: var(--white-text);
  margin-bottom: 8px;
}
.my-izs__card--izs-index > div:nth-child(1) > div:nth-child(2) {
  font-weight: 500;
  font-size: 12px;
  line-height: 125%;
  color: var(--lightgray-text)
} 
.my-izs__card--izs-index > div:nth-child(2) {
  display: grid;
  grid-template-columns: auto 20px;
}
.my-izs__card--izs-index > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) {
  margin-bottom: 16px;
}
.my-izs__card--izs-index > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(1) {
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: var(--white-text);
  margin-bottom: 4px;
}
.my-izs__card--izs-index > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) {
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  color: var(--lightgray-text);
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
  height: 20%;
}
.bar__current-value {
  width: 100%;
  height: 80%;
  background: #883FFF;
  border-top: 1px solid #121212;
}
.my-izs__card--cheating {
  background: #F24C00;
  display: flex;
}
.my-izs__card--cheating > div:nth-child(1) > div:nth-child(1) {
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  color: var(--white-text);
  margin-bottom: 8px;
}
.my-izs__card--cheating > div:nth-child(1) > div:nth-child(2) {
  font-weight: 500;
  font-size: 12px;
  line-height: 125%;
  color: var(--lightgray-text);
}
.my-izs__card--cheating > div:nth-child(2) {
  display: grid;
  grid-template-columns: auto 24px;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 125%;
  color: var(--lightgray-text);
}
.settings-card {
  width: 96px;
  height: 322px;
  border: 1px solid rgba(9, 9, 9, 0.3);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>