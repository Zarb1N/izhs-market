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
      const [house, builders, equimpents] = await Promise.all([
        this.getHouseInfo(id),
        this.getBuildersInfo(),
        this.getEquipments()
      ]);
      if (house.price_history) {
        house.price_history.forEach((item: { [key: string]: any | number }) => {
          builders.forEach((builder: { [key: string]: any }) => {
            if (item.builders_id === builder.id) {
              item.builder_info = builder
            }
          })
          equimpents.forEach(equip => {
            if (item.equipments_id === equip.id) {
              item.equipment_info = equip
            }
          })
          console.log(item)
        })
      }
      console.log(house)
      this.generalStore.houseInfo = house
      if (this.generalStore.houseInfo.price_history) {
        const prices = this.generalStore.houseInfo.price_history.map( (item: {[key: string]: string | number}) => item.price)
        this.prices = {
          min: Math.min(...prices).toString(),
          max: Math.max(...prices).toString()
        }
        this.formatSellersInfo()
      }
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
    async getEquipments() {
      const res = await fetch(`${this.generalStore.server}/equipments`)
      return await res.json() 
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
    async markHouseAsViewed(houseId: number) {
      if (this.generalStore.deviceState.viewed_houses_id.indexOf(houseId) !== -1) {
        this.generalStore.deviceState.viewed_houses_id = this.generalStore.deviceState.viewed_houses_id.filter( (house_id : number) => house_id !== houseId)
        this.generalStore.deviceState.viewed_houses_id.push(houseId)
      }
      else {
        this.generalStore.deviceState.viewed_houses_id.push(houseId)
        const res = await fetch(`${this.generalStore.server}/states/${this.generalStore.deviceId}`, {
          method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            device_id: this.generalStore.deviceId,
            viewed_houses_id: this.generalStore.deviceState.viewed_houses_id
          })
        })
        const data = await res.json()
      }
      
    }
  },
  computed: {
  },
  mounted() {
    this.combineHouseAndBuildersInfo(this.$route.params.id.toString())
    this.generalStore.deviceState.viewed_houses_id && this.markHouseAsViewed(Number(this.$route.params.id))
    console.log(this.generalStore.houseInfo)
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