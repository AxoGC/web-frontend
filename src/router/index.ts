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
    component: () => import('@/views/wiki/ListDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/new',
    component: () => import('@/views/wiki/EditDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/:docGroup/new',
    component: () => import('@/views/wiki/EditDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/doc-groups/:docGroup/edit',
    component: () => import('@/views/wiki/EditDocGroup.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/docs/:doc',
    component: () => import('@/views/wiki/GetDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/docs/:doc/edit',
    component: () => import('@/views/wiki/EditDoc.vue'),
    meta: {
      activeIndex: '/doc-groups',
    },
  },
  {
    path: '/forum-groups',
    component: () => import('@/views/bbs/ListForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/new',
    component: () => import('@/views/bbs/EditForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/:forumGroup/edit',
    component: () => import('@/views/bbs/EditForumGroup.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forum-groups/:forumGroup/new',
    component: () => import('@/views/bbs/EditForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum',
    component: () => import('@/views/bbs/GetForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum/edit',
    component: () => import('@/views/bbs/EditForum.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/forums/:forum/new',
    component: () => import('@/views/bbs/EditPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/posts/:post',
    component: () => import('@/views/bbs/GetPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/posts/:post/edit',
    component: () => import('@/views/bbs/EditPost.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/bbs-news',
    component: () => import('@/views/bbs/BbsNews.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/users',
    component: () => import('@/views/bbs/BbsMembers.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/users/:user',
    component: () => import('@/views/bbs/GetUser.vue'),
    meta: {
      activeIndex: '/forum-groups',
    },
  },
  {
    path: '/guilds',
    component: () => import('@/views/guild/ListGuild.vue'),
    meta: {
      activeIndex: '/guilds',
    },
  },
  {
    path: '/guilds/:guild',
    component: () => import('@/views/guild/GetGuild.vue'),
    meta: {
      activeIndex: '/guilds',
    },
  },
  {
    path: '/albums',
    component: () => import('@/views/gallery/ListAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/new',
    component: () => import('@/views/gallery/EditAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album',
    component: () => import('@/views/gallery/GetAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album/new',
    component: () => import('@/views/gallery/AddImage.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/albums/:album/edit',
    component: () => import('@/views/gallery/EditAlbum.vue'),
    meta: {
      activeIndex: '/albums',
    },
  },
  {
    path: '/cloud',
    component: () => import('@/views/cloud/Cloud.vue'),
  },
  {
    path: '/servers',
    component: () => import('@/views/server/ListServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/new',
    component: () => import('@/views/server/EditServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/:server',
    component: () => import('@/views/server/GetServer.vue'),
    meta: {
      activeIndex: '/servers',
    },
  },
  {
    path: '/servers/:server/edit',
    component: () => import('@/views/server/EditServer.vue'),
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
