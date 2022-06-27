<template>
  <div
    class="product"
    :style="{
      backgroundImage: `url(${data.image_preview && data.image_preview.url})`,
      backgroundColor: '#883FFF',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <div class="product__top">
      <div 
        class="product__badge"
        v-show="cardBudge"
        @click="$emit('goToHouse')"
      >{{cardBudge}}</div>
      <img
        class="product__favorites-btn"
        :src="generalStore.getImageURL(`icons/heart--${isFavorite ? 'filled' : 'empty'}.svg`)"
        @click="interactWithFavoritesList(data.id)"
      />
      <div
        class="product__name"
        @click="$emit('goToHouse')"
      >{{data.name}}</div>
    </div>
    <div 
      class="product__middle"
      @click="$emit('goToHouse')"
    ></div>
    <div
      class="product__bottom"
      @click="$emit('goToHouse')"
    >
      <div class="product__country-and-builders">
        <div class="product__builders">
          <div
            class="product__builder"
            v-for="id in buildersIds"
            :key="id"
            :style="{zIndex: buildersIds.length - buildersIds.indexOf(id)}"
            v-show="generalStore.builders.filter(builder => builder.id === id).length"
          >
            <img 
              :src="generalStore.builders.filter(builder => builder.id === id)[0].image.url"
              v-if="generalStore.builders.filter(builder => builder.id === id).length"
            />
          </div>
        </div>
        <img class="product__country"/>
      </div>
      <div class="product__area">{{data.square}} м<sup>2</sup></div>
      <div 
        class="product__price"
        v-show="priceRange.reduce( (acc, item) => Number(acc.replace(',', '.')) + Number(item.replace(',', '.')))"
      >{{priceRange[0]}}-{{priceRange[1]}} млн ₽</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { useGeneralStore } from '@/stores/general';

export default defineComponent({
  props: [
    'data',
    'cardBudge',
    'isFavorite'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
  }),
  methods: {
    interactWithFavoritesList(houseId : number | string) {
      this.generalStore.choosedHouseId = houseId
      !this.isFavorite
        ? this.generalStore.addToFavorites()
        : this.generalStore.removeFromFavourites()
    }
  },
  computed: {
    priceRange() : Array<string> {
      if (this.data.price_history) {
        const prices: Array<number> = this.data.price_history.map( (item: {[key: string]: any}) => item.price/1000000)
        return [
          Math.min(...prices).toFixed(1).toString().replace('.', ','),
          Math.max(...prices).toFixed(1).toString().replace('.', ',')
        ]
      }
      return ['0', '0']

    },
    images() : Array<{[key: string]: string}> {
      const images = this.data.images.map( (image: {[key: string]: string}) => image.url)
      return images
    },
    buildersIds() {
      const buildersIds = [] as Array<number>
      if (this.data.price_history) {
        this.data.price_history.forEach( (offer : {[key: string] : any}) => {
          buildersIds.indexOf(offer.builders_id) === -1 && buildersIds.push(offer.builders_id)
        })
      }
      return buildersIds
    }
  },
  mounted() {
  },
  components: {
    Flicking,
  },
})

</script>


<style scoped>
  .product {
    height: 280px;
    border-radius: 10px 10px 12px 12px;
    overflow: hidden;
    display: grid;
    grid-template-rows: min-content auto min-content;
    grid-auto-flow: column;
    box-shadow: 1px 1px 8px #DDDCDF;
    width: 100%;
    position: relative;
    padding: 20px;
  }
  .product__name {
    grid-column: 1 / 3;
    font-weight: 750;
    font-size: 16px;
    line-height: 120%;
    color: #F9F9F9;
  }
  .product__top {
    display: grid;
    grid-template-columns: min-content 16px;
    grid-template-rows: 18px auto;
    justify-content: space-between;
    gap: 8px;
  }

  .product__badge {
    background: #F9F9F9;
    border-radius: 20px;
    padding: 4px 8px;
    font-weight: 750;
    font-size: 8px;
    line-height: 120%;
    color: #090909;
    width: min-content;
    white-space: nowrap;
  }
  .product__favorites-btn {
    grid-column: 2 / 3;
  }
 
  .product__bottom {
    display: grid;
    align-self: flex-end;
    grid-template-columns: min-content auto;
    grid-template-rows: repeat(3, min-content);
  }
  .product__country-and-builders {
    display: grid;
    grid-auto-flow: row;
    gap: 8px;
    margin-bottom: 19px;
  }
  .product__builders {
    grid-template-columns: 14px;
    display: grid;
    grid-auto-flow: column;
  }
  .product__builder {
    background: #F8F8F8;
    border: 1px solid rgba(9, 9, 9, 0.08);
    border-radius: 70px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .product__builder img {
    max-height: 12px;
    max-width: 12px;
  }
  .product__area, .product__price {
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
  }
  .product__area sup {
    font-size: 8px;
    vertical-align: super;
    position: absolute;
    margin-top: -2px;
  }
  .product__area, .product__price {
    grid-column: 1 / 3;
    color: #F9F9F9;
    font-stretch: 151;
  }
  .product__area {
  }
  .product__price {
    margin-top: 4px;
  }
</style>>
