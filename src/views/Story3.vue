<template>
  <div class="stories_wrapper">
    <stories
      :autoplay="false"    
      :duration="duration" 
      :breakpoint='768'    
      :stories="stories"
      ref="stories_component"
    >
      <template v-slot:slide="{ story, slide }">
        <div class="slide" :style="'background-color:' + slide.color" style="height: 100%">
          <div>
            <p>{{ story.custom_attribute }}</p>
            <p>Color: {{ slide.color }}</p>
          </div>
        </div>
      </template>
    </stories>
  </div>
</template>
<script lang="ts">
import Stories from "vue3-insta-stories";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: { Stories },
  name: "YourCustomComponent",
  setup() {
    const stories_component = ref(null);

    return {
      stories_component,
    };
  },
  data() {
    return {
      duration: false,
      stories: [
        {
          //Add as many custom attributes per story as you like
          custom_attribute: "Story 1",
          slides: [
            { 
              // The attributes below [id,color] are custom attributes 
              // Add the duration attribute in case you want to add a custom duration for this slide
              id: 1, 
              color: "#D53738", 
              duration: 3000 
              },
            { 
              id: 2, 
              color: "#638867", 
              duration: 10000 
            },
          ],
        },
        {
          custom_attribute: "Story 2",
          slides: [
            { 
              id: 3, 
              color: "#DAF7A6" 
            },
          ],
        },
      ],
    };
  },
})
</script>

<style>
.stories_wrapper {
  height: 100vh;
}
</style>