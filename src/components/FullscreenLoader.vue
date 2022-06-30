<template>
  <div class="loader">
    <div class="loader-6 center"><span></span></div>
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

<style scoped>
.center {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.loader {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 200;
  background: rgba(249, 249, 249, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loader-6 {
  height: 32px;
  width: 32px;
}

.loader-6 span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 32px;
  width: 32px;
}

.loader-6 span::before,
.loader-6 span::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 32px;
  width: 32px;
  border: 2px solid #65BBFF;
  border-radius: 50%;
  opacity: 0;
  -webkit-animation: loader-6-1 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) infinite;
  animation: loader-6-1 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) infinite;
}

@-webkit-keyframes loader-6-1 {
  0% {
    -webkit-transform: translate3d(0, 0, 0) scale(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0) scale(1.5);
    opacity: 0;
  }
}

@keyframes loader-6-1 {
  0% {
    transform: translate3d(0, 0, 0) scale(0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1.5);
    opacity: 0;
  }
}

.loader-6 span::after {
  -webkit-animation: loader-6-2 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) .25s infinite;
  animation: loader-6-2 1.5s cubic-bezier(0.075, 0.820, 0.165, 1.000) .25s infinite;
}

@-webkit-keyframes loader-6-2 {
  0% {
    -webkit-transform: translate3d(0, 0, 0) scale(0);
    opacity: 1;
  }

  100% {
    -webkit-transform: translate3d(0, 0, 0) scale(1);
    opacity: 0;
  }
}

@keyframes loader-6-2 {
  0% {
    transform: translate3d(0, 0, 0) scale(0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0;
  }
}
</style>