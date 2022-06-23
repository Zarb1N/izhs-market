<template>
  <IonPage>
    <IonContent>
      <div class="menu">
        <div
          class="menu__header"
          v-if="!$route.matched.map(item => item.name)[1] === 'Меню главная'"
        >
          <img
            class="menu-subpage__back-btn"
            src="../assets/icons/arrow-left--black.svg"
            @click="() => {$router.go(-1)}"
          />
          <div class="menu__title title--primary">{{$route.matched.map(item => item.name)[1]}}</div>
        </div>
        <div class="menu__body">
          <RouterView :buttons="buttons" />
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MenuButton from "@/components/MenuButton.vue";
import { RouterView } from 'vue-router'
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  name: 'Menu',
  data: () => ({
    buttons: [
      {
        name: 'Мой статус',
        icon: 'izs-mascot-dog',
        goTo: 'my-state',
      },
      {
        name: 'Сравнение',
        icon: 'shopping-bags',
        goTo: 'comparison',
      },
      {
        name: 'Как это работает',
        icon: 'check-mark-button',
        goTo: 'how-it-works',
      },
      {
        name: 'Вопрос — ответ',
        icon: 'shooting-star',
        goTo: 'question-answer',
      },
      {
        name: 'ИЖС Стандарт',
        icon: 'safety-vest',
        goTo: 'izs-standard',
      },
      {
        name: 'Договоры',
        icon: 'memo',
        goTo: 'contracts',
      },
      {
        name: 'Росреестр',
        icon: 'bank',
        goTo: 'ros-registry',
      },
      {
        name: 'Общение',
        icon: 'speech-balloon',
        goTo: 'communication',
      },
      {
        name: 'Промокоды',
        icon: 'ticket',
        goTo: 'promocodes',
      },
      {
        name: 'Реквизиты',
        icon: 'briefcase',
        goTo: 'requisites',
      },
      {
        name: 'Партнерам',
        icon: 'necktie',
        goTo: 'for-partners',
      },
    ]
  }),
  components: {
    Button: MenuButton,
    RouterView,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})

</script>

<style>
.menu {
  height: 100%;
}
.menu-subpage {
  padding: 28px 14px 80px 14px;
}
.menu__header {
  width: 100%;
  background: linear-gradient(273.3deg, #82B9F0 0%, #96C7F9 100%);
  padding: 20px 14px 15px 14px;
  display: flex;
  gap: 10px;
}
.menu-subpage__back-btn {
  width: 32px;
  height: 32px;
}
.menu__body {
  height: 100%;
  overflow-y: auto;
}
.menu__body::-webkit-scrollbar {
  display: none;
}
.menu__inline-button {
  display: inline;
  border-bottom: 0.5px dashed rgba(0, 0, 0, 0.5);
}
</style>