<script setup lang="ts">
import {api} from '@/utils/axios';
import type {Post} from '@/utils/tables';
import {reactive, ref} from 'vue';


const posts = ref<Post[]>([])
const total = ref(0)
const params = reactive({
  page: 1,
  count: 10,
})

api.get<any, {
  total: number,
  posts: Post[],
}>('/posts', {params}).then(res => {
  posts.value = res.posts
  total.value = res.total
}).catch(() => {})

</script>

<template>
  <el-card class="h-full" shadow="hover">
    <template #header>
      {{$t('bbs.news.title')}}
    </template>
    <el-table :data="posts">

      <!-- 作者 -->
      <el-table-column :label="$t('bbs.news.name')">
        <template #default="{row}">
          <div class="flex">
            <div>{{row.author.name}}</div>
          </div>
        </template>
      </el-table-column>

      <!-- 标题 -->
      <el-table-column :label="$t('bbs.news.postTitle')" prop="title" />
    </el-table>
  </el-card>
</template>
