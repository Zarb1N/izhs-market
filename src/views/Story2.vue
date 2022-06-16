<template>
  <Stories :stories="items">
    <template #pool="{story}">

    </template>
  </Stories>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Stories } from "vue-insta-stories";
export default defineComponent({
  components: { Stories },
  data: () => ({
    items: [ 
      {
        type: 'image',
        url: "https://picsum.photos/350/200/",
        template: 'pool',
      }
    ]
  })
});
</script>