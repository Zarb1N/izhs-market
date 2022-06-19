<template>
  <IonContent>
    <div class="menu__general">
      <div class="menu__profile">
        <div class="menu__user-info">
          <img v-if="!getDeviceState.image" class="menu__background" src="@/assets/empty-avatar.svg" alt="empty-avatar">
          <img v-else :src="getDeviceState.image.path" alt="user-avatar">
          <div class="menu__user-name">
            {{ getDeviceState.name }}
          </div>
          <div class="menu__phone-number">
            {{ getDeviceState.number }}
          </div>
          <div class="menu__genius-state">
            <p class="menu__title">Мой ИЖС</p>
            <div class="menu__actions">
              <span class="menu_action">
                <img src="@/assets/add_photo.svg" alt="add_photo">
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="menu__buttons">
        <MenuButton
          v-for="(btn, index) in buttons"
          :key="index"
          :data="btn"
          @click="() => {$router.push(`/menu/${btn.goTo}`)}"
        />
      </div>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import { defineProps, onMounted } from "vue";
import MenuButton from "@/components/MenuButton.vue";
import { useStore } from "@/stores/general";
import { storeToRefs } from "pinia";

interface IButton {
  name: string
  icon: string
  goTo: string
}

defineProps<{buttons: IButton[]}>()

const store = useStore()

const { getDeviceState } = storeToRefs(store)

onMounted(async () => {
  await store.getUserState()
})

</script>

<style scoped>
.menu__title {
  font-family: Roboto Flex;
  font-size: 26px;
  font-weight: 750;
  line-height: 31px;
  letter-spacing: 0px;
  color: #F9F9F9;
  font-stretch: 151%;
  font-variation-settings: 'wdth' 151, 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}
.menu__genius-state {
  position: absolute;
  bottom: 60px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu__user-info {
  height: 100%;
  background: linear-gradient(178.93deg, rgba(9, 9, 9, 0.35) 0.92%, rgba(9, 9, 9, 0.3) 0.92%, rgba(9, 9, 9, 0.1) 99.08%);
  position: relative;
}
.menu__background {
  height: 100%;
}
.menu__general {
  display: grid;
  grid-template-rows: minmax(120px, 400px) auto;
}
.menu__profile {
  position: fixed;
  height: 400px;
  background: #5437FF;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
}
.menu__buttons {
  position: relative;
  margin-top: -24px;
  background: #F5F5F5;
  border-radius: 24px 24px 0px 0px;
  padding: 8px 20px 0px 20px;
  z-index: 100;
  grid-row: 2 / 3;
}
</style>