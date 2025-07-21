import 'element-plus/dist/index.css'
import '@/styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createI18n} from 'vue-i18n'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh: {
      confirm: '确认',
      cancel: '取消',
      edit: '编辑',
      report: '举报',
      details: '详情',
      popular: '热门',
      latest: '最新',
      agree: '赞成',
      against: '反对',

      review: '评论',
      server: '服务器',

      gallery: '画廊',

      createdAt: '创建于',
      game: '游戏',
      updatedAt: '更新于',
      title: '标题',
      subTitle: '副标题',
      label: '名称',
      notice: '公告',
      name: '名称',
      online: '在线',
      port: '端口',
      slug: '标识',
      sort: '排序',
      reviewCount: '评论数量',
      profile: '简介',
      user: {
        name: '用户名',
      },

      writeReview: '写评论',
    },
  },
})


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(i18n)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
