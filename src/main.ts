import { createApp/*, useAttrs, useAttrs*/ } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue';

import '@ionic/vue/css/core.css';
import VueVirtualScroller from 'vue-virtual-scroller';


/* 
// Basic CSS for apps built with Ionic 
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

// Optional CSS utils that can be commented out 
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// Theme variables 
import './theme/variables.css';
*/

import App from './App.vue'
import router from './router'
import { useGeneralStore } from './stores/general'

const app = createApp(App)


app.use(createPinia())
// app.use(IonicVue)
app.use(router)
app.use(VueVirtualScroller);

app.config.errorHandler = (error) => useGeneralStore().showErrorNotification(error);


app.mount('#app')
