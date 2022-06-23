<template>
  <div class="house-c-s__stages-card-wrapper without-scrollbar">
    <div class="house-c-s__stages-card">
      <div class="house-c-s__stages-card-title">Этапы</div>
      <div class="house-c-s__stages-description">
        <div
          class="house-c-s__stage-description paragraph"
          v-for="index in 3"
          :key="index"
        >
          Застройщик произведет домокомплект, а после соберет на вашем участке. Мы в свою очередь будем выезжать на стройку чтобы контролировать
          <div
            class="house-c-s__stage-description--actual"
            v-if="index === 1"
          >
            <img :src="generalStore.getImageURL('emojis/push-pin.svg')" alt="">
            Вы тут
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  data: () => ({
    generalStore: useStore()
  })
})

</script>

<style scoped>
.house-c-s__stages-card-wrapper {
  overflow-x: auto;
  margin: 0px -14px;
  padding: 0px 14px;
}
.house-c-s__stages-card {
  width: calc(3 * 210px + 2 * 25px + 2 * 20px);
  margin-bottom: 20px;
  background: #DADADA;
  box-shadow: 4px 6px 0px #914B47;
  border-radius: 15px;
  padding: 20px;
}
.house-c-s__stages-description {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 25px;
}
.house-c-s__stages-card-title {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.house-c-s__stage-description {
  min-width: 210px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
}
.house-c-s__stage-description--actual {
  display: flex;
  align-items: center;
  gap: 7px;
}

</style>