<template>
  <IonPage>
    <IonContent>
      <div class="services">
        <div class="services__header">
          <img
            class="services-header__back-btn"
            src="../assets/icons/arrow-left--black.svg"
            @click="() => {$route.matched.map(path => path.name).indexOf('Сервисы') === -1 ? $router.push('/home/services') : $router.push('/home')}"
            v-if="$route.matched.map( (item: {[key: string]: string}) => item.name)[1] !== 'Сервисы'"
          />
          <div class="services__title title--primary">{{$route.matched.map( (item: {[key: string]: string}) => item.name)[2]}}</div>
        </div>
        <RouterView style="position: static; height: 100%;"/>
        <div
          class="services__bottom-elements"
          v-if="$route.matched.map( (item: {[key: string]: string}) => item.name)[2] !== 'Сервисы'"
        >
          <input
            class="services__input-telephone-number"
            placeholder="Введите номер телефона"
            v-model="phoneNumber"
          />
          <div
            class="services__create-application-btn"
            @click="sendApplicationForService()"
          >Перейти к заявке</div>
        </div>
      </div>
    </IonContent>
  </IonPage>

</template>

<script lang="ts">
import { useStore } from '@/stores/general'
import { defineComponent } from '@vue/runtime-core'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet } from '@ionic/vue';


export default defineComponent({
  data: () => ({
    generalStore: useStore(),
    services: [
      {
        groupName: 'Участок',
        title: 'Проверить участок',
        name: 'Проверить участок <br/> до его покупки',
        image: 'plot-of-land',
        goTo: '/home/services/check-plot'
      },
      {
        groupName: 'Дом',
        title: 'Построить дом',
        name: 'Построить дом <br/> по своему проекту',
        image: 'сoncrete-house',
        goTo: '/home/services/build-house'
      },
      {
        groupName: 'Дом',
        title: 'Спроектировать дом',
        name: 'спроектировать <br/> новый дом',
        image: 'roof-sceleton',
        goTo: '/home/services/design-house'
      },
      {
        groupName: 'Пока недоступные',
        name: 'установить <br/> коммуникации',
        image: 'pipes'
      },
      /*
      {
        groupName: 'Пока недоступные',
        name: 'Благоустроить <br/> участок под ключ',
        image: 'square-arches'
      },
      */
      {
        groupName: 'Пока недоступные',
        name: 'реконструировать <br/> старый дом',
        image: 'modern-hut'
      },
    ] as Array<{[key: string]: string}>,
    phoneNumber: '' as string
  }),
  methods: {
    async sendApplicationForService() {
      const choosedServiceItem : {[key: string]: string} = this.services.filter(service => service.goTo === this.$route.path)[0]
      const res = await fetch(`${this.generalStore.server}/applicationsservices`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          name: choosedServiceItem.name.replace('<br/>', ''),
          phone_number: this.phoneNumber
        })
      })
      if (res.status === 200) {
        const data = await res.json()
        if (this.generalStore.deviceState.applications_services_id && this.generalStore.deviceState.applications_services_id.indexOf(data.id) === -1) {
          this.generalStore.deviceState.applications_services_id.push(data.id)
          fetch(`${this.generalStore.server}/states/${this.generalStore.deviceId}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              device_id: this.generalStore.deviceId,
              applications_services_id: this.generalStore.deviceState.applications_services_id
            })
          })
        }
      }
      else {
        this.generalStore.showErrorNotification(res)
      }
      this.$router.push('/my-project')
    },
    servicesGroups() {
      const groups: Array<string>= []
      this.services.forEach((service: {[key: string]: string}) => {
        if (groups.indexOf(service.groupName) === -1) {
          groups.push(service.groupName)
        }
      })
      this.generalStore.servicesGroups = groups
      this.generalStore.services = this.services
    }
  },
  computed: {

  },
  mounted() {
    this.servicesGroups()
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonRouterOutlet }
})

</script>

<style scoped>
.services {
  display: grid;
  grid-template-rows: 67px auto 113px;
  height: 100%;
}
.services__header {
  width: 100%;
  background: linear-gradient(273.3deg, #82B9F0 0%, #96C7F9 100%);
  padding: 20px 14px 15px 14px;
  display: flex;
  gap: 10px;
}
.services-header__back-btn {
  width: 32px;
  height: 32px;
}
.services-subpage {
  padding: 31px 14px 30px 14px;
}
.services__input-telephone-number {
  height: 57px;
  border: none;
  text-align: center;
  width: 100%;
  border-top: 1px solid #B5BFC9;
}
.services__input-telephone-number::placeholder {
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #A7AFB8;
}
.services__create-application-btn {
  margin-left: -14px;
  margin-right: -14px;
  height: calc(20px + 18px * 2);
  background: #439A86;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #151918;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 0;
}
</style>