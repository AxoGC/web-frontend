<script setup lang="ts">
import {api} from '@/utils/axios';
import type {DocGroup} from '@/utils/tables';
import {useRouteParams} from '@vueuse/router';
import {reactive, watchEffect} from 'vue';
import {useI18n} from 'vue-i18n';

const form = reactive({
  slug: '',
  label: '',
  sort: 0,
})

const docGroupSlug = useRouteParams<string|undefined>('docGroup')

watchEffect(async () => {
  if (docGroupSlug.value) {
    ({ slug: form.slug, label: form.label, sort: form.sort } = await api.get<any, DocGroup>(`/doc-groups/${docGroupSlug.value}`))
  }
})

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
  <el-card class="max-w-5xl mx-auto mt-4" shadow="hover">

    <template #header>
      <el-page-header @back="$router.back">
        <template #content>
          {{docGroupSlug ? `${t('editDocGroup')}: ${docGroupSlug}` : t('addDocGroup')}}
        </template>
      </el-page-header>
    </template>

    <el-form :model="form">
      <el-form-item :label="t('label')">
        <el-input v-model="form.label" class="w-48"></el-input>
      </el-form-item>
      <el-form-item :label="t('slug')">
        <el-input v-model="form.slug" class="w-48"></el-input>
      </el-form-item>
      <el-form-item :label="t('sort')">
        <el-input-number v-model="form.sort"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          round
        >
          {{t('confirm')}}
        </el-button>
      </el-form-item>
    </el-form>

  </el-card>
</template>
