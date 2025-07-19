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
    component: () => import('@/wiki/ListDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/new',
    component: () => import('@/wiki/EditDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/:docGroup/new',
    component: () => import('@/wiki/EditDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/:docGroup/edit',
    component: () => import('@/wiki/EditDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/docs/:doc',
    component: () => import('@/wiki/GetDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/docs/:doc/edit',
    component: () => import('@/wiki/EditDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/forum-groups',
    component: () => import('@/bbs/ListForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/new',
    component: () => import('@/bbs/EditForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/:forumGroup/edit',
    component: () => import('@/bbs/EditForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/:forumGroup/new',
    component: () => import('@/bbs/EditForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum',
    component: () => import('@/bbs/GetForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum/edit',
    component: () => import('@/bbs/EditForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum/new',
    component: () => import('@/bbs/EditPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/posts/:post',
    component: () => import('@/bbs/GetPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/posts/:post/edit',
    component: () => import('@/bbs/EditPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/bbs-news',
    component: () => import('@/bbs/BbsNews.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/users',
    component: () => import('@/bbs/BbsMembers.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/users/:user',
    component: () => import('@/bbs/GetUser.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/guilds',
    component: () => import('@/guild/ListGuild.vue'),
    meta: {
      activeIndex: '/guilds',
    },
  },
  {
    path: '/guilds/:guild',
    component: () => import('@/guild/GetGuild.vue'),
    meta: {
      activeIndex: '/guilds',
    },
  },
  {
    path: '/albums',
    component: () => import('@/gallery/ListAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/new',
    component: () => import('@/gallery/EditAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album',
    component: () => import('@/gallery/GetAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album/new',
    component: () => import('@/gallery/AddImage.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album/edit',
    component: () => import('@/gallery/EditAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/cloud',
    component: () => import('@/cloud/Cloud.vue'),
  },
  {
    path: '/servers',
    component: () => import('@/server/ListServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/new',
    component: () => import('@/server/EditServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/:server',
    component: () => import('@/server/GetServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/:server/edit',
    component: () => import('@/server/EditServer.vue'),
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
