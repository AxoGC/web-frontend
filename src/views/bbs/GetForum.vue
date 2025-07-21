<script setup lang="ts">
import type {Forum, Post} from '@/utils/tables';
import {ref, watchEffect} from 'vue';
import {useRouter} from 'vue-router';
import usePersistedStore from '@/stores/persisted';
import {api} from '@/utils/axios';
import {useRouteParams, useRouteQuery} from '@vueuse/router';
import {useI18n} from 'vue-i18n';
import dayjs from 'dayjs';
import {Setting} from '@element-plus/icons-vue';

const persisted = usePersistedStore()
const router = useRouter()
const forum = ref<Forum|null>(null)
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, { transform: Number })
const param = useRouteParams<string>('forum')

watchEffect(loadTable)

async function loadTable() {
  forum.value = await api.get<any, Forum>(`/forums/${param.value}`, {params: {
    page: page.value,
    page_size: pageSize.value,
  }})
}

const { t } = useI18n({ messages: {
  zh: {
    editForum: '编辑论坛',
    newPost: '发帖',
    recommend: '推荐内容',
  },
} })

const recommendOption = ref('popular')
const recommendOptions = [
  {
    label: t('popular'),
    value: 'popular',
  },
  {
    label: t('latest'),
    value: 'latest',
  },
]

const recommends = ref<Post[]>([])
watchEffect(async () => {
  recommends.value = await api.get<any,Post[]>(`/recommends?option=${recommendOption.value}&forum=${param.value}`)
})

</script>

<template>
  <div v-if="forum" class="flex flex-col md:flex-row p-4 gap-4">
    <div class="grow-[3] space-y-4">

      <div
        class="card relative bg-cover bg-center"
        :style="{backgroundImage: `url(${persisted.fileAddr}/forum-covers/${forum.slug})`}"
      >
        <div class="absolute inset-0 bg-black/15"></div>
        <el-page-header class="relative text-white" @back="$router.back">
          <template #content>
            <div class="flex gap-2 flex-wrap">
              <span class="text-white">
                {{ forum.title||$t('utils.loading') }}
              </span>
              <span class="text-slate-100 text-sm">
                {{ forum.subTitle }}
              </span>
            </div>
          </template>
          <template #extra>
            <div class="flex gap-2 flex-wrap justify-end">
              <el-button @click="$router.push(`/forums/${param}/new`)">
                {{ t('newPost') }}
              </el-button>
            </div>
          </template>
        </el-page-header>
      </div>

      <div class="card">

        <div v-if="forum" class="flex flex-col">
          <div
            v-for="post in forum.posts"
            :key="post.id"
            class="even:bg-slate-50 hover:bg-slate-100 rounded-2xl
              p-2 flex flex-col md:flex-row justify-between md:items-center duration-300"
            @click="router.push(`/posts/${post.slug}`)"
          >
            <div class="basis-0 grow-[3]">{{post.title}}</div>
            <div class="basis-0 grow text-sm text-slate-600">
              {{post.user.name}}
            </div>
            <div class="text-sm text-slate-600 block md:contents">
              <span class="basis-0 grow">
                {{post.reviewCount}} {{t('review')}}
              </span>
              <span class="basis-0 grow-[2] ms-2">
                {{t('updatedAt')}} {{dayjs(post.updatedAt).format('YYYY年MM月DD日 HH:mm')}}
              </span>
            </div>
          </div>
        </div>
        <el-skeleton v-else class="grow" :rows="5" />

        <div class="mt-4">
          <el-pagination
            layout="sizes, prev, pager, next, total"
            :total="forum.postCount"
            v-model:current-page="page"
            v-model:page-size="pageSize"
          ></el-pagination>
        </div>
      </div>

    </div>

    <div class="grow basis-64 space-y-4">

      <div class="card">
        <div class="flex justify-between items-center">
          <div class="text-lg">{{t('notice')}}</div>
          <el-button circle :icon="Setting" @click="$router.push(`/forums/${param}/edit`)">
          </el-button>
        </div>
        <div class="mt-4" v-html="forum.profile"></div>
      </div>

      <div class="card">

        <div class="flex justify-between items-center">
          <div>{{t('recommend')}}</div>
          <el-segmented v-model="recommendOption" :options="recommendOptions">
          </el-segmented>
        </div>

        <div class="mt-4">
          <div
            v-for="recommend in recommends"
            :key="recommend.id"
            class="rounded-2xl p-2 even:bg-slate-50 hover:bg-slate-100 duration-300"
            @click="$router.push(`/posts/${recommend.slug}`)"
          >
            <div>
              {{recommend.title}}
            </div>
            <div class="flex text-sm text-slate-600">
              <div>{{recommend.user.name}}</div>
              <div class="ms-2">{{recommend.reviewCount}} {{t('review')}}</div>
              <div class="ms-auto">{{dayjs(recommend.updatedAt).format('MM月DD日 HH:mm')}}</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
