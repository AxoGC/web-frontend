<script setup lang="ts">
import usePersistedStore from '@/stores/persisted'
import axios from 'axios'
import { watch } from 'vue'
import { ref } from 'vue'

interface File {
  name: string
  type: string
  mtime: string
  size: number
  fmtSize: string
}

const persisted = usePersistedStore()
const files = ref<File[]>([])
const currentPath = ref('/')

watch(
  currentPath,
  (value) => {
    axios
      .get<File[]>(persisted.fileAddr + '/cloud' + value)
      .then((res) => {
        files.value = res.data
        files.value.forEach((item) => {
          if (item.size) {
            const units = ['B', 'KB', 'MB', 'GB']
            let i = 0
            while (item.size >= 1024 && i < units.length - 1) {
              item.size /= 1024
              i++
            }
            item.fmtSize = `${item.size.toFixed(2)} ${units[i]}`
          }
        })
      })
      .catch((err) => console.log(err))
  },
  {
    immediate: true,
  },
)

function goPreMenu() {
  const path = currentPath.value.slice(0, -1)
  const lastIndex = path.lastIndexOf('/')
  currentPath.value = path.slice(0, lastIndex + 1)
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <div class="flex flex-row items-center gap-2">
        <div>
          {{ currentPath }}
        </div>
        <el-button class="ms-auto" v-if="currentPath !== '/'" @click="goPreMenu">
          {{ $t('cloud.preMenu') }}
        </el-button>
      </div>
    </template>
    <el-table :data="files" class="cloud-table">
      <el-table-column :label="$t('cloud.name')">
        <template #default="scope">
          <el-icon>
            <Folder v-if="scope.row.type === 'directory'" />
            <DocumentCopy v-else />
          </el-icon>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="mtime" :label="$t('cloud.time')" />
      <el-table-column prop="fmtSize" :label="$t('cloud.size')" />
      <el-table-column :label="$t('cloud.operation')">
        <template #default="scope">
          <el-button
            v-if="scope.row.type === 'directory'"
            @click="currentPath += scope.row.name + '/'"
          >
            {{ $t('cloud.open') }}
          </el-button>
          <el-button v-else>
            <el-link :href="`${persisted.fileAddr}/cloud${currentPath}${scope.row.name}`" target="_blank">
              {{ $t('cloud.download') }}
            </el-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped></style>
