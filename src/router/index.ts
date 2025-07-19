import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    nav?: {
      index: string,
      label: Record<string, string>,
      icon?: object,
    },
    activeIndex?: string,
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: {
      activeIndex: '/',
    },
  },
  {
    path: '/doc-groups',
    component: () => import('@/pages/wiki/ListDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/new',
    component: () => import('@/pages/wiki/EditDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/:docGroup/new',
    component: () => import('@/pages/wiki/EditDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/:docGroup/edit',
    component: () => import('@/pages/wiki/EditDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/docs/:doc',
    component: () => import('@/pages/wiki/GetDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/docs/:doc/edit',
    component: () => import('@/pages/wiki/EditDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/forum-groups',
    component: () => import('@/pages/bbs/ListForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/new',
    component: () => import('@/pages/bbs/EditForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/:forumGroup/edit',
    component: () => import('@/pages/bbs/EditForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/:forumGroup/new',
    component: () => import('@/pages/bbs/EditForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum',
    component: () => import('@/pages/bbs/GetForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum/edit',
    component: () => import('@/pages/bbs/EditForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum/new',
    component: () => import('@/pages/bbs/EditPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/posts/:post',
    component: () => import('@/pages/bbs/GetPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/posts/:post/edit',
    component: () => import('@/pages/bbs/EditPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/bbs-news',
    component: () => import('@/pages/bbs/BbsNews.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/users',
    component: () => import('@/pages/bbs/BbsMembers.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/users/:user',
    component: () => import('@/pages/bbs/GetUser.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/guilds',
    component: () => import('@/pages/guild/ListGuild.vue'),
    meta: {
      activeIndex: '/guilds',
    },
  },
  {
    path: '/guilds/:guild',
    component: () => import('@/pages/guild/GetGuild.vue'),
    meta: {
      activeIndex: '/guilds',
    },
  },
  {
    path: '/albums',
    component: () => import('@/pages/gallery/ListAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/new',
    component: () => import('@/pages/gallery/EditAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album',
    component: () => import('@/pages/gallery/GetAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album/new',
    component: () => import('@/pages/gallery/AddImage.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album/edit',
    component: () => import('@/pages/gallery/EditAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/cloud',
    component: () => import('@/pages/cloud/Cloud.vue'),
  },
  {
    path: '/servers',
    component: () => import('@/pages/server/ListServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/new',
    component: () => import('@/pages/server/EditServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/:server',
    component: () => import('@/pages/server/GetServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/:server/edit',
    component: () => import('@/pages/server/EditServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/:type/:slug/new-review',
    component: () => import('@/views/EditReview.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
