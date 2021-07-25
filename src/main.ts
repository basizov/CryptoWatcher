import { createApp } from 'vue'
import App from './App.vue'
import uiComponents from './components/ui'

const vueApplication = createApp(App);

uiComponents.forEach((uiComponent) => {
  vueApplication.component(uiComponent.name, uiComponent);
})

vueApplication
  .mount('#app')
