import { createRouter, createWebHistory } from '@ionic/vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Главная',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Главная Обзор',
        component: () => import('../views/HomeOverview.vue')
      },
      {
        path: 'services',
        name: 'Услуги',
        component: () => import('../views/Services.vue'),
        redirect: '/home/services/choose-service',
        children: [
          {
            path: 'choose-service',
            name: 'Сервисы',
            component: () => import('../views/services/ServicesGeneral.vue'),
          },
          {
            path: 'check-plot',
            name: 'Проверить участок',
            component: () => import('../views/services/CheckPlot.vue'),
          },
          {
            path: 'build-house',
            name: 'Построить дом',
            component: () => import('../views/services/BuildHouse.vue'),
          },
          {
            path: 'design-house',
            name: 'Спроектировать дом',
            component: () => import('../views/services/DesignHouse.vue'),
          },
        ]
      },
    ]
  },
  {
    path: '/catalog',
    name: 'Все дома',
    component: () => import('../views/Catalog.vue'),
    children: [
      {
        path: '',
        name: 'Каталог',
        component: () => import('../views/catalog/CatalogOverview.vue')
      },
      {
        path: 'architecture-set/:setId',
        name: 'Архитектурный набор',
        component: () => import('../views/catalog/CatalogArchitectureSet.vue')
      },
      {
        path: 'custom-set/:setId',
        name: 'Подборка',
        component: () => import('../views/catalog/CustomSet.vue')
      },
      {
        path: 'favourites',
        name: 'Избранное',
        component: () => import('../views/catalog/Favourites.vue')
      },
      {
        path: 'countries-set/:countryId',
        name: 'Страна',
        component: () => import('../views/catalog/CountriesSet.vue')
      },
      {
        path: 'builders-set/:builderId',
        name: 'Застройщик',
        component: () => import('../views/catalog/BuildersSet.vue')
      },
      {
        path: 'without-price',
        name: 'Застройщик',
        component: () => import('../views/catalog/WithoutPrice.vue')
      },
    ]
  },
  {
    path: '/landscape',
    name: 'Landscape',
    component: () => import('../views/Landscape.vue')
  },
  {
    path: '/my-project',
    name: 'Стройка',
    component: () => import('../views/MyProject.vue'),
    redirect: '/my-project/empty',
    children: [
      {
        path: 'empty',
        name: 'My Project Empty',
        component: () => import('../views/my-project/MyProjectEmpty.vue')
      },
      {
        path: 'house/:id',
        name: 'My Project House',
        component: () => import('../views/my-project/MyProjectHouse.vue')
      }
    ]
  },
  {
    path: '/menu',
    name: 'Меню',
    component: () => import('../views/Menu.vue'),
    children: [
      {
        name: 'Помощь',
        path: 'help',
        component: () => import('../views/menu/HelpPage.vue')
      },
      {
        name: 'Девелоперам',
        path: 'for-partners',
        component: () => import('../views/menu/SystemPage.vue')
      },
      {
        name: 'Меню главная',
        path: '',
        component: () => import('../views/menu/MenuGeneral.vue')
      },
      {
        name: '',
        path: 'status',
        component: () => import('../views/menu/StatusPage.vue')
      },
      {
        name: 'Мой статус',
        path: 'my-state',
        component: () => import(`../views/menu/MyState.vue`)
      },
      {
        name: 'Сравнение',
        path: 'comparison',
        component: () => import(`../views/menu/Comparison.vue`)
      },
      {
        name: 'Как это работает',
        path: 'how-it-works',
        component: () => import(`../views/menu/HowItWorks.vue`)
      },
      {
        name: 'Вопрос — ответ',
        path: 'question-answer',
        component: () => import(`../views/menu/QuestionAnswer.vue`)
      },
      {
        name: 'ИЖС Стандарт',
        path: 'izs-standard',
        component: () => import(`../views/menu/IzsStandard.vue`)
      },
      {
        name: 'Договоры',
        path: 'contracts',
        component: () => import(`../views/menu/ContractsPage.vue`)
      },
      {
        name: 'Росреестр',
        path: 'ros-registry',
        component: () => import(`../views/menu/RosRegistry.vue`)
      },
      {
        name: 'Общение',
        path: 'communication',
        component: () => import(`../views/menu/Communication.vue`)
      },
      {
        name: 'Промокоды',
        path: 'promocodes',
        component: () => import(`../views/menu/Promocodes.vue`)
      },
      {
        name: 'Реквизиты',
        path: 'requisites',
        component: () => import(`../views/menu/Requisites.vue`)
      },
      {
        name: 'Партнерам',
        path: 'for-partners',
        component: () => import(`../views/menu/ForPartners.vue`)
      },
    ]
  },
  {
    path: '/house/:id',
    name: 'Дом',
    component: () => import('../views/House.vue'),
    children: [
      {
        path: 'overview',
        name: 'Обзор',
        component: () => import('../views/house/HouseOverview.vue'),
        children: [
          {
            path: 'prices',
            name: 'История цен',
            component: () => import('../views/house/Prices.vue')
          },
          {
            path: 'construction-stages',
            name: 'Этапы проекта',
            component: () => import('../views/house/ConstructionStages.vue')
          },
          {
            path: 'information',
            name: 'Информация',
            component: () => import('../views/house/Information.vue')
          },
          {
            path: 'discussion',
            name: 'Обсуждения',
            component: () => import('../views/house/Discussion.vue')
          },
        ],
      },
      {
        path: 'gallery',
        name: 'Галерея проекта',
        component: () => import('../views/house/Gallery.vue')
      },
      {
        path: 'application',
        name: 'Заявка',
        component: () => import('../views/Application.vue')
      },
    ]
  },
  {
    path: '/story/:id',
    name: 'Story',
    component: () => import('../views/Story.vue')
  },













  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
