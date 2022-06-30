<template>
  <div 
    class="card"
    :style="{backgroundColor: backgroundColor}"
  >
    <div class="card__header">
      <div 
        class="card__seller-icon"
        :style="{backgroundImage: `url(${seller[0].builder_info.image && seller[0].builder_info.image.url})`}"
      >
      </div>

      
      <div class="card__main-info">
        <div class="card__seller-name">{{seller[0].builder_info.name}}</div>
        <div class="card__prices-range paragraph">
          От
          <span class="ruble-character">{{generalStore.formatNumber(priceRange[0])}}</span>
          до
          <span class="ruble-character">{{generalStore.formatNumber(priceRange[1])}}</span>
        </div>
      </div>
    </div>
    <div
      class="card__body without-scrollbar card__body--opened">
      <div class="card__offers">
        <div
          class="card__offer"
          v-for="(offer, index) in seller"
          :key="index"
        >
          <div class="card__offer-header">
            <div class="card__offer-name">{{offer.equipment_info.name}}</div>
            <div class="card__offer-price ruble-character">{{generalStore.formatNumber(offer.price)}} </div> •
            <div class="card__offer-date">{{
              [offer.date.split('-').reverse()[0],
              months[Number(offer.date.split('-').reverse()[1])],
              offer.date.split('-').reverse()[2]].join(' ')
            }}</div>
          </div>
          <div 
            class="card__offer-body"
            v-html="offer.equipment_info.description"
          >
          </div>
        </div>
      </div>
      <div class="card__employee">
        <div  
          class="card__employee-image"
          :style="{backgroundImage: `url(${generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0] && generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0].image.url})`}"
        ></div>
        <div class="card__employee-info">
          <div class="card__employee-name">С уважением, <br/> {{generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0] && generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0].name}}</div>
          <div class="card__employee-post ">{{generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0] && generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0].role}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useGeneralStore } from "@/stores/general";

export default defineComponent({
  props: [
    'seller',
    'backgroundColor'
  ],
  data: () => ({
    isOpen: false,
    priceRange: [] as Array<number>,
    generalStore: useGeneralStore(),
    months: {
      1: 'января',
      2: 'февраля',
      3: 'марта',
      4: 'апреля',
      5: 'мая',
      6: 'июня',
      7: 'июля',
      8: 'августа',
      9: 'сентября',
      10: 'октября',
      11: 'ноября',
      12: 'декабря'
    }
  }),
  methods: {
    calculatePriceRange() {
      const prices: Array<number> = Object.keys(this.seller).map( (key: string) => this.seller[key].price)
      this.priceRange = [
        Math.min(...prices),
        Math.max(...prices)
      ]
    },
    mounted() {
    },
  },

  watch: {
    seller() {
      this.calculatePriceRange()
    }
  },
  mounted() {
    if (this.seller) this.calculatePriceRange()
  },
  computed: {
    height () {
      return this.$refs.body.clientHeight
    }
  }
})
</script>

<style scoped>
.card {
  border-radius: 16px;
  padding: 1px;
}
.card__header {
  padding: 15px;
  display: grid;
  grid-template-columns: 38px auto;
  gap: 16px;
  align-items: center;

}
.card__seller-icon {
  height: 40px;
  width: 40px;
  display: flex;
  background: white;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
}
.card__seller-icon img {
  max-height: 24px;
  max-width: 24px;
}  
.card__main-info {
  width: 100%;
}
.card__seller-name {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #F9F9F9;
  font-stretch: 151;
  margin-bottom: 4px;
}
.card__prices-range {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #E0E0E0;
  font-stretch: 151;
}
.card__open-body-btn {
  transition: .5s all;
}
.card__open-body-btn--top {
  transform: rotate(-180deg);
}
.card__open-body-btn--bottom {
  transform: rotate(0deg);
}
.card__body {
  transition: .5s max-height, .5s padding;
}
.card__body--closed {
  overflow: hidden;
  max-height: 0px !important;
}
.card__body--opened {
  max-height: 1000px;
  overflow-y: auto;
}
.card__offers {
  display: grid;
  grid-auto-flow: row;
  gap: 1px;
}
.card__offer {
  padding: 16px 16px 24px 16px;
  background: #F9F9F9;
  border-radius: 12px;
}
.card__offer-header {
  margin-bottom: 16px;
}
.card__offer-name {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
  margin-bottom: 4px;
}
.card__offer-price, .card__offer-date {
  display: inline-block;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #2D2D2D;

}
.card__offer-header-divider {
  width: 2px;
  height: 80%;
  background: var(--lightgray-text);
}
.card__offer-body {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #6A6A6A;
}
.card__divider {
  height: 1px;
  width: 100%;
  background: #D8D7E0;
}
.card__employee {
  padding: 24px 15px;
  display: grid;
  grid-template-columns: 40px auto;
  gap: 12px;
}
.card__employee-image {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
}
.card__employee-name {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #F9F9F9;
  margin-bottom: 4px;
}
.card__employee-post {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #E0E0E0;
  font-stretch: 151;
}
</style>