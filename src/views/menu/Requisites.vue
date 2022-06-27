<template>
  <div class="requisites menu-subpage">
    <div class="requisites__extension-panels">
      <ExtensionCard
        title="Лица компании"
        :isPrimaryTitle="true"
      >
        <div class="requisites__company-faces">
          <div
            class="requisites__company-face staff-row"
            v-for="(staff, index) in companyFaces"
            :key="index"
          >
            <img
              class="staff-row__image"
              src="../../assets/default-man-1.png"
            >
            <div class="staff-row__text-info">
              <div class="staff-row__name">{{staff.name}}</div>
              <div class="staff-row__additional-info">{{staff.post}}</div>
            </div>
          </div>
        </div>
      </ExtensionCard>
      <ExtensionCard
        title="Реквизиты"
        :isPrimaryTitle="true"
      >
        <div class="requisites__requisites">
          <div
            class="requisites__text-field"
            v-for="(requisite, index) in requisites"
            :key="index"
          >
            <div class="requisites__text-field-title">{{requisite.title}}</div>
            <div class="requisites__text-field-content">{{requisite.content}}</div>
          </div>
        </div>
      </ExtensionCard>
      <ExtensionCard
        class="requisites__faces"
        title="Расчетный счет"
        :isPrimaryTitle="true"
      >
        <div class="requisites__settlemental-account">
          <div
            class="requisites__text-field"
            v-for="(item, index) in settlementАccount"
            :key="index"
          >
            <div class="requisites__text-field-title">{{item.title}}</div>
            <div class="requisites__text-field-content">{{item.content}}</div>
          </div>
        </div>
      </ExtensionCard>
      <ExtensionCard
        class="requisites__faces"
        title="Контакты"
        :isPrimaryTitle="true"
      >
        <div class="requisites__contacts">
          <div
            class="requisites__contact"
            v-for="(contact, index) in contacts"
            :key="index"
          >
            <img
              class="requisites__contact-icon"
              :src="generalStore.getImageURL(`emojis/${contact.icon}.svg`)"
            />
            <div class="requisites__contact-text">{{contact.text}}</div>
          </div>
        </div>
      </ExtensionCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ExtensionCard from "@/components/ExtensionCard.vue";
import { useGeneralStore } from "@/stores/general";

export default defineComponent({
  props: [
    'data'
  ],
  data: () => ({
    generalStore: useGeneralStore(),
    companyFaces: [
      {
        name: 'Сергей Трутненко',
        post: 'Основатель ИЖС Маркет',
        image: 'default-man'
      },
      {
        name: 'Сергей Трутненко',
        post: 'Основатель ИЖС Маркет',
        image: 'default-man'
      },
      {
        name: 'Сергей Трутненко',
        post: 'Основатель ИЖС Маркет',
        image: 'default-man'
      },
    ],
    requisites: [
      {
        title: 'НАЗВАНИЕ',
        content: 'ИЖС МАРКЕТ',
      },
      {
        title: 'ЮРИДИЧЕСКИЙ АДРЕС',
        content: '107045, МОСКВА, БОЛЬШОЙ ГОЛОВИН переулок 2, строение 2',
      },
      {
        title: 'КПП',
        content: '770201001',
      },
      {
        title: 'ИНН',
        content: '9702038210',
      },
      {
        title: 'ОГРН',
        content: '1217700543191',
      },
    ],
    settlementАccount: [
      {
        title: 'РАСЧЕТНЫЙ СЧЕТ',
        content: '40702810710000940252',
      },
      {
        title: 'БАНК',
        content: 'Тинькофф Банк',
      },
      {
        title: 'БИК ',
        content: '044525974',
      },
      {
        title: 'ИНН',
        content: '7710140679',
      },
      {
        title: 'КОРРЕСПОНДЕНТСКИЙ СЧЕТ',
        content: '30101810145250000974',
      },
    ],
    contacts: [
      {
        icon: 'telephone',
        text: 'Позвонить'
      },
      {
        icon: 'e-mail',
        text: 'Написать на почту'
      }
    ]
  }),

  components: {
    ExtensionCard,
  }
})

</script>

<style scoped>
.requisites__extension-panels {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.requisites__company-faces {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.staff-row {
  display: flex;
  gap: 10px;
  align-items: center;
}
.staff-row__image {
  width: 43px;
  height: 43px;
}
.staff-row__text-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.staff-row__name {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.requisites__requisites, .requisites__settlemental-account {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.requisites__text-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.requisites__text-field-title {
  color: #1F5791;
}
.requisites__text-field-content {
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.requisites__contacts {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.requisites__contact {
  display: flex;
  gap: 10px;
  align-items: center;
}
.requisites__contact-icon {
  height: 30px;
  width: 30px;
}
</style>