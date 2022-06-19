<template>
  <div class="my-project--empty">
    <div class="my-project__description">Здесь можно отслеживать ход вашего проекта, для этого выберете дом и отправьте заявку</div>
    <img
      class="my-project__image"
      :src="generalStore.getImageURL('house-card.png')"
      />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { useStore } from "@/stores/general"

export default defineComponent({
  data: () => ({
    generalStore: useStore(),
  }),
  mounted() {
    if (this.generalStore.deviceState.applications_houses_id) {
      this.$router.push(`/my-project/house/${this.generalStore.deviceState.applications_houses_id}`)
    }
  }
})
</script>

<style>

.my-project--empty {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
.my-project--empty .my-project__description {
  font-size: 14px;
  line-height: 130%;
}
.my-project--empty .my-project__image {
  height: 527px;
}
</style>