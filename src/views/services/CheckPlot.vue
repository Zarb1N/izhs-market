<template>
  <IonPage>
  <IonContent style="position: static; ">
    <div class="check-plot">
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
      <Card title="Стоимость — 12 000₽">
        <div class="check-plot__card-body">Вернем деньги обратно, если <br/> строить дом через ИЖС Маркет</div>
      </Card>
      <Card title="Кто оказывает услугу?">
        <div class="check-plot__card-body">
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
        <Contacts />
      </Card>
      <div class="check-plot__example">
        <img
          class="check-plot__example-icon"
          src="../../assets/emojis/bookmark-tabs.svg"
        />
        <div class="check-plot__example-text">Пример заключения</div>
      </div>
    </div>
  </IonContent>
  </IonPage>

</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard.vue";
import { useGeneralStore } from "@/stores/general";
import TgWaContacts from "@/parts/TgWaContacts.vue";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
    howItWorksPoints: [
      'Оставить заявку',
      'Пообщаться и оплатить',
      'Получить понятное заключение'
    ]
  }),

  components: {
    Card: ContentCard,
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
.check-plot {
  display: flex;
  flex-direction: column;
  gap: 14px;
   padding: 31px 14px 30px 14px;
}
.check-plot__card-body {
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

.check-plot__example {
  display: flex;
  gap: 10px;
  padding: 14px 20px;
  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 12px;
  align-items: center;
}
.check-plot__example-image {
  width: 26px;
  height: 26px;
}
.check-plot__example-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
}

</style>