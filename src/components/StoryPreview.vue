<template>
  <div 
    class="s-preview"
    :class="isUnread ? 's-preview--unread' : 's-preview--read'"
  >
    <div 
      class="s-preview__content"
      :style="{background: `linear-gradient(360deg, #000000 -7.89%, rgba(0, 0, 0, 0) 82.9%), url(${(data && data.image) && data.image.url})`}"
    >
      <div class="s-preview__text-zone">
        <div 
          class="s-preview__text"
          :style="data.name && data.name.split(' ').length <= 2 ? {'width': 'min-content'}: {}"
        >{{data.name}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: [
    'isUnread' /* boolean */,
    'data',
  ]
})
</script>

<style>
  .s-preview {
    width: 88px;
    height: 120px;
  }
  .s-preview--unread {
    border: 2px solid;
    border-image-source: linear-gradient(180deg, #E5ADFF 0%, #FF7650 100%);
    /* border-image-source: linear-gradient(135.55deg, #A7A6CB -5.43%, #8989BA 107.62%); */
    border-radius: 12px;
  }
  .s-preview--read {
    border: 1px solid rgba(255, 255, 255, 0);
  }
  .s-preview__content {
    height: 120px;
    width: 88px;
    border: 1px solid #F5F5F5;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: cover !important;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;

  }
  .s-preview__text-zone {
    padding: 8px 14px;
    background: rgba(106, 106, 106, 0.16);
    backdrop-filter: blur(44px);
    border-radius: 24px 24px 18px 18px;
    height: 36px;
    display: flex;
    align-items: center;
  }
  .s-preview__text {
    min-width: 100%;
    font-weight: 750;
    font-size: 8px;
    line-height: 115%;
    color: #F9F9F9;
    text-align: center;
  }
</style>