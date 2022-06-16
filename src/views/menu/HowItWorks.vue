<template>
  <div class="how-it-works paragraph menu-subpage">
    <ul>
      <li class="how-it-works__list-item">
        Выберите проект дома и отправьте заявку
      </li>
    </ul>
    <Card class="card" color="gray">
      <div class="how-it-works__send-application-btn-wrapper">
        <div class="how-it-works__send-application-btn">Отправить заявку</div>
      </div>
    </Card>
    <ul>
      <li class="how-it-works__list-item">
        Пообщайтесь с застройщиками и начните строительство
      </li>
    </ul>
    <Card 
      class="card" 
      color="gray"
      style="height: 133px;"
    >
      <div class="how-it-works__builders-wrapper">
        <div class="how-it-works__builders-row">
          <div class="builder">
            <div class="builder__icon-wrapper">
              <img 
                class="builder__icon"
                src=""
              />
            </div>
            <div class="builder__text-info">
              <div class="builder__name">ООО Домкомплект</div>
              <div class="builder__price-range">От 6 584 000 ₽ до 9 346 000 ₽</div>
            </div>
            <img 
              class="builder__chevron-down"
              src="../../assets/icons/arrow-bottom.svg"
            />
          </div>
          <img src="../../assets/check-circle.svg" />
        </div>
        <div class="how-it-works__builders-row">
          <div class="builder">
            <div class="builder__icon-wrapper">
              <img 
                class="builder__icon"
                src=""
              />
            </div>
            <div class="builder__text-info">
              <div class="builder__name">ООО Домкомплект</div>
              <div class="builder__price-range">От 6 584 000 ₽ до 9 346 000 ₽</div>
            </div>
            <img 
              class="builder__chevron-down"
              src="../../assets/icons/arrow-bottom.svg"
            />
          </div>
        </div>
      </div>
    </Card>
    <ul>
      <li class="how-it-works__list-item">
        <span> Используйте <span class="underline-dashed" @click="$router.push('/menu/my-state')">ИЖС Genius</span> на протяжении всего строительства</span>
      </li>
    </ul>
    <Card color="gray"> 
      <div class="how-it-works__genius">
        <div class="how-it-works__genius-title">Genius</div>
        <div class="how-it-works__genius-description">Начните строительство до 1 июня, потом статус изменится на Стандарт и стоимость услуг составит 218 000 ₽</div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard.vue";
import SellerExtensionCard from "@/components/SellerExtensionCard.vue";

export default defineComponent({
  props: ["data"],
  data: () => ({
  }),
  components: {
    Card: ContentCard,
  },
});
</script>

<style scoped>
.how-it-works {
  margin-top: 10px;
}
.how-it-works__list-item {
  margin-bottom: 15px;
}
.card {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.how-it-works__send-application-btn-wrapper {
  padding: 15px 51px;
}
.how-it-works__send-application-btn {
  height: 28px;
  width: 206px;
  background: #439a86;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 9px;
  line-height: 12px;
  text-transform: uppercase;
}
.how-it-works__builders-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
}
.how-it-works__builders-row {
  display: grid;
  grid-template-columns: 180px 21px;
  align-items: center;
  gap: 6px;
}
.builder {
  width: 180px;
  border-radius: 5px;
  filter: drop-shadow(2.06544px 2.06544px 10.3272px #EEECF7);
  background: white;
  display: grid;
  grid-template-columns: 20px auto 20px;
  gap: 6px;
  align-items: center;
  padding: 8px;
}
.builder__icon-wrapper {
  border-radius: 5px;
  width: 20px;
  height: 20px;
  background: #E3F3F4;
}
.builder__name {
  font-weight: 600;
  font-size: 7.22905px;
  line-height: 9px;
}
.builder__price-range {
  font-weight: 600;
  font-size: 6.19633px;
  line-height: 140%;
}
.builder__chevron-down {
  width: 20px;
  height: 20px;
}
.how-it-works__genius {
  padding: 2px 17px;
  display: grid;
  grid-template-columns: min-content auto;
  gap: 30px;
}
.how-it-works__genius-title {
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
}
.how-it-works__genius-description {
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  color: #0063F3;
}
.underline-dashed {
  line-height: 90%;
}
</style>