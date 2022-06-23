<template>
  <IonPage>
    <IonContent :scroll-x="false">
      <stories
        class="stories"
        :autoplay="true"
        ref="stories_component"
        :stories="stories"
        v-if="stories.length"
      >
        <template v-slot:slide="{ story, slide }">
          <div class="story" :style="`background: url(${slide.image.url})`">
            <div class="slide">
              <img
                class="slide__close-btn"
                :src="generalStore.getImageURL('icons/x-mark-in-circle.svg')"
                @click="$router.go(-1)"
              />
              <div class="slide__description">{{slide.description}}</div>
              <a
                class="slide__action-btn"
                v-if="slide.button_link && slide.button_name"
                :href="`https://${slide.button_link}`"
              >{{slide.button_name}}</a>
            </div>
          </div>
        </template>
      </stories>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent, ref } from "@vue/runtime-core";
// @ts-ignore
import Stories from "vue3-insta-stories";
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from "@ionic/vue";

export default defineComponent({
  name: 'Story',
  /*
  setup() {
    const stories_component = ref(null);
    return {
      stories_component,
    };
  },
  */
  data: () => ({
    generalStore: useStore(),
    stories: [] as Array<{[key: string]: any}>
  }),
  computed: {

  },
  methods: {
    chooseStory() {
      const choosedStory = this.generalStore.allStories.filter( (story : {[key: string]: any}) => {
        return story.id.toString() === this.$route.params.id
      })[0]
      this.stories = [{slides: choosedStory.stories_screens}]
    },
    async markStoryAsViewed(storyId : number) {
        this.generalStore.deviceState.stories_id.push(storyId)
        const res = await fetch(`${this.generalStore.server}/states/${this.generalStore.deviceId}`, {
          method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            device_id: this.generalStore.deviceId,
            stories_id: this.generalStore.deviceState.stories_id
          })
        })

    }
  },
  components: {
    Stories,
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  },
  mounted() {
    if (this.generalStore.allStories.length) {
      this.chooseStory()
    }
    StatusBar.hide()
    if (
        this.generalStore.deviceState.stories_id
        && this.generalStore.deviceState.stories_id.indexOf(Number(this.$route.params.id)
    ) === -1) {
      this.markStoryAsViewed(Number(this.$route.params.id))
    }
  },
  watch: {
    'generalStore.allStories': {
      handler() {
        this.chooseStory()
      },
      deep: true
    }
  }
})
</script>

<style >
.stories {
  height: 100%;
}
.story {
  width: 375px;
  min-height: 100%;
  padding-top: calc(15px + 30px);
}
.timeline {
  width: calc(375px - 10px);
}
.slide {
}
.slide__close-btn {
  position: absolute;
  right: 14px;
  margin-top: -10px;
}
.slide__description {
  width: 310px;
  font-weight: 700;
  font-size: 26px;
  line-height: 120%;
  padding: 0px 0px 0px 14px;
}
.slide__action-btn {
  width: 100%;
  background: #FE7B5E;
  height: 56px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #F9F9F9;
  position: absolute;
  bottom: 0;
}

/* Updated styles for library */
.story .timeline>.slice {
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
}
.story .timeline>.slice>.progress {
  background: #FE7B5E !important;
}
</style>