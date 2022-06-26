<template>
  <div
    class="e-card"
    :class="theme ? `e-card--${theme}` : 'e-card--white-gray'"
  >
    <div
      class="e-card__header"
      @click="isOpen = !isOpen"
      :class="((data && data.icon) || icon) ? 'e-card__header--with-icon' : 'e-card__header--without-icon'"
      :style="{'height': headerHeight || 'auto'}"
    >
      <img
        class="e-card__seller-icon"
        v-if="data && data.icon"
        :src="generalStore.getImageURL(`emojis/${icon || data.icon}.svg`)"
      />
      <div
        class="e-card__title"
        :class="isPrimaryTitle && 'e-card__title--primary'"
        :style="titleStyle"
      >{{data && data.title}}{{title}}</div>
      <img
        class="e-card__open-body-btn"
        src="../assets/icons/arrow-bottom.svg"
        :class="isOpen ? 'e-card__open-body-btn--top' : 'e-card__open-body-btn--bottom'"
      />
    </div>
    <div
      class="e-card__body"
      :class="isOpen ? 'e-card__body--opened' : 'e-card__body--closed'"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useGeneralStore } from "@/stores/general";


export default defineComponent({
  props: [
    'data',
    'isPrimaryTitle',
    'title',
    'icon',
    'titleStyle',
    'theme',
    'headerHeight',
  ],
  data: () => ({
    isOpen: false,
    priceRange: [] as Array<number>,
    generalStore: useGeneralStore()
  }),
  methods: {
  },
  computed: {
  }
})
</script>

<style scoped>
.e-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
}
.e-card--white-gray .e-card__header {
  background: white;
}
.e-card--white-gray .e-card__body {
  background: var(--gray-background);
}
.e-card--gray-white .e-card__header {
  background: var(--gray-background);
}
.e-card--gray-white .e-card__body {
  background: white;
}
.e-card__header {
  padding: 12px 20px;
  display: grid;
  gap: 12px;
  align-items: center;
}
.e-card__header--with-icon {
  grid-template-columns: 38px auto 32px;
}
.e-card__header--without-icon {
  grid-template-columns: auto 32px;
}
.e-card__seller-icon {
  height: 26px;
  width: 26px;
}
.e-card__title {
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
}
.e-card__title--primary {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
}
.e-card__main-info {
  width: 100%;
}
.e-card__seller-name {
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}
.e-card__prices-range {

}
.e-card__open-body-btn {
  height: 26px;
  width: 26px;
  transition: .5s all;
}
.e-card__open-body-btn--top {
  transform: rotate(-180deg);
}
.e-card__open-body-btn--bottom {
  transform: rotate(0deg);
}
.e-card__body {
  transition: 0.5s max-height, .5s padding;
  overflow: hidden;
}
.e-card__body--closed {
  padding: 0px 20px;
  max-height: 0px !important;
  overflow: hidden;
}
.e-card__body--opened {
  padding: 20px 20px;
  max-height: 1000px;
  overflow-y: auto;
}
.e-card__offers {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.e-card__offer {}
.e-card__offer-header {
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
.e-card__offer-header-divider {
  width: 2px;
  height: 80%;
  background: var(--lightgray-text);
}
.e-card__offer-body {
  margin-bottom: 20px;
}
.e-card__divider {
  height: 1px;
  width: 100%;
  background: #D8D7E0;
}
.e-card__employee {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
.e-card__employee-image {
  height: 38px;
  width: 38px;
  border-radius: 10px;
}
.e-card__employee-name {
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
}
</style>