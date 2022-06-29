<template>
  <div class="reviews">
    <div class="reviews__description">Отзывы от клиентов, которые строят или построили дом у застройщика</div>
    <div class="reviews__section-header">
      <div class="reviews__section-title">Отзывы</div>
      <div class="reviews__section-quantity">{{choosedSellerInfo ? choosedSellerInfo.feedbacks.customers.length : 0}}</div>
    </div>
    <div 
      class="reviews__builders"
      v-if="sellers"
    >
      <div 
        class="reviews__builder"
        v-for="(builderId, index) in Object.keys(sellers)"
        :key="index"
        :class="
          choosedSellerId === Number(builderId) 
            ? 'reviews__builder--choosed' 
            : 'reviews__builder--unchoosed'
        "
        @click="chooseSeller(Number(builderId))"
      >
        <img 
          class="reviews__builder-icon"
          v-if="sellers[builderId][0].builder_info && sellers[builderId][0].builder_info.image"
          :src="sellers[builderId][0].builder_info.image.url"
        />
      </div>
    </div>
    <div class="reviews__summary">
      <div class="reviews__average-rate">{{averageRate}}</div>
      <div class="reviews__summary-stars">
        <img
          class="review__star-icon--orange"
          v-for="star in Math.floor(averageRate)"
          :key="star"
          :src="generalStore.getImageURL('icons/star--orange.svg')"
        />
        <img
          class="review__star-icon--gray"
          v-for="star in (5 - Math.floor(averageRate))"
          :key="star"
          :src="generalStore.getImageURL('icons/star--gray.svg')"
        />
      </div>
    </div>
    <div 
      class="reviews__categories"
      v-if="choosedSellerInfo"
    >

      <div class="reviews__category">
        <div class="reviews__category-name">Скорость строительства</div>
        <div class="reviews__category-rate">{{choosedSellerInfo.feedbacks.estimation_speed}}</div>
        <img 
          class="reviews__category-info-btn"
          :src="generalStore.getImageURL('icons/information.svg')"
          @click="$emit('openBottomPopup', 'Скорость строительства', choosedSellerInfo.feedbacks.description_speed)"
        />
        <div class="reviews__category-info-bar">
          <div 
            class="reviews__category-info-bar-value"
            :style="{width: `${100 * choosedSellerInfo.feedbacks.estimation_speed / 5}%`}"
          ></div>
          <div class="reviews__category-info-bar-empty"></div>
        </div>
      </div>

      <div class="reviews__category">
        <div class="reviews__category-name">Качество работ и материалов</div>
        <div class="reviews__category-rate">{{choosedSellerInfo.feedbacks.estimation_quality}}</div>
        <img 
          class="reviews__category-info-btn"
          :src="generalStore.getImageURL('icons/information.svg')"
          @click="$emit('openBottomPopup', 'Качество работ и материалов', choosedSellerInfo.feedbacks.description_quality)"
        />
        <div class="reviews__category-info-bar">
          <div 
            class="reviews__category-info-bar-value"
            :style="{width: `${100 * choosedSellerInfo.feedbacks.estimation_quality / 5}%`}"
          ></div>
          <div class="reviews__category-info-bar-empty"></div>
        </div>
      </div>

      <div class="reviews__category">
        <div class="reviews__category-name">Общение и внимание к деталям</div>
        <div class="reviews__category-rate">{{choosedSellerInfo.feedbacks.estimation_communication}}</div>
        <img 
          class="reviews__category-info-btn"
          :src="generalStore.getImageURL('icons/information.svg')"
          @click="$emit('openBottomPopup', 'Общение и внимание к деталям', choosedSellerInfo.feedbacks.description_communication)"
        />
        <div class="reviews__category-info-bar">
          <div 
            class="reviews__category-info-bar-value"
            :style="{width: `${100 * choosedSellerInfo.feedbacks.estimation_communication / 5}%`}"
          ></div>
          <div class="reviews__category-info-bar-empty"></div>
        </div>
      </div>
    </div>
    <div class="reviews__photos">
        <div class="reviews__section-header">
          <div class="reviews__section-title">Фотографии</div>
          <div class="reviews__section-quantity">{{photos.length}}</div>
        </div>
        <div class="reviews__photos-items">
          <div 
            class="reviews__photos-item"
            v-for="(photo, index) in photos"
            :key="index"
            :style="{backgroundImage: `url(${photo.url})`}"
          ></div>
        </div>
      </div>

      <div 
        class="reviews__reviews"
        v-if="choosedSellerInfo"
      >
        <div 
          class="reviews__review review"
          v-for="(review, index) in choosedSellerInfo.feedbacks.customers"
          :key="index"
        >
          <div class="review__header">
            <img 
              class="review__user-icon"
              :src="generalStore.getImageURL('icons/user-icon--violet.svg')"
            />
            <div class="review__user-name">{{review.name}}</div>
            <div class="review__rate">
              <img
                class="review__star-icon--orange"
                v-for="star in review.estimation_customer"
                :key="star"
                :src="generalStore.getImageURL('icons/star--orange.svg')"
              />
              <img
                class="review__star-icon--gray"
                v-for="star in (5 - review.estimation_customer)"
                :key="star"
                :src="generalStore.getImageURL('icons/star--gray.svg')"
              />
            </div>
            <div class="review__date">{{review.date}}</div>
          </div>
          <div class="review__body">
            <div 
              class="review__photos"
              v-if="review.images && review.images.length"
            >
              <div 
                class="review__photo"
                v-for="(image, index) in review.images"
                :key="index"
                :style="{backgroundImage: `url(${image && image.url})`}"
              ></div>
            </div>
            <div class="review__advantages">
              <div class="review__subtitle">Достоинства</div>
              <div class="review__paragraph">{{review.advantage}}</div>
            </div>
            <div class="review__disadvantages">
              <div class="review__subtitle">Недостатки</div>
              <div class="review__paragraph">{{review.disadvantages}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script lang="ts">
import { useGeneralStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: [
    'data',
    'sellers'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    choosedSellerId: 0,
    choosedSellerInfo: null,
    photos: [],
    quantityOfReviews: 0,
    averageRate: 0
  }),
  methods: {
    chooseSeller(builderId : number) {
      this.choosedSellerId = builderId
      this.choosedSellerInfo = this.sellers[this.choosedSellerId][0].builder_info
      this.photos = []
      this.choosedSellerInfo.feedbacks.customers.forEach(customer => {
        customer.images.forEach(image => {this.photos.push(image)})
      })
      
    }
  },
  mounted() {
  },
  watch: {
    sellers: {
      handler(newValue) {
        if (this.sellers) {
          this.chooseSeller(Number(Object.keys(this.sellers)[0]))
          let reviews = []
          let rates = [] as Array<number>
          Object.keys(this.sellers).forEach( sellerId => {
            this.sellers[sellerId][0].builder_info.feedbacks.customers.forEach( customer => {
              reviews.push(customer)
              rates.push(customer.estimation_customer)
            })
            // += this.sellers[sellerId].feedbacks.customers.reduce( (acc, curr) => acc.estimation_customer + curr.estimation_customer)
          })
          this.quantityOfReviews = reviews.length
          if (rates.length) {
            this.averageRate = rates.reduce( (acc, curr) => acc + curr) / rates.length
          }
        }
      },
      deep: true
    }
  }
})
</script>

<style scoped>
.reviews {
  max-width: 100%;
}
.reviews__description {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #2D2D2D;
  margin-bottom: 32px;
}
.reviews__section-header {
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: repeat(2, min-content);
  gap: 12px;
  align-items: center;
}
.reviews__section-title {
  font-weight: 750;
  font-size: 16px;
  line-height: 120%;
  color: #090909;
}
.reviews__section-quantity {
  padding-top: 1px;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #6A6A6A;
}
.reviews__builders {
  display: grid;
  gap: 4px;
  grid-auto-flow: column;
  justify-content: start;
  margin-bottom: 24px;
}
.reviews__builder {
  height: 56px;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F9F9F9;
  border-radius: 28px;
  overflow: hidden;
  transition: all .3s;
}
.reviews__builder--choosed {
  border: 2px solid #000000;
}
.reviews__builder--unchoosed {
  border: 2px solid #00000000;
}
.reviews__builder-icon {
  max-width: 32px;
  max-height: 32px;
}
.reviews__summary {
  display: grid;
  grid-auto-flow: column;
  margin-bottom: 12px;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
}
.reviews__average-rate {
  font-weight: 750;
  font-size: 26px;
  line-height: 120%;
  color: #090909;
}
.reviews__summary-stars, .review__rate {
  display: grid;
  grid-template-columns: repeat(5, min-content);
  gap: 4px;
  align-items: center;
}
.review__rate > img {
  height: 14px;
  width: 14px;
}
.reviews__categories {
  display: grid;
  grid-template-rows: repeat(3, 36px); 
  grid-template-columns: 100%;
  gap: 12px;
  margin-bottom: 40px;
}
.reviews__category {
  display: grid;
  grid-template-columns: min-content min-content auto;

  align-items: center;
  gap: 8px;
}
.reviews__category-name {
  white-space: nowrap;
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #2D2D2D;
}
.reviews__category-rate {
  font-weight: 750;
  font-size: 12px;
  line-height: 120%;
  color: #6A6A6A;
}
.reviews__category-info-btn {
  justify-self: flex-end;
}
.reviews__category-info-bar {
  grid-column: 1 / -1;
  height: 4px;
  width: 100%;
  background: #E0E0E0;
  border-radius: 2px;
  display: flex;

}
.reviews__category-info-bar-value {
  height: 4px;
  border-radius: 2px;
  background: #FE7B5E;
  transition: all .3s;
}


.reviews__photos {
  margin-bottom: 32px;
}

.reviews__photos-items {
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  overflow-x: auto;
  max-width: 100%;
}
.reviews__photos-item {
  height: 72px;
  width: 72px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
}

.reviews__reviews {}
.reviews__review {
  margin-bottom: 40px;
}
.reviews__review:last-child {
  margin-bottom: 0;
}
.review {
  display: grid;
  gap: 25px;
}
.review__header {
  display: grid;
  grid-template-columns: 40px auto min-content;
  grid-template-rows: repeat(2, 1fr);
  column-gap: 12px;
  row-gap: 4px;
  align-items: center;
  grid-auto-flow: column;

}
.review__user-icon {
  grid-row: 1 / 3;
}
.review__user-name {
  font-weight: 750;
  font-size: 14px;
  line-height: 120%;
  color: #090909;
}
.review__rate {
  display: flex;
  align-items: center;
}
.review__date {
  white-space: nowrap;
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  align-self: flex-end;
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #6A6A6A;
}
.review__body {
  display: grid;
  gap: 24px;
}
.review__photos {
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  justify-content: flex-start;
}
.review__photo {
  height: 72px;
  width: 72px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
}
.review__subtitle {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #6A6A6A;
  margin-bottom: 8px;
}
.review__paragraph {
  font-weight: 750;
  font-size: 12px;
  line-height: 125%;
  color: #2D2D2D;
}

</style>