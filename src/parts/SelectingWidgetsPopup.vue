<template>
  <CenterPopup 
    class="home__widget-selecting widget-selecting"
    :isActive="isActive"
    @close="applySelectedWidgets()"
  >
    <template v-slot:title><div class="widget-selecting__title">Виджеты</div></template>
    <div class="widget-selecting__body">
      <div class="widget-selecting__available-widgets">
        <div 
          class="widget-selecting__available-widget"
          v-for="(widget, index) in availableWidgets"
          :key="index"
        >
          <div class="widget-selecting__text">{{widget.name}}</div>
          <img 
            class="widget-selecting__check-mark--gray widget-selecting__status-icon"
            src="@/assets/icons/gray-check-in-circle.svg"
            v-if="!widget.isPossibleToHide"
          >
          <img 
            class="widget-selecting__check-mark widget-selecting__status-icon"
            src="@/assets/icons/green-check-in-circle.svg"
            v-else-if="widget.isDisplayed"
            @click="hideWidget(widget)"
          >
          <div 
            class="widget-selecting__uncheck-mark widget-selecting__status-icon"
            v-else
            @click="showWidget(widget)"
          ></div>
        </div>
      </div>
      
      <div class="widget-selecting__horizontal-divider"></div>

      <div class="widget-selecting__unavailable-widgets">
        <div class="widget-selecting__text widget-selecting__text--bold">Пока недоступны:</div>
        <div 
          class="widget-selecting__unavailable-widget"
          v-for="(widget, index) in unavailableWidgets"
          :key="index"
        >
          <div class="widget-selecting__text widget-selecting__text--gray">{{widget.name}}</div>
        </div>
      </div>
    </div>
  </CenterPopup>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import CenterPopup from "@/components/CenterPopup.vue";
import { useGeneralStore } from "@/stores/general";

export default defineComponent({
  props: [
    'data',
    'isActive'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  methods: {
    hideWidget(widget) {
      widget.isDisplayed = false
    },
    showWidget(widget) {
      widget.isDisplayed = true
    },
    async applySelectedWidgets() {
      const res = await fetch(`${this.generalStore.server}/state/${this.generalStore.deviceId}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          device_id: this.generalStore.deviceId,
          widgets_name: this.generalStore.widgetsList.filter(widget => widget.isDisplayed).map(widget => widget.id)
        })
      }) 
      const data = res.json()
      console.log(data)
    }
  },
  computed: {
    availableWidgets() {
      return this.data.filter(widget => widget.isAvailable)
    },
    unavailableWidgets() {
      return this.data.filter(widget => !widget.isAvailable)
    }
  },
  components: {
    CenterPopup
  }
})
</script>

<style scoped>
.widget-selecting__title {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
}
.widget-selecting__body {
  margin-top: 21px;
  display: grid;
  gap: 16px;
}
.widget-selecting__available-widgets, .widget-selecting__unavailable-widgets {
  display: grid;
  gap: 8px;
} 
.widget-selecting__available-widget, .widget-selecting__unavailable-widget {
  display: grid;
  grid-template-columns: auto 24px;
  grid-template-rows: 24px;
  align-items: center;
}
.widget-selecting__text {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #2D2D2D;
}
.widget-selecting__text--gray {
  color: #94919F;
}
.widget-selecting__text--bold {
  font-weight: 900;
}
.widget-selecting__uncheck-mark {
  height: 16px;
  width: 16px;
  background: #C9C9C9;
  border-radius: 40px;
}
.widget-selecting__status-icon {
  justify-self: center;
}
.widget-selecting__horizontal-divider {
  height: 1px;
  width: 100%;
  background: #D9D8DE;
}
</style>