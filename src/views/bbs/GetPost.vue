<script setup lang="ts">
import {api} from '@/utils/axios';
import {formatDate} from '@/utils/chrono';
import md from '@/utils/markdown';
import {type Post} from '@/utils/tables';
import {useRouteParams, useRouteQuery} from '@vueuse/router';
import dayjs from 'dayjs';
import {watchEffect} from 'vue';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const slug = useRouteParams<string>('post')
const post = ref<Post|null>(null)
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, { transform: Number })
watchEffect(async () => {
  post.value = await api.get<any, Post>(`/posts/${slug.value}?page=${page.value}&page_size=${pageSize.value}`)
})

const  { t } = useI18n({ messages: {
  zh: {
    reviewTitle: '评论列表',
  },
} })
</script>

<template>
  <div v-if="post" class="p-4 flex flex-col md:flex-row md:items-start gap-4">

    <div class="grow card space-y-4">

      <div>
        <el-page-header @back="$router.back">
          <template #content>
            <div class="flex gap-2 flex-wrap items-center">
              <div>{{post.title}}</div>
              <div class="text-sm text-black text-opacity-60">{{post.user.name}}</div>
            </div>
          </template>
          <template #extra>
            <div class="flex flex-col gap-1 text-sm text-black text-opacity-60">
              <div>{{t('createdAt')}}: {{formatDate(post.createdAt)}}</div>
              <div>{{t('updatedAt')}}: {{formatDate(post.updatedAt)}}</div>
            </div>
          </template>
        </el-page-header>
      </div>

      <div v-if="post.markdown" v-html="md.render(post.content)">
      </div>
      <div v-else class="whitespace-pre-line">
        {{post.content}}
      </div>

    </div>

    <div class="card space-y-4">

      <div class="flex justify-between">
        <div>
          {{t('reviewTitle')}}
        </div>
      </div>

      <div>
        <div
          v-for="review in post.reviews"
          :key="review.id"
          class="p-2 even:bg-slate-50 hover:bg-slate-100 rounded-2xl duration-300"
        >
          <div class="flex items-center gap-2">
            <div>
              {{review.user.name}}
            </div>
            <el-tag v-if="review.attitude" type="success">{{t('agree')}}</el-tag>
            <el-tag v-else-if="review.attitude===false" type="danger">{{t('against')}}</el-tag>
            <div class="ms-auto text-sm text-slate-600">
              {{dayjs(review.updatedAt).format('MM月DD日 HH:mm')}}
            </div>
          </div>
          <div class="mt-1">{{review.content}}</div>
        </div>
      </div>

      <div>
        <el-pagination
          layout="sizes, prev, pager, next, total"
          :total="post.reviewCount"
          v-model:current-page="page"
          v-model:page-size="pageSize"
        >
        </el-pagination>
      </div>

    </div>

  </div>
</template>
