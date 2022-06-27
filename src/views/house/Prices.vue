<template>
  <div class="house-p">
    <div class="house-p__description paragraph">{{data.description}}</div>
    <div
      class="house-p__about-prices-btn paragraph"
      @click="$emit(
        'openBottomPopup', 
        'О ценах и комплектациях',
        `Можно использовать однуиз комплектации или что-то изменить, 
        цены могут немного меняться, так как меняются цены на материалы`
      )"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16C12.3765 16 16 12.3686 16 8C16 3.62353 12.3686 0 7.99216 0C3.62353 0 0 3.62353 0 8C0 12.3686 3.63137 16 8 16ZM7.92941 5.13725C7.34118 5.13725 6.87059 4.66667 6.87059 4.07059C6.87059 3.47451 7.34118 3.00392 7.92941 3.00392C8.51765 3.00392 8.98039 3.47451 8.98039 4.07059C8.98039 4.66667 8.51765 5.13725 7.92941 5.13725ZM6.58824 12.4627C6.25098 12.4627 5.99216 12.2196 5.99216 11.8824C5.99216 11.5686 6.25098 11.3098 6.58824 11.3098H7.58431V7.62353H6.72157C6.39216 7.62353 6.13333 7.38039 6.13333 7.04314C6.13333 6.72941 6.39216 6.47059 6.72157 6.47059H8.24314C8.65882 6.47059 8.87843 6.76863 8.87843 7.20784V11.3098H9.87451C10.2118 11.3098 10.4706 11.5686 10.4706 11.8824C10.4706 12.2196 10.2118 12.4627 9.87451 12.4627H6.58824Z" fill="#007AFF"/>
      </svg>
      О ценах и комплектации
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
import { useGeneralStore } from "@/stores/general";

export default defineComponent({
  props: [
    'data',
    'sellers'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
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
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #007AFF;
  display: grid;
  align-items: center;
  grid-template-columns: 16px auto;  
  gap: 8px;
  margin-bottom: 24px;
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