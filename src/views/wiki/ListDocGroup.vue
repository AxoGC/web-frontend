<script setup lang="ts">
import {api} from '@/utils/axios';
import type {DocGroup} from '@/utils/tables';
import {Delete, Edit, More, Plus} from '@element-plus/icons-vue';
import {ElMessageBox} from 'element-plus';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const docGroups = ref<DocGroup[]>([])

async function listDocGroups() {
  try {
    docGroups.value = await api.get<any, DocGroup[]>('/doc-groups')
  } catch {}
}

listDocGroups()

function delDocGroup() {
  ElMessageBox.confirm(
    t('onDelete.message'), t('onDelete.title'),
    { confirmButtonText: t('onDelete.confirm'), cancelButtonText: t('onDelete.cancel'), type: 'warning' },
  )
}

const { t } = useI18n({ messages: {
  zh: {
    addDocGroup: '添加文档组',
    addDoc: '添加文档',
    editDocGroup: '修改文档组',
    delDocGroup: '删除文档组',
    onDelete: {
      title: '警告',
      message: '你确定要删除这个文档组吗？这会同时删除这一组下的所有文档！（真的很久）',
      confirm: '确认',
      cancel: '取消',
    },
    formTitle: '编辑文档组',
    form: {
      label: '标题',
      sort: '优先级',
    },
  },
} })
</script>

<template>
  <div class="max-w-5xl mx-auto columns-2xs gap-4 space-y-4 p-4">
  <!--
  <div class="min-h-full max-w-5xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
  -->
    <el-card
      v-for="docGroup in docGroups"
      :key="docGroup.id"
      shadow="hover"
      class="self-start"
      header-class="flex justify-between"
      body-class="flex flex-col gap-2"
    >

      <template #header>
        <div>
          {{docGroup.label}}
        </div>
        <el-dropdown>
          <el-button :icon="More" circle size="small" />
          <template #dropdown>
            <el-dropdown-item :icon="Plus" @click="$router.push(`/doc-groups/${docGroup.slug}/new`)">
              {{t('addDoc')}}
            </el-dropdown-item>
            <el-dropdown-item
              :icon="Edit"
              @click="$router.push(`/doc-groups/${docGroup.slug}/edit`)"
            >
              {{t('editDocGroup')}}
            </el-dropdown-item>
            <el-dropdown-item :icon="Delete" @click="delDocGroup">
              {{t('delDocGroup')}}
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </template>

      <el-button
        v-for="doc in docGroup.docs"
        :key="doc.id"
        @click="$router.push(`/docs/${doc.slug}`)"
        class="w-full !ms-0"
        round
      >
        {{doc.title}}
      </el-button>

    </el-card>
    <el-card shadow="hover" body-class="h-full flex flex-col justify-center items-center">
      <el-button
        size="large"
        :icon="Plus"
        circle
        @click="$router.push('/doc-groups/new')"
      ></el-button>
      <div>{{t('addDocGroup')}}</div>
    </el-card>
  </div>

</template>
