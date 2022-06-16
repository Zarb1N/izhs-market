<template>
<div class="house-i">
  <div class="house-i__description paragraph">Короткие описания про сервисы, стандарты и договоры</div>
  <div class="house-i__buttons">
    <MenuButton
      v-for="btn in buttons"
      :key="btn.name"
      :data="btn"
      @click="$router.push(btn.goTo)"
    >
      <img 
        v-if="btn.name === 'Мой статус'"
        src="../../assets/genius-feature.svg"
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
      {
        icon: 'shield',
        name: 'Мой статус',
        goTo: '/menu/my-state'
      },
      {
        icon: 'check-mark-button',
        name: 'Как это работает',
        goTo: '/menu/how-it-works'
      },
      {
        icon: 'safety-vest',
        name: 'ИЖС Стандарт',
        goTo: '/menu/izs-standard'
      },
      {
        icon: 'bank',
        name: 'Росреестр',
        goTo: '/menu/ros-registry'
      },
      {
        icon: 'memo',
        name: 'Договоры',
        goTo: '/menu/contracts'
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
  margin-bottom: 25px;
}
.house-i__buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>