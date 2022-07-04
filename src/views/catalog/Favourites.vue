<template>
  <IonContent>
    <div class="favourites">
      <div class="status-bar"></div>
      <div class="favourites__header">
        <BackButton text="Главная" />
      </div>
      <div v-if="showEmptyTemplate" class="favourites__body">
        <h1 class="favourites__title">Избранное</h1>
        <p class="favourites__subtitle">Нажмите ❤️ на карточке дома и проект появится здесь</p>
        <img class="favourites__background" src="@/assets/favourites-background.png" alt="favourites-background">
      </div>
    </div>
  </IonContent>
</template>

<script lang="ts" setup>
import BackButton from "../../components/BackButton.vue";
import { IonContent } from '@ionic/vue'
import { useGeneralStore } from "@/stores/general";
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = useGeneralStore()
const { getUserState } = store
const { getDeviceState } = storeToRefs(store)

const showEmptyTemplate = computed(() => !getDeviceState.value?.favourites_houses_id?.length)

onMounted(async () => {
  await getUserState()
})

</script>

<style scoped>
.favourites__background {
  width: 277px;
  height: 380px;
  place-self: flex-end;
}

.favourites__subtitle {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 56px;
}

.favourites__title {
  font-weight: 750;
  font-size: 26px;
  line-height: 31px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 24px;
}

.favourites__body {
  padding: 24px 20px 48px;
  display: grid;
}

.favourites__header {
  padding: 10.5px;
}

.favourites {
  min-height: 100%;
  background: #F5F5F5;
}
</style>