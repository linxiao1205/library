import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css' //element-plus组件的样式
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import { createPinia } from 'pinia' //引入pinia
import moment from 'moment' //引入时间转换 moment
import './styles/theme/default.css' //引入css文件时，不需要给文件附名

const app = createApp(App)
app.config.globalProperties.$axios = axios

app.use(ElementPlus)
app.use(createPinia()) //注册pinia
app.use(router)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
