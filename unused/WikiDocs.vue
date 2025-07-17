<script setup lang="ts">
import {request} from '@/utils/axios';
import {type Docs} from '@/utils/tables';
import {Check, Close, Delete, Edit, Refresh} from '@element-plus/icons-vue';
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const path = useRoute().params.path as string
const router = useRouter()
const isEdit = ref(false)
const docs = ref<Docs|null>(null)
loadDocs(path)

// 修改文档
async function setDocs() {
  if (!docs.value) return
  await request('PUT', '/wiki/document', {
    id: docs.value.id,
    title: docs.value.title,
    sort: docs.value.sort,
    path: docs.value.path,
    text: docs.value.content.text,
  })
  loadDocs(docs.value.path)
  if (path !==docs.value.path) {
    router.push(`/wiki/${docs.value.path}`)
  }
  isEdit.value = false
}

// 删除文档
async function delDocs() {
  if (!docs.value) return
  const res = await request('DELETE', '/wiki/document', {id: docs.value.id})
  if (!res.error) {
    router.push('/wiki')
  }
}

// 加载文档
async function loadDocs(path: string) {
  const res = await request<Docs>('GET', '/wiki/document', {path})
  docs.value = res.data
}
</script>

<template>
  <el-card v-if="docs" shadow="hover">
    <template #header>
      <el-page-header @back="$router.push('/wiki')">

        <!-- 文档标题 -->
        <template #content>
          <el-input v-if="isEdit" v-model="docs.title" />
          <div v-else>{{docs.title}}</div>
        </template>

        <!-- 页头右侧按钮 -->
        <template #extra>
          <div v-if="isEdit" class="flex flex-wrap">
            <el-button :icon="Check" circle type="success" @click="setDocs" />
            <el-button :icon="Refresh" circle type="primary" @click="loadDocs(path)" />
            <el-button :icon="Delete" circle type="danger" @click="delDocs" />
            <el-button :icon="Close" circle type="info" @click="isEdit=false" />
          </div>
          <el-button v-else :icon="Edit" circle @click="isEdit=true" />
        </template>

      </el-page-header>
    </template>

    <!-- 编辑文档表单 -->
    <el-form v-if="isEdit" :form="docs" label-width="auto">
      <el-form-item :label="$t('wiki.docs.path')">
        <el-input v-model="docs.path" class="max-w-32" />
      </el-form-item>
      <el-form-item :label="$t('wiki.docs.sort')">
        <el-input-number v-model="docs.sort" />
      </el-form-item>
      <el-form-item :label="$t('wiki.docs.content')">
        <el-input v-model="docs.content.text" type="textarea" autosize />
      </el-form-item>
    </el-form>

    <div v-else v-html="docs.content.html" />

  </el-card>
</template>
