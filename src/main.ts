import './assets/main.css'
import InlineSvg from 'vue-inline-svg';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import store from './store'

import App from './App.vue'
import router from './router'
import Vintersection from './directives/Vintersection'

import components from "@/components/UI"
import { options } from './data/option';

const app = createApp(App)


app.use(store.original)

.component('inline-svg', InlineSvg);

components.forEach(component => {
    app.component(component.name, component)
})
app.directive("intersection", Vintersection)


.use(Toast, options)
.use(router)
.mount('#app')
