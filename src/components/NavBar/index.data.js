import { ref } from 'vue'







export const langurages = [
  { id: 'en', label: 'English' },
  { id: 'zhCN', label: '简体中文' },
  { id: 'zhTW', label: '繁體中文' },
  { id: 'ru', label: 'Русский' },
  { id: 'fr', label: 'Français' },
  { id: 'ko', label: '한국어' },
  { id: 'ja', label: '日本語' },
  { id: 'es', label: 'Español' },
  { id: 'pt', label: 'Português' },
  { id: 'ar', label: 'البرتغالية'},
]

export const navbarItems = [
  {
    index: '/',
    label: {
      zh: '主页',
      en: 'Home',
    },
  },
  {
    index: '/doc-groups',
    label: {
      zh: '文档站',
      en: 'Wiki',
    },
  },
  {
    index: '/forum-groups',
    label: {
      zh: '论坛',
      en: 'BBS',
    },
  },
  {
    index: '/guilds',
    label: {
      zh: '公会',
      en: 'Guild',
    },
  },
  {
    index: '/albums',
    label: {
      zh: '画廊',
      en: 'Gallery',
    },
  },
  {
    index: '/cloud',
    label: {
      zh: '文件站',
      en: 'Cloud',
    },
  },
  {
    index: '/servers',
    label: {
      zh: '服务器',
      en: 'Servers',
    },
  },
]