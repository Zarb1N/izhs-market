<template>
  <IonPage>
    <IonContent>
      <div class="build">
        <div class="status-bar"></div>
        <div class="build__header">
          <h1>Стройка</h1>
          <img src="@/assets/live.svg" alt="live">
        </div>
        <div class="build__body">
          <h2>Инженеры все сделают, а потом подгрузят информацию, не нужно платить 218 000 ₽ и тратить 380 часов личного
            времени</h2>
          <img src="@/assets/izs_stroika_actual.gif" alt="izs_stroika_actual">
          <h2>Все инженеры и Росреестр за 0 ₽ — оплатите первый этап строительства до 25 августа и Genius активируется
            автоматически</h2>
          <button @click="onRedirectToCatalog" class="button">Выбрать дом</button>
        </div>
      </div>
    </IonContent>
  </IonPage>

</template>
<script lang="ts" setup>
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const onRedirectToCatalog = () => router.push('/catalog')

</script>

<style scoped>
.button {
  background: #090909;
  font-family: 'Roboto Flex';
  border: 1px solid #090909;
  border-radius: 60px;
  width: 100%;
  padding: 15px;
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.build__body>img {
  width: 100%;
  margin-bottom: 32px;
}

.build__body>h2 {
  font-weight: 750;
  font-size: 14px;
  line-height: 17px;
  color: #2D2D2D;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
  margin-bottom: 24px;
}

.build__body {
  padding: 0 20px 48px;
}

.build__header>h1 {
  font-weight: 750;
  font-size: 26px;
  line-height: 32px;
  color: #090909;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}

.build__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 24px 20px;
}

.build {
  min-height: 100%;
  background: #F5F5F5;
}
</style>