<script setup lang="ts">
import {useRouteParams} from '@vueuse/router';
import {reactive} from 'vue';
import {api} from '@/utils/axios';
import {useI18n} from 'vue-i18n';
import type {Forum} from '@/utils/tables';

const { t } = useI18n({ messages: {
  zh: {
    editForum: '编辑论坛',
    addForum: '添加论坛',
  },
} })

const form = reactive({
  slug: '',
  title: '',
  subTitle: '',
  profile: '',
  sort: 0,
})

const slug = useRouteParams<string|undefined>('forum')
api.get<any, Forum>(`/forums/${slug.value}`).then(res => ({
  slug: form.slug,
  title: form.title,
  subTitle: form.subTitle,
  profile: form.profile,
  sort: form.sort,
} = res))
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <el-card shadow="hover">

      <template #header>
        <el-page-header @back="$router.back">
          <template #content>
            {{slug ? `${t('editForum')}: ${slug}` : t('addForum')}}
          </template>
        </el-page-header>
      </template>

      <el-form>
        <el-form-item :label="t('slug')">
          <el-input v-model="form.slug" class="w-48"></el-input>
        </el-form-item>
        <el-form-item :label="t('title')">
          <el-input v-model="form.title" class="w-48"></el-input>
        </el-form-item>
        <el-form-item :label="t('subTitle')">
          <el-input v-model="form.subTitle"></el-input>
        </el-form-item>
        <el-form-item :label="t('profile')">
          <el-input v-model="form.profile" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="t('sort')">
          <el-input-number v-model="form.sort"></el-input-number>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary">
          {{t('confirm')}}
        </el-button>
      </template>

    </el-card>
  </div>
</template>
