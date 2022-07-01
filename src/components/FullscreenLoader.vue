<template>
  <div class="loader">
    <div class="full-screen-loader">
      <img src="@/assets/full-screen-loader.svg" class="full-screen-loader__logo" />
      <p class="full-screen-loader__title">Строительство через приложение проходит быстрее и легче</p>
    </div>
    <!-- <div class="loader-6 center"><span></span></div> -->
  </div>
</template>

<style scoped>
.full-screen-loader__title {
  font-weight: 750;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  position: absolute;
  bottom: 114px;
  max-width: 250px;
  left: 63px;
}

.full-screen-loader__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.full-screen-loader {
  background: #1F75FE;
  position: relative;
  height: 100vh;
  width: 100vw;
}

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