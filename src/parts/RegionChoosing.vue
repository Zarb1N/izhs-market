<template>
  <div class="region-choosing">
    <div class="region-choosing__title">Регион</div>
    <div class="region-choosing__current-region">
      <div class="region-choosing__region-name">{{choosedRegion}}</div>
      <img 
        class="region-choosing__check-icon"
        src="../assets/icons/green-check-in-circle.svg"
      >
    </div>
    <div class="region-choosing__divider"></div>
    <div class="region-choosing__hint">Пока недоступные регионы</div>
    <div class="region-choosing__unable-regions">
      <div 
        class="region-choosing__region-name"
        v-for="region in regions"
        :key="region"
        v-show="region !== choosedRegion"
      >{{region}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'choosedRegion',
    'regions'
  ]
})


</script>

<style>
.region-choosing {

}
.region-choosing__title {
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 10px;
}
.region-choosing__current-region {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.region-choosing__region-name {
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
}
.region-choosing__divider {
  margin-top: 12.5px;
  margin-bottom: 15px;
  height: 1px;
  width: 100%;
  background: #D9D8DE;
}

.region-choosing__hint {
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #94919F;
  margin-bottom: 15px;
}
.region-choosing__unable-regions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>