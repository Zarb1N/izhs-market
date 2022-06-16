<template>
  <div class="s-e-card">
    <div 
      class="s-e-card__header"
      @click="isOpen = !isOpen"

    >
      <img 
        class="s-e-card__seller-icon"
        :src="seller[0].builder_info.image.url"
      />
      <div class="s-e-card__main-info">
        <div class="s-e-card__seller-name">{{seller[0].builder_info.name}}</div>
        <div class="s-e-card__prices-range paragraph">
          От 
          <span class="ruble-character">{{generalStore.formatNumber(priceRange[0])}}</span> 
          до 
          <span class="ruble-character">{{generalStore.formatNumber(priceRange[1])}}</span>
        </div>
      </div>
      <img 
        class="s-e-card__open-body-btn"
        src="../assets/icons/arrow-bottom.svg"
        :class="isOpen ? 's-e-card__open-body-btn--top' : 's-e-card__open-body-btn--bottom'"
      />
    </div>
    <div 
      class="s-e-card__body without-scrollbar"
      :class="isOpen ? 's-e-card__body--opened' : 's-e-card__body--closed'"
    >
      <div class="s-e-card__offers">
        <div 
          class="s-e-card__offer"
          v-for="(offer, index) in seller"
          :key="index"
        >
          <div class="s-e-card__offer-header">
            <div class="s-e-card__offer-name">{{offer.name}}</div>
            <div class="s-e-card__offer-header-divider"></div>
            <div class="s-e-card__offer-price ruble-character">{{generalStore.formatNumber(offer.price)}} </div>
            <div class="s-e-card__offer-header-divider"></div>
            <div class="s-e-card__offer-date">{{offer.date}}</div>
          </div>
          <div class="s-e-card__offer-body paragraph ">
            {{offer.description}}
          </div>
          <div class="s-e-card__divider"></div>
        </div>
      </div>
      <div class="s-e-card__employee">
        <img 
          class="s-e-card__employee-image"
          :src="generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0] && generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0].image.url"
        />
        <div class="s-e-card__employee-info">
          <div class="s-e-card__employee-name">С уважением, <br/> {{generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0] && generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0].name}}</div>
          <div class="s-e-card__employee-post paragraph">{{generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0] && generalStore.staff.filter( (employee: {[key: string]: any}) => employee.id === seller[0].builder_info.staff_id)[0].post}}</div>
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
    'seller'
  ],
  data: () => ({
    isOpen: false,
    priceRange: [] as Array<number>,
    generalStore: useGeneralStore()
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
.s-e-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
}
.s-e-card__header {
  padding: 15px;
  display: grid;
  grid-template-columns: 38px auto 32px;
  gap: 12px;
  align-items: center;
  background: var(--gray-background);

}
.s-e-card__seller-icon {
  height: 38px;
  width: 38px;
}
.s-e-card__main-info {
  width: 100%;
}
.s-e-card__seller-name {
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}
.s-e-card__prices-range {
  
}
.s-e-card__open-body-btn {
  transition: .5s all;
}
.s-e-card__open-body-btn--top {
  transform: rotate(-180deg);
}
.s-e-card__open-body-btn--bottom {
  transform: rotate(0deg);
}
.s-e-card__body {
  background: white;
  transition: .5s max-height, .5s padding;
}
.s-e-card__body--closed {
  overflow: hidden;
  padding: 0px 20px;
  max-height: 0px !important;
}
.s-e-card__body--opened {
  padding: 20px 20px;
  max-height: 1000px;
  overflow-y: auto;
}
.s-e-card__offers {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.s-e-card__offer {}
.s-e-card__offer-header {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  gap: 5px;
  height: 15px;
  align-items: center;
  margin-bottom: 7px;
}
.s-e-card__offer-header > div {
  white-space: nowrap;
} 
.s-e-card__offer-header-divider {
  width: 2px;
  height: 80%;
  background: var(--lightgray-text);
}
.s-e-card__offer-body {
  margin-bottom: 20px;
}
.s-e-card__divider {
  height: 1px;
  width: 100%;
  background: #D8D7E0;
}
.s-e-card__employee {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
.s-e-card__employee-image {
  height: 38px;
  width: 38px;
  border-radius: 10px;
}
.s-e-card__employee-name {
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
}
</style>