<script setup lang="ts">
import ForumInfo from './ForumInfo.vue';
import type {Forum, Post} from '@/utils/tables';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {formatDate} from '@/utils/chrono';
import usePersistedStore from '@/stores/persisted';
import {api} from '@/utils/axios';
import {watch} from 'vue';
import {useRouteParams, useRouteQuery} from '@vueuse/router';
import {useI18n} from 'vue-i18n';
import dayjs from 'dayjs';

const persisted = usePersistedStore()
const drawerStatus = ref(false)
const router = useRouter()
const forum = ref<Forum|null>(null)
const page = useRouteQuery('page', 1, {transform: Number})
const pageSize = useRouteQuery('page_size', 10, {transform: Number})
const slug = useRouteParams<string>('forum')

watch([page, pageSize], loadTable, {immediate: true})

async function loadTable() {
  const res = await api.get<any, Forum>(`/forums/${slug.value}`, {params: {
    page: page.value,
    page_size: pageSize.value,
  }})
  forum.value = res
}

const { t } = useI18n({ messages: {
  zh: {
    editForum: '编辑论坛',
    newPost: '发帖',
    recommend: '推荐内容',
  },
} })

const currentRecommendOption = ref('popular')
const recommendOptions = [

]

</script>

<template>
  <div v-if="forum" class="flex flex-col md:flex-row p-4 gap-4">
    <div class="grow-[2] flex flex-col gap-4">

      <el-card
        shadow="hover"
        body-class="relative bg-cover bg-center"
        :body-style="{backgroundImage: `url(${persisted.fileAddr}/forum-covers/${forum.slug})`}"
        >
        <div class="absolute inset-0 bg-black/15" />
        <el-page-header class="relative text-white z-10" @back="$router.back">
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
              <el-button @click="$router.push(`/forums/${slug}/edit`)">
                {{t('editForum')}}
              </el-button>
              <el-button @click="$router.push(`/forums/${slug}/new`)">
                {{ t('newPost') }}
              </el-button>
            </div>
          </template>
        </el-page-header>
      </el-card>

      <el-card shadow="hover">
        <!--
        <el-table v-if="forum" :data="forum.posts" @row-click="(row:any)=>router.push(`/posts/${row.slug}`)">
          <el-table-column prop="updatedAt" :label="t('updatedAt')" :formatter="(row:Post)=>formatDate(row.updatedAt)">
          </el-table-column>
          <el-table-column prop="title" :label="t('title')">
          </el-table-column>
          <el-table-column prop="user.name" :label="t('user.name')">
          </el-table-column>
          <el-table-column prop="reviewCount" :label="t('reviewCount')">
          </el-table-column>
        </el-table>
        -->
        <div v-if="forum" class="flex flex-col">
          <div
            v-for="post in forum.posts"
            :key="post.id"
            class="even:bg-slate-100 hover:bg-slate-200 rounded-2xl p-2 flex flex-col md:flex-row justify-between items-center"
            @click="router.push(`/posts/${post.slug}`)"
          >
            <div>{{post.title}}</div>
            <div class="text-sm text-slate-600">
              {{post.user.name}}
            </div>
            <div class="text-sm text-slate-600 block md:contents">
              <span>
                {{post.reviewCount}} {{t('review')}}
              </span>
              <span class="ms-2">
                {{t('updatedAt')}} {{dayjs(post.updatedAt).format('YYYY年MM月DD日 HH:mm')}}
              </span>
            </div>
          </div>
        </div>
        <el-skeleton v-else class="grow" :rows="5" />

        <template #footer>
          <el-pagination layout="sizes,prev,pager,next,total" :total="1000"
            v-model:current-page="page" v-model:page-size="pageSize"
          />
        </template>
      </el-card>

    </div>

    <div class="grow flex flex-col gap-4">

      <el-card class="row-span-2" shadow="hover">
        <forum-info :forum="forum" />
      </el-card>

      <el-card
        shadow="hover"
        header-class="flex justify-between items-center"
      >
        <template #header>
          <div>{{t('recommend')}}</div>
        </template>
      </el-card>

    </div>
  </div>

  <el-drawer size="60%" v-model="drawerStatus">
    <forum-info :forum="forum" />
  </el-drawer>
</template>
