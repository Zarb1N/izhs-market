<template>
  <div class="m-p-house">
    <div class="m-p-house__live-stream-row">
      <div class="m-p-house__live-stream-description">Здесь можно отслеживать этапы строительства</div>
      <div class="m-p-house__live-stream-btn">Live</div>
    </div>
    <Stages/>
    <Card title="Команда">
      <Team :team="team"/>
    </Card>
    <div class="m-p-house__view-documents-btn">
      <img :src="generalStore.getImageURL('emojis/open-file-folder.svg')">
      <span>Отчет со всеми документами</span>
    </div>
  </div>
</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import ConstructionStages from "@/components/ConstructionStages.vue";
import ContentCard from "@/components/ContentCard.vue";
import ConstructionTeam from "@/components/ConstructionTeam.vue";

export default defineComponent({
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  components: {
    Stages: ConstructionStages,
    Card: ContentCard,
    Team: ConstructionTeam,
  },
  computed: {
    team() {
      if (this.generalStore.applicationInfo.staff_id) {
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
.m-p-house {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.m-p-house__live-stream-row {
  display: flex;
  justify-content: space-between;
}
.m-p-house__live-stream-description {
  font-size: 14px;
  line-height: 130%;
}
.m-p-house__live-stream-btn {
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
.m-p-house__live-stream-btn::before {
  content: '';
  display: block;
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background: #33A34C;
  position: relative;
  margin-top: -2px;
}
.m-p-house__view-documents-btn {
  background: #FFFFFF;
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
</style>