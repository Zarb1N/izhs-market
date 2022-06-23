<template>
  <div class="house-d">
    <div
      class="house-d__manager"
      v-if="staffInfo && data.discussions"
    >
      <img
        class="house-d__manager-image"
        :src="staffInfo.image.url"
        v-if="staffInfo.image"
      />
      <div class="house-d__manager-text-info">
        <div class="house-d__manager-name">{{staffInfo.name}}</div>
        <div class="house-d__manager-hint">{{staffInfo.description}}</div>
      </div>
    </div>
    <div
      class="house-d__discussions"
      v-if="data.discussions && data.discussions.length"
    >
      <div
        v-for="disc in data.discussions"
        :key="disc.question"
      >
        <div class="house-d__question">
          <div class="house-d__question-date">{{disc.question_date && disc.question_date.split('-').reverse().join('.')}}</div>
          <div class="house-d__question-content">{{disc.question}}</div>
        </div>
        <div class="house-d__answer">

            <div class="house-d__answer-header">Ответ</div>
            <div class="house-d__answer-content">{{disc.answer}}</div>
          </div>
      </div>
    </div>
    <div
      class="house-d__no-discussions"
      v-else
    >
      <ContentCard>
        <div class="house-d__no-discussions-content">
          <img
            class="house-d__no-discussions-icon"
            src="../../assets/emojis/card-file-box.svg"
          />
          <div class="house-d__no-discussions-text">
            Обсуждений по {{data.name}} <br /> еще не было
          </div>
        </div>
      </ContentCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentCard from '@/components/ContentCard.vue'
import { useStore } from '@/stores/general'

export default defineComponent({
  props: ['data'],
  data: () => ({
    staffInfo: {},
    generalStore: useStore()
  }),
  methods: {
    async getStaffInfo(buildingId: number) {
      const res = await fetch(`${this.generalStore.server}/staff`)
      const data = await res.json()
      this.staffInfo = data.filter((staff: {[key: string]: any}) => staff.id === buildingId)[0]
    }
  },
  mounted() {
    this.getStaffInfo(Number(this.$route.params.id))
  },
  components: {
    ContentCard,
  }
})
</script>

<style scoped>
.house-d__manager {
  min-height: 46px;
  display: grid;
  grid-template-columns: 38px auto;
  gap: 12px;
  margin-bottom: 20px;
}
.house-d__manager-image {
  width: 38px;
  height: 38px;
  border-radius: 10px;
}
.house-d__manager-name {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
}
.house-d__manager-hint {
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
}


.house-d__discussions {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.house-d__question, .house-d__answer {
  border-radius: 24px;
  padding: 16px 16px 24px 16px;
}
.house-d__question {
  background: #5437FF;
  color: white;
}
.house-d__answer {
  background: #E0E0E0;
}
.house-d__question-date {
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  color: #97979D;
  margin-bottom: 3px;
}
.house-d__question-content, .house-d__answer-content {
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
}
.house-d__answer {
  display: flex;
  flex-direction: column;
}
.house-d__answer-wrapper {
  border-radius: 0px 10px 10px 10px;
  padding: 12px 15px;
}
.house-d__answer-dialog-corner-image {
  width: 17px;
  height: 7px;
}
.house-d__answer-header {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 3px;
}
.house-d__no-discussions-content {
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.house-d__no-discussions-text {
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
}
</style>
