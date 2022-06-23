<template>
  <div class="team">
    <div
      class="team--not-empty"
      v-if="team"
    >
      <div
        class="team__member"
        v-for="member in team"
        :key="member.id"
      >
        <img
          class="team__member-photo"
          :src="member.image.url"
        />
        <div class="team__member-text-info">
          <div class="team__member-post"></div>
          <div class="team__member-name">{{member.name}}</div>
          <div class="team__member-description">{{member.description}}</div>
        </div>
      </div>
    </div>
    <div
      class="team--empty"
      v-else
    >
      <div
        class="team__member"
        v-for="member in 3"
        :key="member"
      >
        <img
          class="team__member-photo"
          v-if="member % 2"
          :src="generalStore.getImageURL('user-default-photo--female.svg')"
        />
        <img
          class="team__member-photo"
          v-else
          :src="generalStore.getImageURL('user-default-photo--male.svg')"
        />
        <div class="team__member-text-info">
          <div class="team__member-name"></div>
          <div class="team__member-post"></div>
          <div class="team__member-description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [ 'team' ],
  data: () => ({
    generalStore: useStore(),
  })
})
</script>

<style scoped>
.team--empty, .team--not-empty {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.team__member {
  display: grid;
  grid-template-columns: 43px auto;
  gap: 10px;
}
.team__member-photo {
  height: 43px;
  width: 43px;
  border-radius: 10px;
}
.team__member-name {
  margin-bottom: 10px;
}
.team__member-post {
  margin-bottom: 3px;
}
.team--empty .team__member-text-info > div {
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 6px;
}
.team--empty .team__member-name {
  height: 10px;
  width: 101px;
  margin-bottom: 10px;
}
.team--empty .team__member-post {
  height: 15px;
  width: 113px;
}
.team--empty .team__member-description {
  height: 13px;
  width: 159px;
}
</style>