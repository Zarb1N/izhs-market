<template>
  <IonPage>
    <RouterView
      :house="generalStore.houseInfo"
      :prices="prices"
      :builders="builders"
      :cashback="cashback"
    />
  </IonPage>
</template>

<script lang="ts">
import { useStore } from "@/stores/general";
import { defineComponent } from "@vue/runtime-core";
import { IonRouterOutlet, IonContent, IonPage, IonHeader } from '@ionic/vue';

export default defineComponent({
  name: 'House',
  data: () => ({
    generalStore: useStore(),
    prices: {} as {[key: string]: string | object},
    builders: {},
    cashback: [] as Array<{}>,
  }),
  methods: {
    async combineHouseAndBuildersInfo(id: string) {
      const [house, builders] = await Promise.all([
        this.getHouseInfo(id),
        this.getBuildersInfo(),
      ]);
      house.price_history.forEach((item: { [key: string]: any | number }) => {
        builders.forEach((builder: { [key: string]: any }) => {
          if (item.builders_id === builder.id) {
            item.builder_info = builder;
          }
        });
      });
      this.generalStore.houseInfo = house
      const prices = this.generalStore.houseInfo.price_history.map( (item: {[key: string]: string | number}) => item.price)
      this.prices = {
        min: Math.min(...prices).toString(),
        max: Math.max(...prices).toString()
      }
      this.formatSellersInfo()
      this.getClubBenefits(this.generalStore.houseInfo.club_id)
    },
    async getHouseInfo(id: string) {
      const res = await fetch(`${this.generalStore.server}/houses/${id}`);
      return await res.json();
    },
    async getBuildersInfo() {
      const res = await fetch(`${this.generalStore.server}/builders`);
      return await res.json();
    },
    async formatSellersInfo() {
      const data: {
        [key: string]: any;
      } = {};
      if (Object.keys(this.generalStore.houseInfo).length !== 0) {
        this.generalStore.houseInfo.price_history.forEach((item: { [key: string]: any }) => {
          if (Object.keys(data).indexOf(item.builders_id.toString()) === -1) {
            data[item.builders_id] = [item];
          } else {
            data[item.builders_id].push(item);
          }
        });
        this.builders = data;
      }
    },
    async getClubBenefits(clubIds: Array<number | string>) {
      const res = await fetch(`${this.generalStore.server}/club`)
      const clubs = await res.json()
      clubs.forEach( (club : {[key: string]: any}) => {
         if (clubIds.indexOf(club.id) !== -1 ) {
           club.cashbacks_list.forEach( (item : {}) => {
             this.cashback.push(item)
           })
         }
      })
    },
  },
  computed: {
  },
  mounted() {
    this.combineHouseAndBuildersInfo(this.$route.params.id.toString())
  },
  created() {
  },
  components: {
    IonPage,
    IonContent,
    IonRouterOutlet,
    IonHeader,
  }
})
</script>

<style scoped>
.house {
  min-height: 100%;
}
</style>