<template>
  <div 
    class="favourites-btn"
    @click="$router.push('/catalog/favourites')"
  >
    <div class="favourites-btn__quantity-circle-wrapper">
      <div 
        class="favourites-btn__quantity-circle"
        v-show="generalStore.deviceState.favourites_houses_id && generalStore.deviceState.favourites_houses_id.length"
      >{{generalStore.deviceState.favourites_houses_id.length}}</div>
    </div>
    <img 
      class="favourites-btn__icon"
      :src="generalStore.getImageURL('icons/heart--black.svg')"
    />
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  })
})

</script>

<style>
.favourites-btn__quantity-circle-wrapper {
  position: relative;
  height: 0;
  width: 0;  
  left: calc(32px - 14px);
}
.favourites-btn__quantity-circle {
  padding: 3px 4px 2px 4px;
  height: 14px;
  min-width: 14px;
  width: min-content;
  background: linear-gradient(180deg, #E5ADFF 0%, #E5ADFF 0.01%, #FF7650 100%);
  border-radius: 7px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 750;
  font-size: 8px;
  line-height: 120%;
}
</style>