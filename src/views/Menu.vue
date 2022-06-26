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
        name: 'Как это работает',
        icon: 'how-it-works',
        goTo: 'how-it-works',
      },
      {
        name: 'ИЖС Стандарт',
        icon: 'izhs-standart',
        goTo: 'izhs-standart',
      },
      {
        name: 'Договоры',
        icon: 'contracts',
        goTo: 'contracts',
      },
      {
        name: 'Росреестр',
        icon: 'rosreestr',
        goTo: 'ros-registry',
      },
      {
        name: 'Помощь',
        icon: 'info',
        goTo: 'help',
      },
      {
        name: 'Промокоды',
        icon: 'promo-codes',
        goTo: 'contracts',
      },
      {
        name: 'Партнёрам',
        icon: 'partners',
        goTo: 'for-partners',
      },
      {
        name: 'Избранное',
        icon: 'favorites',
        goTo: 'communication',
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