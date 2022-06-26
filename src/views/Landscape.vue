<template>
  <IonPage>
    <IonContent>
      <div class="landscape">
    <div class="landscape__header">
      <div class="landscape__title">Landscape</div>
      <div class="landscape__description">Ландшафтный дизайн вашего участка, <br/> смелый по кнопке из приложения <br/> со всем фаршем и работами</div>
    </div>
    <div class="landscape__body">
      <div class="landscape__carousel">
        <div class="landscape__carousel-items">
          <Flicking
            :options="{
              threshold: 0,
              circular: true,
            }"
            @will-change="(event) => {currentSlide = event.index}"
          >
            <div
              class="landscape__carousel-item-wrapper"
              v-for="(style, index) in landscapeStyles"
              :key="index"
            >
              <div class="landscape__carousel-item landscape-style">
                <div class="landscape-style__will-be-annonced">
                  <img
                    src="../assets/will-be-annonced-string.svg"
                  >
                </div>
                <div class="landscape-style__content">
                  <img
                    class="landscape-style__image"
                    :src="generalStore.getImageURL(`${style.image}.png`)"
                  />
                  <div class="landscape-style__name">{{style.name}}</div>
                  <div class="landscape-style__description" v-html="style.description"></div>
                </div>
              </div>
            </div>
          </Flicking>
          <div class="landscape__carousel-pagination">
            <div
              class="landscape__carousel-pagination-bullet"
              v-for="(style, index) in landscapeStyles"
              :key="index"
              :class="index === currentSlide ? 'landscape__carousel-pagination-bullet--choosed' : 'landscape__carousel-pagination-bullet--unchoosed'"
            ></div>
          </div>
        </div>
      </div>
      <div class="landcape__manager-card manager-card">
        <img
          class="manager-card__image"
          src="../assets/default-woman-1.png"
        />
        <div class="manager-card__name">Юля Нестерова</div>
        <div class="manager-card__message">Привет, я руководитель направления <br/> ИЖС Landscape — прямо сейчас <br/> усиленно работаем над запускам </div>
      </div>
    </div>
  </div>
    </IonContent>
  </IonPage>

</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  name: 'Landscape',
  data: () => ({
    generalStore: useGeneralStore(),
    currentSlide: 0,
    landscapeStyles: [
      {
        name: 'Хипстерский',
        description: 'Собраться на ламповом участке <br/> после завершения всех работ',
        image: 'happy-people'
      },
      {
        name: 'Необрутальный',
        description: 'Зародился в Великобритании, <br/> популярен в Европе и Южной Корее',
        image: 'dancing-woman'
      },
      {
        name: 'Детский',
        description: 'Секрет в том, чтобы Детский <br/> был интересным и для взрослых',
        image: 'girl-in-hat'
      },
    ]
  }),
  components: {
    Flicking,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})
</script>

<style scoped>
.landscape {
}
.landscape__header {
  padding: 20px 14px 25px 14px;
  background: #4FB364;
  width: 100%;
}
.landscape__title {
  font-weight: 700;
  font-size: 57px;
  line-height: 73px;
  text-transform: uppercase;
}
.landscape__description {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: inline;
  background: var(--dark-text);
  color: #EDEDED;
}
.landscape__body {
  padding: 30px 0px 100px 0px;

}
.landscape__carousel {
  margin-bottom: 30px;
}
.landscape__carousel-items {
}
.landscape__carousel-item-wrapper {
  width: 347px;
  margin: 0px 14px;
  box-sizing: content-box;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.landscape__carousel-item {
  width: 347px;
  height: 345px;
  background: #D6AAFF;
  box-shadow: 4px 6px 0px #000000;
  border-radius: 12px;
  pointer-events: none;
}
.landscape__carousel-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
}
.landscape__carousel-pagination-bullet {
  height: 10px;
  width: 10px;
  border-radius: 5px;
}
.landscape__carousel-pagination-bullet--unchoosed {
  background: #DFDAE3;
}
.landscape__carousel-pagination-bullet--choosed {
  background: #D6AAFF;
}
.landscape-style__will-be-annonced {
  height: 0;
  position: relative;
  pointer-events: none;
}
.landscape-style__content {
  padding: 20px 25px;
  height: 100%;
}
.landscape-style__image {
  width: 100%;
  height: 213px;
  margin-bottom: 20px;
}
.landscape-style__name {
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  margin-bottom: 2px;
}
.manager-card {
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: repeat(2, auto);
  column-gap: 12px;
  row-gap: 2px;
  padding: 0px 14px;
}
.manager-card__image {
  width: 50px;
  height: 50px;
  background: #EFF0C3;
  box-shadow: 2px 3px 0px #000000;
  border-radius: 10px;
  grid-row: 1 / -1;
}
.manager-card__name {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}
.manager-card__message {

}
</style>