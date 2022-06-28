<template>
  <div class="house-d">
    <div
      class="house-d__manager"
      v-if="data.discussions"
    >
      <img
        class="house-d__manager-image"
        :src="generalStore.getImageURL('default-woman-4.png')"
      />
      <div class="house-d__manager-text-info">
        <div class="house-d__manager-name">Екатерина Алферова</div>
        <div class="house-d__manager-hint">Публикую для вас самые интересные обсуждения клиентов по проекту {{data.name}}</div>
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
          <div class="house-d__question-header">
            <div class="house-d__questioner-name">{{disc.name}}</div>
          <div class="house-d__question-date">
            {{disc.question_date && disc.question_date.split('-').reverse().join('.')}}
          </div>
          </div>
          <div class="house-d__question-content">{{disc.question}}</div>
        </div>
        <div class="house-d__transparent-divider"></div>
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
import { useGeneralStore } from '@/stores/general'

export default defineComponent({
  props: ['data'],
  data: () => ({
    staffInfo: {},
    generalStore: useGeneralStore()
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
  grid-template-columns: 40px auto;
  gap: 12px;
  margin-bottom: 32px;
}
.house-d__manager-image {
  width: 38px;
  height: 38px;
  border-radius: 10px;
}
.house-d__manager-name {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
  margin-bottom: 8px;
}
.house-d__manager-hint {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
color: #2D2D2D;
}


.house-d__discussions {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.house-d__question, .house-d__answer {
  border-radius: 12px;
  padding: 16px 16px 24px 16px;
}
.house-d__question {
  background: #5437FF;
  color: white;
  margin-bottom: 1px;
}
.house-d__question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
}
.house-d__questioner-name {
  color: #F9F9F9;
}
.house-d__answer {
  background: #E0E0E0;
}
.house-d__question-date {
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  color: #E0E0E0;
}
.house-d__question-content, .house-d__answer-content {
  font-weight: normal;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
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
  margin-bottom: 12px;
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
