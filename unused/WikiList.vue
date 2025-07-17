<script setup lang="ts">
import {api} from '@/utils/axios';
import {Check, Close, Delete, Edit, Plus} from '@element-plus/icons-vue';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

interface DocGroup {
  id: number
  label: string
  sort: number
  docs: {
    id: number
    title: string
    slug: string
  }[]
}

const router = useRouter()
const docGroups = ref<DocGroup[]>([])
api.get<any, DocGroup[]>('/wiki/doc-groups').then(res => {
  docGroups.value = res
}).catch(() => {})

// 添加文档组
const addWikiLabel = ref('')
const addWikiStatus = ref(false)
async function addWiki() {
  try {
    const res = await api.post<any, DocGroup>('/wiki/wiki', {label: addWikiLabel.value})
    docGroups.value.push(res)
  } catch (err) {}
}

// 修改文档组名称
const setWikiLabel = ref('')
const setWikiStatus = ref(0)
async function setWiki(wiki: DocGroup) {
  setWikiLabel.value = wiki.label
  try {
  const res = await api.put('/wiki/wiki', {label: setWikiLabel.value})
  wiki.label = setWikiLabel.value
  setWikiStatus.value = 0
  } catch (err) {}
}

// 添加文档
const addDocsTitle = ref('')
const addDocsPath = ref('')
const addDocsStatus = ref(0)
async function addDocs(wikiId: number) {
  try {
  const res = await api.post<any, Document>('/wiki/document', {
    id: wikiId,
    title: addDocsTitle.value,
    path: addDocsPath.value,
  })
  router.push(`/wiki/${addDocsPath.value}`)
  } catch (err) {}
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <el-card v-for="docGroup in docGroups" :key="docGroup.id" shadow="hover" body-class="flex flex-wrap gap-2">

      <template #header>
        <div v-if="setWikiStatus!==docGroup.id" class="flex justify-between">
          <div>{{ docGroup.label }}</div>
          <el-button :icon="Edit" circle @click="setWikiStatus=docGroup.id" />
        </div>
        <div v-else class="flex justify-between">
          <el-input v-model="setWikiLabel" class="max-w-32" />
          <div class="flex">
            <el-button circle :icon="Check" type="success" @click="setWiki(docGroup)" />
            <el-button circle :icon="Delete" type="danger" />
            <el-button circle :icon="Close" type="info" @click="setWikiStatus=0" />
          </div>
        </div>
      </template>

      <el-card v-for="document in docGroup.docs" :key="document.id" shadow="hover" @click="$router.push(`/wiki/${document.slug}`)">
        {{ document.title }}
      </el-card>

      <!-- 添加文档表单 -->
      <el-card v-if="addDocsStatus===docGroup.id" body-class="p-2 flex flex-col gap-2" shadow="hover">
        <div class="flex gap-2">
          <el-input v-model="addDocsTitle" :placeholder="$t('wiki.list.title')" class="w-32" />
          <el-button circle :icon="Check" type="success" @click="addDocs(docGroup.id)" />
        </div>
        <div class="flex gap-2">
          <el-input v-model="addDocsPath" :placeholder="$t('wiki.list.path')" class="w-32" />
          <el-button circle :icon="Close" type="info" @click="addDocsStatus=0" />
        </div>
      </el-card>

      <!-- 添加文档按钮 -->
      <el-card v-else shadow="hover" @click="addDocsStatus=docGroup.id">
        <el-icon >
          <Plus />
        </el-icon>
      </el-card>

    </el-card>
    <el-card class="text-center" shadow="hover">
      <div v-if="addWikiStatus" class="flex gap-2 justify-center">
        <el-input v-model="addWikiLabel" class="w-32" />
        <el-button @click="addWiki" circle :icon="Check" type="success" />
        <el-button @click="addWikiStatus=false" circle :icon="Close" type="warning" />
      </div>
      <el-icon v-else @click="addWikiStatus=true">
        <Plus />
      </el-icon>
    </el-card>
  </div>
</template>
