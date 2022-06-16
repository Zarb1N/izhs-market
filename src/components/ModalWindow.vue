<template>
  <div class="popup">
    <div 
      class="popup__wrapper"
      @click="$emit('clickToWrapper')"
    >

    </div>
    <div class="popup__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
  
})


</script>

<style>
.popup {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup__wrapper {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
}
.popup__content {
  z-index: 101;
  width: 100%;
}

</style>