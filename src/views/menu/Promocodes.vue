<template>
  <div class="promocodes menu-subpage">
    <Card color="gray" style="margin-bottom: 30px">
      <div class="promocodes__search-card">
        <div 
          class="promocodes__input-field"
          :class="isError && 'promocodes__input-field--error'"
        >
          <input 
            class="promocodes__input"
            type="text"
            placeholder="Введите промокод"
            @focus="isError = false"
            v-model="inputContent"
          >
          <div class="promocodes__error-message">{{errorMessage}}</div>
          <img 
            class="promocodes__error-icon"
            src="../../assets/icons/exclamation-point-in-circle--red.svg"
          />
        </div>
        <div 
          class="promocodes__submit-button"
          @click="() => {inputContent.length > 0 && tryToGetPromocodeTicket(inputContent)}"
        >Добавить</div>
      </div>
    </Card>
    <Card
      v-if="userPromocodes.length === 0"
    >
      <div class="promocodes__empty-plug">
          <img 
            class="promocodes__empty-plug-icon"
            src="../../assets/emojis/admission-tickets.svg"
          />
          <div class="promocodes__empty-plug-name">Пока ничего <br/> не добавлено</div>
      </div>
    </Card>
    <div v-else>
      <div class="promocodes__title">Добавленные промокоды:</div>
      <div class="promocodes__tickets">
        <div 
          class="promocodes__ticket"
          v-for="ticket in userPromocodes"
          :key="ticket.id"
        >
          <div class="promocodes__ticket-name">{{ticket.name}}</div>
          <div class="promocodes__ticket-description">{{ticket.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ContentCard from "@/components/ContentCard.vue";
import { useGeneralStore } from "@/stores/general";

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    isError: false,
    inputContent: '',
    errorMessage: '' as string,
    // userTickets: [] as Array<{[key: string]: string | number}>
  }),
  methods: {
    async tryToGetPromocodeTicket(promocodeId: string | number) {
      const res = await fetch(`${this.generalStore.server}/promocodes/${promocodeId}`)
      const data = await res.json()
      if (res.status >= 400 || !data) {
        this.isError = true
        this.errorMessage = 'промокод не найден'
      }
      else if (this.generalStore.deviceState.promocodes_id.indexOf(data.id) !== -1) {
        this.isError = true
        this.errorMessage = 'нельзя дважды применить промокод'
      }
      else {
        this.generalStore.deviceState.promocodes_id.push(data.id)        
        // this.userTickets.push(data)
        fetch(`${this.generalStore.server}/states/${this.generalStore.deviceId}`, {
          method: 'PATCH',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            device_id: this.generalStore.deviceId,
            promocodes_id: this.generalStore.deviceState.promocodes_id
          })
        })
      }
    },
  },
  computed: {
    userPromocodes() : Array<{[key: string]: number | string}> {
      if (this.generalStore.deviceState.promocodes_id) {
        const promocodes =  this.generalStore.allPromocodes.filter( (code : {[key: string]: number | string }) => {
          return this.generalStore.deviceState.promocodes_id.indexOf(code.id) !== -1
        })
        return promocodes
      }
      return []
    }
  },
  mounted() {
  },
  components: {
    Card: ContentCard,
}
})

</script>

<style scoped>
.promocodes__search-card {
  display: flex;
  gap: 15px;
  align-items: center;
}
.promocodes__input-field {
  height: 37px;
  width: 100%;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
}
.promocodes__input {
  width: 100%;
  height: 100%;
  border: none;
  padding: 10px 15px;
  outline: none;
  transition: all .3s;
}
.promocodes__error-message {
  font-size: 8px;
  line-height: 80%;
  text-align: center;
  color: #AA2020;
  position: relative;
  height: 0;
  margin-top: -30px;
  padding-left: 15px;
  opacity: 0;
  transition: all .3s;
}
.promocodes__error-icon {
  position: relative;
  width: 16px;
  height: 16px;
  margin-top: 10.5px;
  margin-left: -29px;
  opacity: 0;
  transition: 0.3s all;

}
.promocodes__error-icon, .promocodes__error-message {
  position: absolute;
}
.promocodes__submit-button {
  background: var(--green); 
  min-width: 90px !important;
  height: 37px;
  color: #ECF4F3;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}
.promocodes__input-field--error {}
.promocodes__input-field--error .promocodes__input {
  padding: 15px 15px 5px 15px;
}
.promocodes__input-field--error .promocodes__error-message {
  opacity: 1;
}
.promocodes__input-field--error .promocodes__error-icon {
  opacity: 1;
}

.promocodes__empty-plug {
  padding: 27px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.promocodes__title {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
}
.promocodes__empty-plug-icon {
  height: 36px;
  width: 36px;
}
.promocodes__empty-plug-name {
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
}
.promocodes__tickets {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.promocodes__ticket {
  background: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(91, 104, 113, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  border-radius: 15px;
  padding: 18px 15px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.promocodes__ticket-name {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
}
</style>