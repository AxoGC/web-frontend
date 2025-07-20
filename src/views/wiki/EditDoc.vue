<script setup lang="ts">
import {api} from '@/utils/axios';
import md from '@/utils/markdown';
import type {Doc} from '@/utils/tables';
import {useRouteParams} from '@vueuse/router';
import {reactive} from 'vue';
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';

const param = useRouteParams<string|undefined>('doc')

const form = reactive({
  title: '',
  slug: '',
  content: '',
  sort: 0,
})

const preview = ref(false)

if (param.value) {
  api.get<any, Doc>(`/docs/${param.value}`).then(res => ({
    title: form.title,
    slug: form.slug,
    content: form.content,
    sort: form.sort,
  } = res))
}

function clearForm() {
  form.title = ''
  form.slug = ''
  form.content = ''
  form.sort = 0
}

async function submit() {
  if (param.value) {
  } else {

  }
}

const { t } = useI18n({ messages: {
  zh: {
    addDoc: '添加文档',
    editDoc: '编辑文档',
    wiki: '文档组',
    label: '标题',
    slug: '标识',
    sort: '排序',
    placeholder: '请选择文档组',
    preview: '预览',
    reload: '重新加载',
    clear: '清空输入框',
  },
} })
</script>

<template>
  <div class="h-full max-w-5xl mx-auto flex flex-col md:flex-row-reverse p-4 gap-4">

    <el-card shadow="hover" class="shrink-0">
      <el-form :model="form">

        <el-form-item :label="t('label')">
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item :label="t('slug')">
          <el-input v-model="form.slug" />
        </el-form-item>

        <el-form-item :label="t('sort')">
          <el-input-number v-model="form.sort" />
        </el-form-item>

        <el-form-item :label="t('preview')">
          <el-switch v-model="preview" />
        </el-form-item>

        <el-form-item>
          <el-button @click="clearForm">
            {{t('clear')}}
          </el-button>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card shadow="hover" class="grow min-w-0">

      <template #header>
        <el-page-header @back="$router.back">
          <template #content>
            {{true ? t('editDoc') : t('addDoc')}}
          </template>
          <template #extra>
            <el-button type="primary" round>
              {{ t('confirm') }}
            </el-button>
          </template>
        </el-page-header>
      </template>

      <div v-if="preview" v-html="md.render(form.content)"></div>
      <el-input
        v-else
        type="textarea"
        v-model="form.content"
        show-word-limit
        maxlength="1000"
        :autosize="{ minRows: 10 }"
      />

    </el-card>

  </div>
</template>
