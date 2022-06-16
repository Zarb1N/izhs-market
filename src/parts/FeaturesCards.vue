<template>
  <div class="f-cards">
    <div class="f-card f-card--violet">
        <div class="f-card__additional-action">
        </div>
        <div class="f-card__text">Инстаграмные <br/> дома напрямую <br/> от застройщиков</div>
      </div>
      <div class="f-card f-card--orange">
        <div class="f-card__additional-action">
          <img src="../assets/icons/question-mark.svg" alt="">
        </div>
        <div class="f-card__text">Строительство <br/> через мобильное <br/> приложение</div>
      </div>
  </div>
</template>

<style scoped>
.f-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}
.f-card {
  height: 104px;
  border-radius: 10px;
  padding: 13px 15px;
  background: no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.f-card__text {
  font-size: 10px;
  color: white;
  line-height: 13px;
  font-weight: 600;
  font-style: normal;
}
.f-card__additional-action {
  align-self: end;
  justify-self: start;
}
.f-card--violet {
  background-image: url('../assets/features-cards/feature-cards-bgc--violet.svg');
}
.f-card--orange {
  background-image: url('../assets/features-cards/feature-cards-bgc--orange.svg');
}
</style>