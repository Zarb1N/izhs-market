<template>
  <CenterPopup 
    class="region-choosing"
    :isActive="isActive"
    @close="$emit('close')"
  >
    <template v-slot:title><div class="region-choosing__title">Регион</div></template>
    <div class="region-choosing__current-region">
      <div class="region-choosing__region-name">{{choosedRegion}}</div>
      <img 
        class="region-choosing__check-icon"
        src="@/assets/icons/green-check-in-circle.svg"
      >
    </div>
    <div class="region-choosing__divider"></div>
    <div class="region-choosing__hint">Пока недоступные регионы:</div>
    <div class="region-choosing__unable-regions">
      <div 
        class="region-choosing__region-name"
        v-for="region in regions"
        :key="region"
        v-show="region !== choosedRegion"
      >{{region}}</div>
    </div>
  </CenterPopup>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CenterPopup from "@/components/CenterPopup.vue";

export default defineComponent({
  props: [
    'isActive'
  ],
  data: () => ({
    choosedRegion: 'Московский регион',
    regions: [
      'Московский регион',
      'Санкт-Петербург',
      'Новосибирск',
      'Екатеринбург',
      'Краснодар и Сочи'
    ],
  }),
  components: {
    CenterPopup,
  }
})


</script>

<style scoped>
.region-choosing {

}
.region-choosing__title {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
}
.region-choosing__current-region {
  margin-top: 13px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.region-choosing__region-name {
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  font-weight: 750;
}
.region-choosing__divider {
  margin-top: 12.5px;
  margin-bottom: 15px;
  height: 1px;
  width: 100%;
  background: #D9D8DE;
}

.region-choosing__hint {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #000000;
  margin-bottom: 15px;
}
.region-choosing__unable-regions {
  display: grid;
  gap: 15px;
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #94919F;
}
</style>