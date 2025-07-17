<script setup lang="ts">
import usePersistedStore from '@/stores/persisted';
import useSessionStore from '@/stores/session';
import {Menu, UserFilled} from '@element-plus/icons-vue';
import {ref} from 'vue';

const languages = [
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

interface NavbarItem {
  index: string
  label: Record<string, string>
}

const isDrawerOpen = ref(false)
const persisted = usePersistedStore()
const session = useSessionStore()

const navbarItems: NavbarItem[] = [
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
</script>

<template>
  <el-menu mode="horizontal" router :default-active="$route.meta.activeIndex" class="gap-2">

    <el-menu-item @click="isDrawerOpen=true">
      <el-icon :size="30">
        <Menu />
      </el-icon>
    </el-menu-item>

    <el-menu-item
      v-for="item in navbarItems"
      :key="item.index"
      :index="item.index"
    >
      {{item.label[$i18n.locale]}}
    </el-menu-item>

    <!-- 多语言切换 -->
    <el-sub-menu class="navlist-no-arrow nav-list ms-auto" index="language">
      <template #title>
        &nbsp;
        <el-icon>
          <lang-icon />
        </el-icon>
        &nbsp;
      </template>
      <el-menu-item
        v-for="language in languages"
        :key="language.id"
        @click="persisted.locale=language.id"
      >
        {{ language.label }}
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="userMenu" class="ms-auto">
      <template #title>
        <el-avatar v-if="session.user"></el-avatar>
        <el-avatar v-else :icon="UserFilled"></el-avatar>
      </template>
    </el-sub-menu>

  </el-menu>

  <el-drawer v-model="isDrawerOpen" direction="ltr" body-class="p-0">
    <el-menu mode="vertical" router :default-active="$route.meta.activeIndex">
      <el-menu-item v-for="item in navbarItems" :key="item.index" :index="item.index">
        {{item.label[$i18n.locale]}}
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<style>
.navbar {
  --el-menu-horizontal-height: 40px;
	--el-menu-hover-bg-color: var(--primary-light);
	--el-menu-hover-text-color: var(--el-menu-text-color);
}

.nav-item:focus {
	background-color: var(--primary) !important;
}
</style>
