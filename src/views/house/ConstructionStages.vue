<template>
  <div class="house-c-s">
    <div
      class="house-c-s__live-stream-row"
      v-if="isApplicationHouse"
    >
      <div class="house-c-s__live-stream-description">Здесь можно отслеживать этапы строительства</div>
      <div class="house-c-s__live-stream-btn">Live</div>
    </div>
    <div
      class="house-c-s__live-stream-row"
      v-else
    >
      <div class="house-c-s__live-stream-description">После старта будет доступна трансляция строительства, документы и команда проекта</div>
    </div>
    <Stages/>
    <Card title="Команда">
      <Team :team="isApplicationHouse ? generalStore.constructionTeam : null"/>
    </Card>
    <div
      class="m-p-house__view-documents-btn"
      :class="isApplicationHouse ? 'm-p-house__view-documents-btn--active' : 'm-p-house__view-documents-btn--disactive'"
    >
      <img :src="generalStore.getImageURL(`emojis/open-file-folder${!isApplicationHouse ? '--gray' : ''}.svg`)">
      <span>Отчет со всеми документами</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard.vue";
import ConstructionStages from "@/components/ConstructionStages.vue";
import ConstructionTeam from "@/components/ConstructionTeam.vue";
import { useGeneralStore } from "@/stores/general";

export default defineComponent({
  components: {
    Card: ContentCard,
    Stages: ConstructionStages,
    Team: ConstructionTeam,
  },
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  computed: {
    isApplicationHouse() {
      if (
        this.generalStore.deviceState.applications_houses_id
        && this.$route.params.id === this.generalStore.deviceState.applications_houses_id.toString()
      ) {
        return true
      }
      return false
    },
    team() {
      if (this.isApplicationHouse && this.generalStore.applicationInfo.staff_id) {
        const team = this.generalStore.staff.filter( employee => this.generalStore.applicationInfo.staff_id.indexOf(employee) !== -1)
        if (team.length) {
          return team
        }
      }
      return null
    }
  }
})

</script>

<style scoped>
.house-c-s {
  display: flex;
  flex-direction: column;
}
.house-c-s__live-stream-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.house-c-s__live-stream-description {
  font-size: 14px;
  line-height: 130%;
}
.house-c-s__live-stream-btn {
  padding-top: 2px;
  height: 30px;
  min-width: 60px;
  background: #D7EDD3;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-transform: uppercase;
}
.m-p-house__view-documents-btn {
  margin-top: 15px;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 12px;
  padding: 14px 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  height: calc(14px * 2 + 26px);
}
.m-p-house__view-documents-btn--active {
  background: #FFFFFF;

}
.m-p-house__view-documents-btn--disactive {
  background: #F2F2F2;
  color: #A7AFB8;
}
</style>