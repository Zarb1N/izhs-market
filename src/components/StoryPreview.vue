<template>
  <div class="s-preview" :class="isUnread ? 's-preview--unread' : 's-preview--read'">
    <div class="s-preview__content" :style="{ background: `url(${(data && data.image) && data.image.url})` }">
      <div class="s-preview__text-zone">
        <div class="s-preview__text"
          :style="data.name && data.name.split(' ').length <= 2 ? { 'width': 'min-content' } : {}">{{ data.name }}
        </div>
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

<style scoped>
.s-preview {
  width: 96px;
  height: 96px;
  background: linear-gradient(180deg, #E5ADFF 0%, #FF7650 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.s-preview--unread {
  background: linear-gradient(180deg, #E5ADFF 0%, #FF7650 100%);
  /* border-image-source: linear-gradient(135.55deg, #A7A6CB -5.43%, #8989BA 107.62%); */
  border-radius: 20px;
}

.s-preview--read {
  background: linear-gradient(180deg, #E5ADFF 0%, #FF7650 100%);
}

.s-preview__content {
  box-sizing: content-box;
  height: 88px;
  width: 88px;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
  border: 2px solid #F5F5F5;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

}

.s-preview__text-zone {
  padding: 14px 8px;
  background: linear-gradient(180deg, rgba(9, 9, 9, 0) 0%, rgba(9, 9, 9, 0.5) 100%);
  height: 50%;
  display: flex;
  align-items: center;
}

.s-preview__text {
  font-weight: 750;
  font-size: 8px;
  line-height: 9px;
  color: #F9F9F9;
  font-variation-settings: 'GRAD' 0, 'slnt' 0, 'XTRA' 499, 'XOPQ' 96, 'YOPQ' 79, 'YTLC' 514, 'YTUC' 712, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
}
</style>