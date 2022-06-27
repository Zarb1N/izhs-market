<template>
<div class="house-i">
  <div class="house-i__description">Короткие описания про сервисы, стандарты и договоры</div>
  <div class="house-i__buttons">
    <MenuButton
      v-for="btn in buttons"
      :key="btn.name"
      :data="btn"
      :isLink="true"
      @click="$router.push(btn.goTo)"
    >
    </MenuButton>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import MenuButton from '../../components/MenuButton.vue'

export default defineComponent({
  data: () => ({
    buttons: [
      // {
      //   icon: 'shield',
      //   name: 'Мой статус',
      //   goTo: '/menu/my-state'
      // },
      {
        name: 'Как это работает',
        icon: 'how-it-works',
        goTo: '/menu/how-it-works',
      },
      {
        name: 'ИЖС Стандарт',
        icon: 'izhs-standart',
        goTo: '/menu/izhs-standart',
      },
      {
        name: 'Договоры',
        icon: 'contracts',
        goTo: '/menu/contracts',
      },
      {
        name: 'Росреестр',
        icon: 'rosreestr',
        goTo: '/menu/ros-registry',
      },
    ]
  }),
  components: {
    MenuButton,
  }
})

</script>

<style>
.house-i__description {
  margin-bottom: 32px;
  font-weight: 750;
  font-size: 14px;
  line-height: 120%;
  color: #2D2D2D;
}
.house-i__buttons {
  display: flex;
  flex-direction: column;
}
</style>