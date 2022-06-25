<template>
  <div class="house-p">
    <div class="house-p__description paragraph">{{data.description}}</div>
    <div
      class="house-p__about-prices-btn paragraph"
      @click="(event) => {showPopupHint(event, 'Можно использовать одну <br/> из комплектации или что-то <br/> изменить, цены могут немного <br/> меняться, так как меняются <br/> цены на материалы')}"
    >
      О ценах и комплектации
        <svg class="house-p__dashed-line" width="186" height="1" viewBox="0 0 186 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.25" y1="0.25" x2="185.75" y2="0.250016" stroke="#222127" stroke-width="0.5" stroke-linecap="round" stroke-dasharray="4 4"/>
        </svg>
    </div>
    <div class="house-p__sellers-offers-cards">
      <SellerCard
        v-for="(builder_id, index) in Object.keys(sellers)"
        :key="builder_id"
        :seller="sellers[builder_id]"
        :backgroundColor="index % 2 ? '#883FFF' : '#5437FF'"
      />
    </div>
    <!-- <PopupHint
      style="width: min-content; max-width: none;"
      tabindex="0"
      ref="popupHint"
      :style="{
        'top': `${generalStore.clickCoordinates.y}px`,
        'left': `${generalStore.clickCoordinates.x}px`,
        'transform': `translate(${generalStore.clickCoordinates.x < generalStore.windowWidth() / 2 ? '0, -100%' : '-100%, -100%'})`
      }"
      v-show="isPopupHint"
      @blur="isPopupHint = false"
    >
      <div
        class="paragraph"
        style="white-space: nowrap"
        v-html="popupHintText"
      ></div>
    </PopupHint> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import SellerExtensionCard from "@/components/SellerExtensionCard.vue";
import PopupHint from "@/components/PopupHint.vue";
import { useStore } from "@/stores/general";

export default defineComponent({
  props: [
    'data',
    'sellers'
  ],
  data: () => ({
    generalStore: useStore(),
    isPopupHint: false,
    popupHintText: '',
  }),
  components: {
    SellerCard: SellerExtensionCard,
    PopupHint,
  },
  methods: {
    showPopupHint(event : any, text: string) {
      this.popupHintText = text
      event.preventDefault()
      this.generalStore.clickCoordinates = {
        x: event.layerX,
        y: event.layerY
      }
      this.$nextTick( () => {
        // @ts-ignore
        this.$refs.popupHint.$el.focus()
      })
      this.isPopupHint = true
    }
  },
  watch: {
  },

})
</script>

<style scoped>
.house-p__description {
  margin-bottom: 10px;
}
.house-p__about-prices-btn {
  display: inline-block;

  /*
  border-bottom: 1px dashed black;
  border-image: url("http://i.stack.imgur.com/wLdVc.png") 1 round;
  */
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.house-p__dashed-line {
  max-height: 1px;
  width: 169px;
}
.house-p__sellers-offers-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>