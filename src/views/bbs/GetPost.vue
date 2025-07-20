<script setup lang="ts">
import {api} from '@/utils/axios';
import {formatDate} from '@/utils/chrono';
import md from '@/utils/markdown';
import {type Post} from '@/utils/tables';
import {useRouteParams} from '@vueuse/router';
import dayjs from 'dayjs';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const slug = useRouteParams<string>('post')
const post = ref<Post|null>(null)
api.get<any, Post>(`/posts/${slug.value}`).then(res => {
  post.value = res
}).catch(() => {})

const  { t } = useI18n({ messages: {
  zh: {
    reviewTitle: '评论列表',
  },
} })
</script>

<template>
  <div v-if="post" class="h-full flex flex-col lg:flex-row gap-2 overflow-y-auto">

    <el-card class="h-full shrink-0 lg:grow min-w-0" shadow="hover">

      <template #header>
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
      </template>

      <div v-if="post.markdown" v-html="md.render(post.content)">
      </div>
      <div v-else class="whitespace-pre-line">
        {{post.content}}
      </div>

    </el-card>

    <el-card shadow="hover" class="flex flex-col shrink-0" header-class="flex justify-between" body-class="grow">

      <template #header>
        <div>
          {{t('reviewTitle')}}
        </div>
      </template>

      <div v-for="review in post.reviews">
        <div>{{review.user.name}}</div>
        <div>{{dayjs(review.updatedAt).format('MM月DD日 HH:mm')}}</div>
        <div>{{review.content}}</div>
      </div>

      <template #footer>
        <el-pagination layout="prev, pager, next" :total="1000">
        </el-pagination>
      </template>

    </el-card>

  </div>
</template>
